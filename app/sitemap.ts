import type { MetadataRoute } from "next";
import { LOCALES, type Locale } from "@/lib/i18n/dictionaries";
import { absoluteUrl } from "@/lib/site";
import { getLanguageAlternates, pagePath, type LocalizedPage } from "@/lib/seo";

function localizedEntries(
  page: LocalizedPage,
  changeFrequency: "monthly" | "yearly",
  idPriority: number,
  otherPriority: number,
): MetadataRoute.Sitemap {
  return LOCALES.map((locale: Locale) => ({
    url: absoluteUrl(pagePath(locale, page)),
    changeFrequency,
    priority: locale === "id" ? idPriority : otherPriority,
    alternates: { languages: getLanguageAlternates(page) },
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...localizedEntries("home", "monthly", 1, 0.8),
    ...localizedEntries("guide", "yearly", 0.7, 0.6),
    ...localizedEntries("hosts", "monthly", 0.6, 0.5),
  ];
}
