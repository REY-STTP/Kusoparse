// ./app/layout.tsx

import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-space-grotesk",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
});

const jbMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-jbmono",
});

export const metadata: Metadata = {
  title: "KUSOPARSE",
  description: "Tempel URL Kusonime, KUSOPARSE akan mengambil metadata dan link download dalam satu klik."
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${jbMono.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
