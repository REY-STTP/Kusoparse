// ./app/(en)/layout.tsx

import type { Metadata } from "next";
import { LocaleProvider } from "@/lib/i18n/LocaleContext";
import SkipLink from "@/components/SkipLink";
import { jbMono, zenKaku } from "@/lib/fonts";
import { getLayoutMetadata, ROOT_VIEWPORT } from "@/lib/seo";
import "../globals.css";

export const metadata: Metadata = getLayoutMetadata("en");
export const viewport = ROOT_VIEWPORT;

export default function EnglishRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="alternate" type="text/plain" title="LLMs" href="/llms.txt" />
      </head>
      <body className={`${zenKaku.variable} ${jbMono.variable}`}>
        <LocaleProvider initialLocale="en">
          <SkipLink />
          {children}
        </LocaleProvider>
      </body>
    </html>
  );
}
