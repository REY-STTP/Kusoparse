import type { Metadata, Viewport } from "next";
import { dictionaries, type Locale } from "@/lib/i18n/dictionaries";
import {
  absoluteUrl,
  GOOGLE_SITE_VERIFICATION,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site";

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

// Guide pages use a localized slug: /panduan, /en/guide, /ja/guide.
const GUIDE_SEGMENTS: Record<Locale, string> = {
  id: "panduan",
  en: "guide",
  ja: "guide",
};

const HOSTS_SEGMENT = "hosts";

export type LocalizedPage = "home" | "guide" | "hosts";

export function localizedPath(locale: Locale, path = "") {
  const suffix = path ? `/${path.replace(/^\/+/, "")}` : "";
  return locale === "id" ? suffix || "/" : `${LOCALE_PATHS[locale]}${suffix}`;
}

export function guidePath(locale: Locale) {
  return localizedPath(locale, GUIDE_SEGMENTS[locale]);
}

export function hostsPath(locale: Locale) {
  return localizedPath(locale, HOSTS_SEGMENT);
}

export function pagePath(locale: Locale, page: LocalizedPage) {
  if (page === "guide") return guidePath(locale);
  if (page === "hosts") return hostsPath(locale);
  return localizedPath(locale);
}

export function getLanguageAlternates(page: LocalizedPage) {
  return {
    "id-ID": absoluteUrl(pagePath("id", page)),
    en: absoluteUrl(pagePath("en", page)),
    ja: absoluteUrl(pagePath("ja", page)),
    "x-default": absoluteUrl(pagePath("id", page)),
  };
}

const OG_LOCALE_ALTERNATES: Record<Locale, string[]> = {
  id: [OG_LOCALES.en, OG_LOCALES.ja],
  en: [OG_LOCALES.id, OG_LOCALES.ja],
  ja: [OG_LOCALES.id, OG_LOCALES.en],
};

export const ROOT_VIEWPORT: Viewport = {
  themeColor: "#f2ecdc",
  colorScheme: "light",
};

// Shared root metadata for the per-locale root layouts in app/(id),
// app/(en), and app/(ja). Pages override title, description, and
// alternates with their own localized metadata.
export function getLayoutMetadata(locale: Locale): Metadata {
  const content = dictionaries[locale].seo;

  return {
    metadataBase: new URL(SITE_URL),
    title: content.metaTitle,
    applicationName: SITE_NAME,
    description: content.description,
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    category: "technology",
    referrer: "strict-origin-when-cross-origin",
    verification: {
      google: GOOGLE_SITE_VERIFICATION,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    icons: {
      icon: [
        { url: "/icon.png", type: "image/png" },
        { url: "/favicon.ico", sizes: "32x32" },
      ],
      apple: "/apple-icon.png",
    },
  };
}

function buildPageMetadata(locale: Locale, page: LocalizedPage): Metadata {
  const content = dictionaries[locale].seo;
  const title =
    page === "guide"
      ? content.guideTitle
      : page === "hosts"
        ? content.hostsMetaTitle
        : content.metaTitle;
  const description =
    page === "guide"
      ? content.guideDescription
      : page === "hosts"
        ? content.hostsDescription
        : content.description;
  const canonical = absoluteUrl(pagePath(locale, page));

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: getLanguageAlternates(page),
    },
    // og:image / twitter:image URLs are auto-injected from the per-locale
    // opengraph-image / twitter-image file conventions, which include the
    // build content hash in the URL. Explicit URLs would 404.
    openGraph: {
      type: page === "home" ? "website" : "article",
      url: canonical,
      siteName: SITE_NAME,
      title,
      description,
      locale: OG_LOCALES[locale],
      alternateLocale: OG_LOCALE_ALTERNATES[locale],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    other: {
      "content-language": locale === "id" ? "id-ID" : locale,
    },
  };
}

export function getLocalizedMetadata(locale: Locale): Metadata {
  return buildPageMetadata(locale, "home");
}

export function getGuideMetadata(locale: Locale): Metadata {
  return buildPageMetadata(locale, "guide");
}

export function getHostsMetadata(locale: Locale): Metadata {
  return buildPageMetadata(locale, "hosts");
}

export { LOCALE_PATHS, SITE_URL };
