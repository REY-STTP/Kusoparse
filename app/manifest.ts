import type { MetadataRoute } from "next";
import { absoluteUrl, SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: SITE_NAME,
    description: SITE_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#f2ecdc",
    theme_color: "#f2ecdc",
    lang: "id-ID",
    icons: [
      {
        src: absoluteUrl("/icon.png"),
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
