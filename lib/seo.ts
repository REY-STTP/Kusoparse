import type { Metadata } from "next";
import { dictionaries, type Locale } from "@/lib/i18n/dictionaries";
import { absoluteUrl, SITE_NAME, SITE_URL } from "@/lib/site";

const LOCALE_PATHS: Record<Locale, string> = {
  id: "/",
  en: "/en",
  ja: "/ja",
};

const OG_LOCALES: Record<Locale, string> = {
  id: "id_ID",
  en: "en_US",
  ja: "ja_JP",
};

const LANGUAGE_ALTERNATES = {
  "id-ID": absoluteUrl("/"),
  en: absoluteUrl("/en"),
  ja: absoluteUrl("/ja"),
  "x-default": absoluteUrl("/"),
};

export function localizedPath(locale: Locale, path = "") {
  const suffix = path ? `/${path.replace(/^\/+/, "")}` : "";
  return locale === "id" ? suffix || "/" : `${LOCALE_PATHS[locale]}${suffix}`;
}

export function getLocalizedMetadata(locale: Locale): Metadata {
  const content = dictionaries[locale].seo;
  const path = localizedPath(locale);
  const canonical = absoluteUrl(path);

  return {
    title: content.metaTitle,
    description: content.description,
    keywords: content.keywords,
    alternates: {
      canonical,
      languages: LANGUAGE_ALTERNATES,
    },
    openGraph: {
      type: "website",
      url: canonical,
      siteName: SITE_NAME,
      title: content.metaTitle,
      description: content.description,
      locale: OG_LOCALES[locale],
      alternateLocale: Object.entries(OG_LOCALES)
        .filter(([key]) => key !== locale)
        .map(([, value]) => value),
      images: [
        {
          url: absoluteUrl(localizedPath(locale, "opengraph-image")),
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} - ${content.metaTitle}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: content.metaTitle,
      description: content.description,
      images: [absoluteUrl(localizedPath(locale, "twitter-image"))],
    },
    other: {
      "content-language": locale === "id" ? "id-ID" : locale,
    },
  };
}

export function getGuideMetadata(locale: Locale): Metadata {
  const content = dictionaries[locale].seo;
  const canonical = absoluteUrl(localizedPath(locale, "panduan"));
  const languages = {
    "id-ID": absoluteUrl("/panduan"),
    en: absoluteUrl("/en/panduan"),
    ja: absoluteUrl("/ja/panduan"),
    "x-default": absoluteUrl("/panduan"),
  };

  return {
    title: content.guideTitle,
    description: content.guideDescription,
    keywords: content.keywords,
    alternates: { canonical, languages },
    openGraph: {
      type: "article",
      url: canonical,
      siteName: SITE_NAME,
      title: content.guideTitle,
      description: content.guideDescription,
      locale: OG_LOCALES[locale],
      alternateLocale: Object.entries(OG_LOCALES)
        .filter(([key]) => key !== locale)
        .map(([, value]) => value),
      images: [
        {
          url: absoluteUrl(localizedPath(locale, "opengraph-image")),
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} - ${content.guideTitle}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: content.guideTitle,
      description: content.guideDescription,
      images: [absoluteUrl(localizedPath(locale, "twitter-image"))],
    },
    other: {
      "content-language": locale === "id" ? "id-ID" : locale,
    },
  };
}

export { LOCALE_PATHS, SITE_URL };
