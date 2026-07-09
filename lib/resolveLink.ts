// ./lib/resolveLink.ts

import * as cheerio from "cheerio";

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

const DIRECT_HOST_PATTERNS: RegExp[] = [
  /acefile\.co/i,
  /drive\.google\.com/i,
  /drive\.usercontent\.google\.com/i,
  /krakenfiles\.com/i,
  /terabox\.com/i,
  /1024terabox\.com/i,
  /mega\.nz/i,
  /megaup\.net/i,
  /buzzheavier\.com/i,
  /hxfile\.co/i,
  /gofile\.io/i,
  /pixeldrain\.com/i,
];

function isDirectHost(url: string): boolean {
  return DIRECT_HOST_PATTERNS.some((p) => p.test(url));
}

async function fetchHtml(
  url: string,
  timeoutMs: number
): Promise<{ html: string; finalUrl: string } | null> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": UA },
      redirect: "follow",
      signal: controller.signal,
    });
    clearTimeout(timeout);
    if (!res.ok) return null;
    const html = await res.text();
    return { html, finalUrl: res.url || url };
  } catch {
    clearTimeout(timeout);
    return null;
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
  const hops: string[] = [startUrl];

  let current = startUrl;

  if (isDirectHost(current)) {
    return { url: current, resolved: true, hops };
  }

  for (let i = 0; i < maxHops; i++) {
    const fetched = await fetchHtml(current, timeoutMs);
    if (!fetched) break;

    const { html, finalUrl } = fetched;

    if (isDirectHost(finalUrl)) {
      hops.push(finalUrl);
      return { url: finalUrl, resolved: true, hops };
    }

    if (/justpaste\.it/i.test(finalUrl) && html.includes("articleContent")) {
      const table = parseJustpasteTable(html);
      const picked = pickFromTable(table, opts.resolution, opts.host);
      if (!picked) break;

      const nextUrl = unwrapJustpasteRedirect(picked);
      hops.push(nextUrl);
      current = nextUrl;

      if (isDirectHost(current)) {
        return { url: current, resolved: true, hops };
      }
      continue;
    }

    if (html.includes('name="token"')) {
      const alias = lastPathSegment(current) || lastPathSegment(finalUrl);
      const decoded = extractShrinkearnToken(html, alias);
      if (decoded) {
        hops.push(decoded);
        return { url: decoded, resolved: true, hops };
      }
      break;
    }

    break;
  }

  return { url: current, resolved: false, hops };
}