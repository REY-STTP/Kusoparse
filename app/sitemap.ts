import type { MetadataRoute } from "next";
import { execFileSync } from "node:child_process";
import { statSync } from "node:fs";
import { join } from "node:path";
import { LOCALES, type Locale } from "@/lib/i18n/dictionaries";
import { absoluteUrl } from "@/lib/site";
import { getLanguageAlternates, pagePath, type LocalizedPage } from "@/lib/seo";

const FALLBACK_DATE = "2026-05-11T00:00:00+07:00";
const REPO_ROOT = process.cwd();

// Waktu commit terakhir yang menyentuh file-file sumber (null jika git tak tersedia).
function gitLastModified(paths: string[]): Date | null {
  try {
    const out = execFileSync("git", ["log", "-1", "--format=%cI", "--", ...paths], {
      cwd: REPO_ROOT,
      encoding: "utf-8",
      timeout: 10_000,
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    if (!out) return null;
    const date = new Date(out);
    return Number.isNaN(date.getTime()) ? null : date;
  } catch {
    return null;
  }
}

// mtime terbaru di antara file-file sumber (null jika file tak terbaca).
function mtimeNewest(paths: string[]): Date | null {
  try {
    let newest = 0;
    for (const p of paths) {
      const m = statSync(join(/*turbopackIgnore: true*/ REPO_ROOT, p)).mtimeMs;
      if (m > newest) newest = m;
    }
    return newest > 0 ? new Date(newest) : null;
  } catch {
    return null;
  }
}

function lastModified(paths: string[]): Date {
  return gitLastModified(paths) ?? mtimeNewest(paths) ?? new Date(FALLBACK_DATE);
}

// File sumber yang menentukan "kapan konten route ini terakhir berubah".
const SHARED_SOURCES = [
  "lib/i18n/dictionaries.ts",
  "lib/seo.ts",
  "lib/site.ts",
  "components/StructuredData.tsx",
];
const HOME_SOURCES = [...SHARED_SOURCES, "components/HomeClient.tsx", "components/SeoContent.tsx"];
const GUIDE_SOURCES = [...SHARED_SOURCES, "components/GuideClient.tsx"];
const HOSTS_SOURCES = [...SHARED_SOURCES, "lib/hosts.ts", "components/HostsContent.tsx"];
const DOC_SOURCES = ["lib/hosts.ts", "lib/seo.ts", "lib/site.ts"];

function localizedEntries(
  page: LocalizedPage,
  changeFrequency: "monthly" | "yearly",
  idPriority: number,
  otherPriority: number,
  sources: string[],
): MetadataRoute.Sitemap {
  return LOCALES.map((locale: Locale) => ({
    url: absoluteUrl(pagePath(locale, page)),
    changeFrequency,
    priority: locale === "id" ? idPriority : otherPriority,
    lastModified: lastModified(sources),
    alternates: { languages: getLanguageAlternates(page) },
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...localizedEntries("home", "monthly", 1, 0.8, HOME_SOURCES),
    ...localizedEntries("guide", "yearly", 0.7, 0.6, GUIDE_SOURCES),
    ...localizedEntries("hosts", "monthly", 0.6, 0.5, HOSTS_SOURCES),
    {
      url: absoluteUrl("/llms.txt"),
      changeFrequency: "weekly",
      priority: 0.8,
      lastModified: lastModified(["app/llms.txt/route.ts", ...DOC_SOURCES]),
    },
    {
      url: absoluteUrl("/llms-full.txt"),
      changeFrequency: "weekly",
      priority: 0.8,
      lastModified: lastModified(["app/llms-full.txt/route.ts", ...DOC_SOURCES]),
    },
  ];
}
