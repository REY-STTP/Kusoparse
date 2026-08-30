// ./app/layout.tsx

import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { Zen_Kaku_Gothic_New, JetBrains_Mono } from "next/font/google";
import { LocaleProvider } from "@/lib/i18n/LocaleContext";
import SkipLink from "@/components/SkipLink";
import { absoluteUrl, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";
import { isLocale, type Locale } from "@/lib/i18n/dictionaries";
import "./globals.css";

const zenKaku = Zen_Kaku_Gothic_New({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-zenkaku",
});

const jbMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-jbmono",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "KUSOPARSE | Parser URL Kusonime",
  applicationName: SITE_NAME,
  description: SITE_DESCRIPTION,
  keywords: [
    "Kusonime",
    "parser URL anime",
    "metadata anime",
    "link download anime",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "technology",
  referrer: "strict-origin-when-cross-origin",
  verification: {
    google: "LKO88BruVcnQmYN33rV5V-vD97Ep9hrhSKUdHGsilMs",
  },
  alternates: {
    canonical: absoluteUrl("/"),
    languages: {
      "id-ID": absoluteUrl("/"),
      en: absoluteUrl("/en"),
      ja: absoluteUrl("/ja"),
      "x-default": absoluteUrl("/"),
    },
  },
  openGraph: {
    type: "website",
    url: absoluteUrl("/"),
    siteName: SITE_NAME,
    title: "KUSOPARSE | Parser URL Kusonime",
    description: SITE_DESCRIPTION,
    locale: "id_ID",
    alternateLocale: ["en_US", "ja_JP"],
    images: [
      {
        url: absoluteUrl("/opengraph-image"),
        width: 1200,
        height: 630,
        alt: "KUSOPARSE, parser URL Kusonime",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KUSOPARSE | Parser URL Kusonime",
    description: SITE_DESCRIPTION,
    images: [absoluteUrl("/twitter-image")],
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

export const viewport: Viewport = {
  themeColor: "#f2ecdc",
  colorScheme: "light",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const requestHeaders = await headers();
  const requestedLocale = requestHeaders.get("x-kusoparse-locale");
  const initialLocale: Locale = isLocale(requestedLocale)
    ? requestedLocale
    : "id";

  return (
    <html lang={initialLocale === "id" ? "id-ID" : initialLocale}>
      <body className={`${zenKaku.variable} ${jbMono.variable}`}>
        <LocaleProvider initialLocale={initialLocale}>
          <SkipLink />
          {children}
        </LocaleProvider>
      </body>
    </html>
  );
}
