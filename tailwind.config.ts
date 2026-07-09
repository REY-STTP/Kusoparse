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
          bg: "#efe9fe",
          tape: "#e3dafc",
          ink: "#14121f",
          paper: "#fffcf5",
          pink: "#ff3e7f",
          lime: "#c6ff35",
          blue: "#2e5eff",
          mustard: "#ffc53d",
        },
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "Arial Black", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jbmono)", "Courier New", "monospace"],
      },
      boxShadow: {
        hard: "6px 6px 0 0 #14121f",
        "hard-sm": "4px 4px 0 0 #14121f",
        "hard-hover": "2px 2px 0 0 #14121f",
      },
    },
  },
  plugins: [],
};
export default config;