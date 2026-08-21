// ./app/layout.tsx

import type { Metadata, Viewport } from "next";
import { Zen_Kaku_Gothic_New, JetBrains_Mono } from "next/font/google";
import { LocaleProvider } from "@/lib/i18n/LocaleContext";
import SkipLink from "@/components/SkipLink";
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
  title: "KUSOPARSE — Kusonime Link Parser",
  description:
    "Tempel URL Kusonime, KUSOPARSE mengambil metadata anime dan seluruh link download dalam satu klik. Tanpa popup, tanpa shortlink.",
  openGraph: {
    title: "KUSOPARSE — Kusonime Link Parser",
    description:
      "Tempel URL Kusonime, dapatkan metadata anime dan seluruh link download dalam satu klik. Tanpa popup, tanpa shortlink.",
    type: "website",
    locale: "id_ID",
  },
};

export const viewport: Viewport = {
  themeColor: "#f2ecdc",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={`${zenKaku.variable} ${jbMono.variable}`}>
        <LocaleProvider>
          <SkipLink />
          {children}
        </LocaleProvider>
      </body>
    </html>
  );
}
