import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: absoluteUrl("/"),
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: {
          "id-ID": absoluteUrl("/"),
          en: absoluteUrl("/en"),
          ja: absoluteUrl("/ja"),
          "x-default": absoluteUrl("/"),
        },
      },
    },
    {
      url: absoluteUrl("/en"),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          "id-ID": absoluteUrl("/"),
          en: absoluteUrl("/en"),
          ja: absoluteUrl("/ja"),
          "x-default": absoluteUrl("/"),
        },
      },
    },
    {
      url: absoluteUrl("/ja"),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          "id-ID": absoluteUrl("/"),
          en: absoluteUrl("/en"),
          ja: absoluteUrl("/ja"),
          "x-default": absoluteUrl("/"),
        },
      },
    },
    {
      url: absoluteUrl("/panduan"),
      changeFrequency: "yearly",
      priority: 0.7,
      alternates: {
        languages: {
          "id-ID": absoluteUrl("/panduan"),
          en: absoluteUrl("/en/panduan"),
          ja: absoluteUrl("/ja/panduan"),
          "x-default": absoluteUrl("/panduan"),
        },
      },
    },
    {
      url: absoluteUrl("/en/panduan"),
      changeFrequency: "yearly",
      priority: 0.6,
      alternates: {
        languages: {
          "id-ID": absoluteUrl("/panduan"),
          en: absoluteUrl("/en/panduan"),
          ja: absoluteUrl("/ja/panduan"),
          "x-default": absoluteUrl("/panduan"),
        },
      },
    },
    {
      url: absoluteUrl("/ja/panduan"),
      changeFrequency: "yearly",
      priority: 0.6,
      alternates: {
        languages: {
          "id-ID": absoluteUrl("/panduan"),
          en: absoluteUrl("/en/panduan"),
          ja: absoluteUrl("/ja/panduan"),
          "x-default": absoluteUrl("/panduan"),
        },
      },
    },
  ];
}
