// ./app/(id)/layout.tsx

import type { Metadata } from "next";
import { LocaleProvider } from "@/lib/i18n/LocaleContext";
import SkipLink from "@/components/SkipLink";
import { jbMono, zenKaku } from "@/lib/fonts";
import { getLayoutMetadata, ROOT_VIEWPORT } from "@/lib/seo";
import "../globals.css";

export const metadata: Metadata = getLayoutMetadata("id");
export const viewport = ROOT_VIEWPORT;

export default function IndonesianRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id-ID">
      <body className={`${zenKaku.variable} ${jbMono.variable}`}>
        <LocaleProvider initialLocale="id">
          <SkipLink />
          {children}
        </LocaleProvider>
      </body>
    </html>
  );
}
