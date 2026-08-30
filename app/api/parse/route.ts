// ./app/api/parse/route.ts

import { NextRequest, NextResponse } from "next/server";
import { parseKusonime, isLikelyParsed } from "@/lib/parseKusonime";
import { dictionaries, isLocale } from "@/lib/i18n/dictionaries";
import { isKusonimeArticleUrl } from "@/lib/urls";
import { readLimitedText } from "@/lib/http";

export const runtime = "nodejs";

const API_HEADERS = {
  "Cache-Control": "no-store",
  "X-Robots-Tag": "noindex, nofollow",
};

function json(data: unknown, status = 200) {
  return NextResponse.json(data, { status, headers: API_HEADERS });
}

export async function GET(req: NextRequest) {
  const langParam = req.nextUrl.searchParams.get("lang");
  const t = dictionaries[isLocale(langParam) ? langParam : "id"];

  const url = req.nextUrl.searchParams.get("url");

  if (!url) {
    return json({ error: t.errors.urlRequired }, 400);
  }
  if (url.length > 4096) {
    return json({ error: t.errors.urlInvalid }, 400);
  }

  let parsedUrl: URL;
  try {
    parsedUrl = new URL(url);
    if (!isKusonimeArticleUrl(parsedUrl)) {
      throw new Error("Unsupported protocol.");
    }
  } catch {
    return json({ error: t.errors.urlInvalid }, 400);
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    let currentUrl = parsedUrl;

    try {
      let res: Response | null = null;

      for (let redirects = 0; redirects <= 3; redirects += 1) {
        res = await fetch(currentUrl, {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
          },
          signal: controller.signal,
          redirect: "manual",
        });

        if (![301, 302, 303, 307, 308].includes(res.status)) break;

        const location = res.headers.get("location");
        if (!location || redirects === 3) throw new Error("Invalid redirect.");

        const redirectUrl = new URL(location, currentUrl);
        if (!isKusonimeArticleUrl(redirectUrl)) {
          throw new Error("Unsupported redirect.");
        }
        currentUrl = redirectUrl;
      }

      if (!res) throw new Error("No upstream response.");
      if (!res.ok) {
        return json({ error: t.errors.upstreamStatus(res.status) }, 502);
      }

      const html = await readLimitedText(res);
      if (html === null) {
        return json({ error: t.errors.fetchFailed }, 502);
      }
      const data = parseKusonime(html, currentUrl.toString());

      if (!isLikelyParsed(data)) {
        return json({ error: t.errors.unrecognized }, 422);
      }

      return json({ data });
    } finally {
      clearTimeout(timeout);
    }
  } catch (err) {
    const message =
      err instanceof Error && err.name === "AbortError"
        ? t.errors.timeout
        : t.errors.fetchFailed;
    return json({ error: message }, 500);
  }
}
