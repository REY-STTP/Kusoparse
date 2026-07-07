// ./lib/parseKusonime.ts

import * as cheerio from "cheerio";

export interface DownloadLink {
  host: string;
  url: string;
}

export interface ParsedAnime {
  title: string | null;
  thumbnail: string | null;
  info: Record<string, string>;
  synopsis: string | null;
  downloads: Record<string, DownloadLink[]>;
  sourceUrl: string;
}

function cleanText(text: string): string {
  return text.replace(/\s+/g, " ").trim();
}

export function parseKusonime(html: string, sourceUrl: string): ParsedAnime {
  const $ = cheerio.load(html);

  const result: ParsedAnime = {
    title: null,
    thumbnail: null,
    info: {},
    synopsis: null,
    downloads: {},
    sourceUrl,
  };

  const titleTag = $("h1.jdlz").first();
  if (titleTag.length) {
    result.title = cleanText(titleTag.text());
  }

  const thumb = $(".post-thumb img").first();
  if (thumb.length) {
    result.thumbnail = thumb.attr("src") ?? null;
  }

  $("div.info p").each((_, el) => {
    const text = cleanText($(el).text());
    if (text.includes(":")) {
      const idx = text.indexOf(":");
      const key = text.slice(0, idx).trim();
      const value = text.slice(idx + 1).trim();
      if (key) result.info[key] = value;
    }
  });

  const lexot = $("div.lexot").first();
  if (lexot.length) {
    const parts: string[] = [];
    lexot.children("p").each((_, el) => {
      const text = cleanText($(el).text());
      if (!text) return;
      const lower = text.toLowerCase();
      if (lower.startsWith("credit")) return;
      if (lower.startsWith("anime sebelumnya")) return;
      if (lower.startsWith("download") && lower.includes("batch")) return;
      parts.push(text);
    });
    result.synopsis = parts.join("\n\n") || null;
  }

  $("div.smokeurlrh").each((_, row) => {
    const strong = $(row).find("strong").first();
    if (!strong.length) return;
    const resolution = cleanText(strong.text());
    const links: DownloadLink[] = [];
    $(row)
      .find("a")
      .each((_, a) => {
        const href = $(a).attr("href");
        const label = cleanText($(a).text());
        if (href) links.push({ host: label, url: href });
      });
    if (links.length) result.downloads[resolution] = links;
  });

  return result;
}

export function isLikelyParsed(data: ParsedAnime): boolean {
  return Boolean(data.title) && Object.keys(data.downloads).length > 0;
}