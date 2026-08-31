// ./lib/resolveLink.ts

import * as cheerio from "cheerio";
import { lookup } from "node:dns/promises";
import { isIP } from "node:net";
import { readLimitedText } from "@/lib/http";
import { DIRECT_HOSTS, INTERMEDIARY_HOSTS } from "@/lib/hosts";

export interface ResolveOptions {
  resolution?: string;
  host?: string;
  maxHops?: number;
  timeoutMs?: number;
}

export interface ResolveResult {
  url: string;
  resolved: boolean;
  hops: string[];
}

const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36";

const DIRECT_HOST_SET = new Set<string>(DIRECT_HOSTS);
const INTERMEDIARY_HOST_SET = new Set<string>(INTERMEDIARY_HOSTS);

function parseHttpUrl(value: string | URL): URL | null {
  try {
    const url = typeof value === "string" ? new URL(value) : value;

    if (
      !["http:", "https:"].includes(url.protocol) ||
      !url.hostname ||
      url.username ||
      url.password ||
      url.port
    ) {
      return null;
    }

    return url;
  } catch {
    return null;
  }
}

function matchesHost(value: string | URL, allowedHosts: Set<string>) {
  const url = parseHttpUrl(value);
  if (!url) return false;

  const hostname = url.hostname.toLowerCase().replace(/\.$/, "");
  return allowedHosts.has(hostname) ||
    (hostname.startsWith("www.") && allowedHosts.has(hostname.slice(4)));
}

function isPrivateAddress(address: string) {
  const normalized = address.toLowerCase().replace(/^\[|\]$/g, "");
  const family = isIP(normalized);

  if (family === 4) {
    const octets = normalized.split(".").map(Number);
    if (octets.length !== 4 || octets.some((octet) => !Number.isInteger(octet))) {
      return true;
    }

    const [first, second] = octets;
    return (
      first === 0 ||
      first === 10 ||
      first === 127 ||
      (first === 100 && second >= 64 && second <= 127) ||
      (first === 169 && second === 254) ||
      (first === 172 && second >= 16 && second <= 31) ||
      (first === 192 && second === 168) ||
      (first === 198 && (second === 18 || second === 19)) ||
      first >= 224
    );
  }

  if (family === 6) {
    if (normalized.startsWith("::ffff:")) {
      return isPrivateAddress(normalized.slice(7));
    }

    return (
      normalized === "::" ||
      normalized === "::1" ||
      normalized.startsWith("fc") ||
      normalized.startsWith("fd") ||
      normalized.startsWith("fe8") ||
      normalized.startsWith("fe9") ||
      normalized.startsWith("fea") ||
      normalized.startsWith("feb") ||
      normalized.startsWith("ff") ||
      normalized.startsWith("::ffff:127.") ||
      normalized.startsWith("::ffff:10.") ||
      normalized.startsWith("::ffff:192.168.")
    );
  }

  return true;
}

async function resolvesToPublicAddress(hostname: string) {
  if (isIP(hostname)) return !isPrivateAddress(hostname);

  let timeout: ReturnType<typeof setTimeout> | undefined;
  try {
    const records = await Promise.race([
      lookup(hostname, { all: true, verbatim: true }),
      new Promise<never>((_, reject) => {
        timeout = setTimeout(() => reject(new Error("DNS lookup timeout")), 5000);
      }),
    ]);
    return records.length > 0 && records.every(({ address }) => !isPrivateAddress(address));
  } catch {
    return false;
  } finally {
    if (timeout) clearTimeout(timeout);
  }
}

function isDirectHost(value: string | URL): boolean {
  return matchesHost(value, DIRECT_HOST_SET);
}

function isIntermediaryHost(value: string | URL): boolean {
  return matchesHost(value, INTERMEDIARY_HOST_SET);
}

function isJustpasteHost(value: string | URL): boolean {
  const url = parseHttpUrl(value);
  if (!url) return false;

  const hostname = url.hostname.toLowerCase().replace(/\.$/, "");
  return hostname === "justpaste.it" || hostname === "www.justpaste.it";
}

export function isResolvableUrl(value: string | URL) {
  const url = parseHttpUrl(value);
  return Boolean(url && (isDirectHost(url) || isIntermediaryHost(url)));
}

async function fetchHtml(
  url: string,
  timeoutMs: number
): Promise<{ html: string; finalUrl: string } | null> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    let current = parseHttpUrl(url);
    if (!current || !isIntermediaryHost(current)) return null;

    for (let redirects = 0; redirects <= 5; redirects += 1) {
      if (!(await resolvesToPublicAddress(current.hostname))) return null;

      const res = await fetch(current, {
        headers: { "User-Agent": UA },
        redirect: "manual",
        signal: controller.signal,
      });

      if ([301, 302, 303, 307, 308].includes(res.status)) {
        const location = res.headers.get("location");
        if (!location || redirects === 5) return null;

        const next = parseHttpUrl(new URL(location, current));
        if (!next) return null;
        if (isDirectHost(next)) return { html: "", finalUrl: next.toString() };
        if (!isIntermediaryHost(next)) return null;

        current = next;
        continue;
      }

      const responseUrl = parseHttpUrl(res.url || current.toString());
      if (!responseUrl) return null;
      if (isDirectHost(responseUrl)) {
        return { html: "", finalUrl: responseUrl.toString() };
      }
      if (!isIntermediaryHost(responseUrl)) return null;
      if (!res.ok) return null;
      const html = await readLimitedText(res);
      if (html === null) return null;
      return { html, finalUrl: responseUrl.toString() };
    }

    return null;
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

