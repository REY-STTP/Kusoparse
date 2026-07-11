// ./lib/parseKusonime.ts

import * as cheerio from "cheerio";

export interface DownloadLink {
  host: string;
  url: string;
}

export interface DownloadGroup {
  title: string;
  downloads: Record<string, DownloadLink[]>;
}

export interface ParsedAnime {
  title: string | null;
  thumbnail: string | null;
  info: Record<string, string>;
  synopsis: string | null;
  downloads: DownloadGroup[];
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
    downloads: [],
    sourceUrl,
  };

  const titleTag = $("h1.jdlz").first();
  if (titleTag.length) {
    result.title = cleanText(titleTag.text());
  }

  const metaImage = $('meta[property="og:image"]').attr('content');
  const fallbackImage = $(".post-thumb img").first().attr("src");
  
  result.thumbnail = metaImage || fallbackImage || null;

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

  $("div.smokeddlrh").each((_, group) => {
    const title = cleanText(
      $(group).find(".smokettlrh").first().text()
    );

    const downloads: Record<string, DownloadLink[]> = {};

    $(group)
      .find(".smokeurlrh")
      .each((_, row) => {
        const resolution = cleanText(
          $(row).find("strong").first().text()
        );

        if (!resolution) return;

        const links: DownloadLink[] = [];

        $(row)
          .find("a")
          .each((_, a) => {
            const href = $(a).attr("href");
            const host = cleanText($(a).text());

            if (href) {
              links.push({
                host,
                url: href,
              });
            }
          });

        if (links.length) {
          downloads[resolution] = links;
        }
      });

    if (Object.keys(downloads).length) {
      result.downloads.push({
        title,
        downloads,
      });
    }
  });

  return result;
}

export function isLikelyParsed(data: ParsedAnime): boolean {
  return Boolean(data.title) && Object.keys(data.downloads).length > 0;
}