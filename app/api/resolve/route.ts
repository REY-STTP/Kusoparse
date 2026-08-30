// ./app/api/resolve/route.ts

import { NextRequest, NextResponse } from "next/server";
import { isResolvableUrl, resolveDownloadLink } from "@/lib/resolveLink";

export const runtime = "nodejs";

const API_HEADERS = {
  "Cache-Control": "no-store",
  "X-Robots-Tag": "noindex, nofollow",
};

function json(data: unknown, status = 200) {
  return NextResponse.json(data, { status, headers: API_HEADERS });
}

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");
  const resolution = req.nextUrl.searchParams.get("resolution") ?? undefined;
  const host = req.nextUrl.searchParams.get("host") ?? undefined;

  if (!url) {
    return json({ error: "URL wajib diisi." }, 400);
  }
  if (url.length > 4096) {
    return json({ error: "URL tidak valid." }, 400);
  }

  let parsedUrl: URL;
  try {
    parsedUrl = new URL(url);
    if (!isResolvableUrl(parsedUrl)) {
      throw new Error("Protokol tidak didukung.");
    }
  } catch {
    return json({ error: "URL tidak valid." }, 400);
  }

  try {
    const result = await resolveDownloadLink(parsedUrl.toString(), {
      resolution,
      host,
    });
    return json(result);
  } catch {
    return json(
      { error: "Gagal resolve link.", url: parsedUrl.toString(), resolved: false },
      500,
    );
  }
}
