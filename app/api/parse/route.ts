// ./app/api/parse/route.ts

import { NextRequest, NextResponse } from "next/server";
import { parseKusonime, isLikelyParsed } from "@/lib/parseKusonime";
import { dictionaries, isLocale } from "@/lib/i18n/dictionaries";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const langParam = req.nextUrl.searchParams.get("lang");
  const t = dictionaries[isLocale(langParam) ? langParam : "id"];

  const url = req.nextUrl.searchParams.get("url");

  if (!url) {
    return NextResponse.json(
      { error: t.errors.urlRequired },
      { status: 400 }
    );
  }

  let parsedUrl: URL;
  try {
    parsedUrl = new URL(url);
    if (!["http:", "https:"].includes(parsedUrl.protocol)) {
      throw new Error("Unsupported protocol.");
    }
  } catch {
    return NextResponse.json(
      { error: t.errors.urlInvalid },
      { status: 400 }
    );
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    const res = await fetch(parsedUrl.toString(), {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
      },
      signal: controller.signal,
      redirect: "follow",
    });
    clearTimeout(timeout);

    if (!res.ok) {
      return NextResponse.json(
        { error: t.errors.upstreamStatus(res.status) },
        { status: 502 }
      );
    }

    const html = await res.text();
    const data = parseKusonime(html, parsedUrl.toString());

    if (!isLikelyParsed(data)) {
      return NextResponse.json(
        { error: t.errors.unrecognized },
        { status: 422 }
      );
    }

    return NextResponse.json({ data });
  } catch (err) {
    const message =
      err instanceof Error && err.name === "AbortError"
        ? t.errors.timeout
        : t.errors.fetchFailed;
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
