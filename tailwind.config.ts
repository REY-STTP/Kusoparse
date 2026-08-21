import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        kuso: {
          bg: "#f2ecdc",
          tape: "#e7ddc6",
          ink: "#171410",
          paper: "#fcfaf2",
          accent: "#d63f1e",
        },
      },
      fontFamily: {
        display: ["var(--font-zenkaku)", "Hiragino Kaku Gothic ProN", "sans-serif"],
        body: ["var(--font-zenkaku)", "Hiragino Kaku Gothic ProN", "sans-serif"],
        mono: ["var(--font-jbmono)", "Courier New", "monospace"],
      },
      boxShadow: {
        hard: "6px 6px 0 0 #171410",
        "hard-sm": "4px 4px 0 0 #171410",
        "hard-hover": "2px 2px 0 0 #171410",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 28s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