function cleanText(text: string): string {
  return text.replace(/\s+/g, " ").trim();
}

function parseJustpasteTable(html: string): Record<string, Record<string, string>> {
  const $ = cheerio.load(html);
  const container = $("#articleContent");
  const result: Record<string, Record<string, string>> = {};
  let currentRes: string | null = null;

  container.children("p").each((_, pEl) => {
    const innerHtml = $(pEl).html() ?? "";
    const lines = innerHtml.split(/<br\s*\/?>/i);

    for (const line of lines) {
      const $line = cheerio.load(`<div>${line}</div>`);
      const text = cleanText($line("div").text());
      if (!text) continue;

      const resMatch = text.match(/(\d{3,4}P)\b/i);
      if (resMatch) currentRes = resMatch[1].toUpperCase();

      const hostMatch = text.match(/^([A-Za-z0-9.\- ]+?)\s*:/);
      const href = $line("a").first().attr("href");

      if (hostMatch && href && currentRes) {
        const hostName = hostMatch[1].trim();
        if (!result[currentRes]) result[currentRes] = {};
        result[currentRes][hostName] = href;
      }
    }
  });

  return result;
}

function pickFromTable(
  table: Record<string, Record<string, string>>,
  resolution?: string,
  host?: string
): string | null {
  const resKey = resolution?.toUpperCase();

  if (resKey && table[resKey]) {
    if (host) {
      const match = Object.entries(table[resKey]).find(
        ([h]) => h.toLowerCase() === host.toLowerCase()
      );
      if (match) return match[1];
    }
    const firstHost = Object.values(table[resKey])[0];
    if (firstHost) return firstHost;
  }

  for (const hosts of Object.values(table)) {
    const first = Object.values(hosts)[0];
    if (first) return first;
  }
  return null;
}

function unwrapJustpasteRedirect(href: string): string {
  const match = href.match(/\/redirect\/[^/]+\/(.+)$/);
  if (match) {
    try {
      return decodeURIComponent(match[1]);
    } catch {
      return href;
    }
  }
  return href;
}

function extractShrinkearnToken(html: string, alias: string): string | null {
  const $ = cheerio.load(html);
  const tokenVal = $('input[name="token"]').attr("value");
  if (!tokenVal || !alias) return null;

  const idx = tokenVal.indexOf(alias);
  if (idx === -1) return null;

  const b64 = tokenVal.slice(idx + alias.length + 4);
  try {
    const decoded = Buffer.from(b64, "base64").toString("utf-8");
    if (/^https?:\/\//i.test(decoded)) return decoded;
  } catch {
    // ignore
  }
  return null;
}

function lastPathSegment(url: string): string {
  try {
    const u = new URL(url);
    const parts = u.pathname.split("/").filter(Boolean);
    return parts[parts.length - 1] ?? "";
  } catch {
    return "";
  }
}

export async function resolveDownloadLink(
  startUrl: string,
  opts: ResolveOptions = {}
): Promise<ResolveResult> {
  const maxHops = opts.maxHops ?? 5;
  const timeoutMs = opts.timeoutMs ?? 12000;
  const parsedStart = parseHttpUrl(startUrl);
  const normalizedStart = parsedStart?.toString() ?? startUrl;
  const hops: string[] = [normalizedStart];

  let current = normalizedStart;

  if (!parsedStart || !isResolvableUrl(parsedStart)) {
    return { url: current, resolved: false, hops };
  }

  if (isDirectHost(current)) {
    return { url: current, resolved: true, hops };
  }

  for (let i = 0; i < maxHops; i++) {
    const fetched = await fetchHtml(current, timeoutMs);
    if (!fetched) break;

    const { html, finalUrl } = fetched;

    if (finalUrl !== current) {
      hops.push(finalUrl);
      current = finalUrl;
    }

    if (isDirectHost(finalUrl)) {
      return { url: finalUrl, resolved: true, hops };
    }

    if (!isIntermediaryHost(finalUrl)) break;

    if (isJustpasteHost(finalUrl) && html.includes("articleContent")) {
      const table = parseJustpasteTable(html);
      const picked = pickFromTable(table, opts.resolution, opts.host);
      if (!picked) break;

      let nextUrl: URL | null = null;
      try {
        nextUrl = parseHttpUrl(
          new URL(unwrapJustpasteRedirect(picked), finalUrl),
        );
      } catch {
        break;
      }
      if (!nextUrl) break;

      current = nextUrl.toString();
      hops.push(current);

      if (isDirectHost(current)) {
        return { url: current, resolved: true, hops };
      }

      if (!isIntermediaryHost(current)) break;
      continue;
    }

    if (html.includes('name="token"')) {
      const alias = lastPathSegment(current) || lastPathSegment(finalUrl);
      const decoded = extractShrinkearnToken(html, alias);
      if (decoded) {
        const decodedUrl = parseHttpUrl(decoded);
        if (!decodedUrl) break;

        if (isDirectHost(decodedUrl)) {
          const normalizedDecoded = decodedUrl.toString();
          hops.push(normalizedDecoded);
          return { url: normalizedDecoded, resolved: true, hops };
        }

        if (!isIntermediaryHost(decodedUrl)) break;

        current = decodedUrl.toString();
        hops.push(current);
        continue;
      }
      break;
    }

    break;
  }

  return {
    url: isResolvableUrl(current) ? current : normalizedStart,
    resolved: false,
    hops,
  };
}
