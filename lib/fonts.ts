// ./lib/fonts.ts

import { JetBrains_Mono, Zen_Kaku_Gothic_New } from "next/font/google";

// Shared font instances so every per-locale root layout in app/(id),
// app/(en), and app/(ja) registers the same CSS variables.
export const zenKaku = Zen_Kaku_Gothic_New({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-zenkaku",
});

export const jbMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-jbmono",
});
