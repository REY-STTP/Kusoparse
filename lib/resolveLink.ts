// ./lib/resolveLink.ts
//
// Resolver untuk link download yang dilapisi shortlink/ad-locker.
//
// Rantai yang umum ditemukan (contoh: Re:Zero S4 di Kusonime):
//   s.id/XXXX                                  -> shortlink awal (biasanya auto-redirect)
//     justpaste.it/{articleId}                 -> "halaman tabel" berisi banyak link
//       per baris: resolusi + host + <a href="https://justpaste.it/redirect/{id}/{encoded}">
//         decode(encoded)                      -> tpi.li/{alias} (shortlink ad-locker/shrinkearn)
//           halaman shrinkearn punya <input name="token" value="{hash}{alias}{date}{base64}">
//             base64 di ekor token             -> LINK FINAL (mis. acefile.co/..., dst)
//
// Kalau link yang masuk sudah berupa host langsung (Google Drive, Mega, Krakenfiles, dst),
// fungsi ini langsung return tanpa fetch tambahan.

import * as cheerio from "cheerio";

export interface ResolveOptions {
  /** Label resolusi dari Kusonime, mis. "1080P". Dipakai untuk mencocokkan baris di halaman justpaste.it. */
  resolution?: string;
  /** Label host dari Kusonime, mis. "Google Drive". Dipakai untuk mencocokkan baris di halaman justpaste.it. */
  host?: string;
  /** Batas jumlah hop untuk mencegah infinite loop. Default 5. */
  maxHops?: number;
  /** Timeout per-hop dalam ms. Default 12000. */
  timeoutMs?: number;
}

export interface ResolveResult {
  /** Link akhir terbaik yang berhasil didapat. */
  url: string;
  /** true kalau berhasil sampai ke link final yang dikenali, false kalau mentok/fallback. */
  resolved: boolean;
  /** Jejak hop untuk debugging. */
  hops: string[];
}

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36";

// Domain-domain host file yang dianggap "final" — kalau link sudah mengarah ke sini,
// tidak perlu di-resolve lebih lanjut.
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

/**
 * Parse halaman justpaste.it bertipe "tabel banyak link" menjadi:
 *   { "1080P": { "Google Drive": "https://justpaste.it/redirect/...", ... }, ... }
 */
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

/** Cari link di tabel justpaste berdasarkan resolusi+host (case-insensitive), dengan fallback ke entri pertama. */
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

  // fallback: entri pertama yang ada, apa pun resolusinya
  for (const hosts of Object.values(table)) {
    const first = Object.values(hosts)[0];
    if (first) return first;
  }
  return null;
}

/** Bongkar "https://justpaste.it/redirect/{id}/{encoded}" -> URL target asli. */
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

/** Ekstrak & decode token dari halaman ad-locker (tpi.li / shrinkearn dan sejenisnya). */
function extractShrinkearnToken(html: string, alias: string): string | null {
  const $ = cheerio.load(html);
  const tokenVal = $('input[name="token"]').attr("value");
  if (!tokenVal || !alias) return null;

  const idx = tokenVal.indexOf(alias);
  if (idx === -1) return null;

  // format token: {hash-hex}{alias}{tanggal 4 digit}{base64(final_url)}
  const b64 = tokenVal.slice(idx + alias.length + 4);
  try {
    const decoded = Buffer.from(b64, "base64").toString("utf-8");
    if (/^https?:\/\//i.test(decoded)) return decoded;
  } catch {
    // ignore, fall through
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

/**
 * Resolve sebuah link download (yang mungkin masih dilapisi shortlink/ad-locker)
 * menjadi link final. Aman dipanggil dengan link yang sudah final — akan langsung
 * dikembalikan tanpa fetch tambahan.
 */
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

    // Lapis 1: halaman justpaste.it berisi tabel resolusi/host
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

    // Lapis 2: halaman ad-locker (tpi.li / shrinkearn / sejenisnya) dengan hidden input token
    if (html.includes('name="token"')) {
      const alias = lastPathSegment(current) || lastPathSegment(finalUrl);
      const decoded = extractShrinkearnToken(html, alias);
      if (decoded) {
        hops.push(decoded);
        return { url: decoded, resolved: true, hops };
      }
      break;
    }

    // Bentuk halaman tidak dikenali — berhenti, kembalikan hop terakhir yang diketahui.
    break;
  }

  return { url: current, resolved: false, hops };
}