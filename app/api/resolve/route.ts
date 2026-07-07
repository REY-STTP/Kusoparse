// ./app/api/resolve/route.ts

import { NextRequest, NextResponse } from "next/server";
import { resolveDownloadLink } from "@/lib/resolveLink";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");
  const resolution = req.nextUrl.searchParams.get("resolution") ?? undefined;
  const host = req.nextUrl.searchParams.get("host") ?? undefined;

  if (!url) {
    return NextResponse.json({ error: "URL wajib diisi." }, { status: 400 });
  }

  let parsedUrl: URL;
  try {
    parsedUrl = new URL(url);
    if (!["http:", "https:"].includes(parsedUrl.protocol)) {
      throw new Error("Protokol tidak didukung.");
    }
  } catch {
    return NextResponse.json({ error: "URL tidak valid." }, { status: 400 });
  }

  try {
    const result = await resolveDownloadLink(parsedUrl.toString(), {
      resolution,
      host,
    });
    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { error: "Gagal resolve link.", url: parsedUrl.toString(), resolved: false },
      { status: 500 }
    );
  }
}