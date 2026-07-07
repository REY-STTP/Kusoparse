// ./app/api/parse/route.ts

import { NextRequest, NextResponse } from "next/server";
import { parseKusonime, isLikelyParsed } from "@/lib/parseKusonime";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");

  if (!url) {
    return NextResponse.json(
      { error: "URL wajib diisi." },
      { status: 400 }
    );
  }

  let parsedUrl: URL;
  try {
    parsedUrl = new URL(url);
    if (!["http:", "https:"].includes(parsedUrl.protocol)) {
      throw new Error("Protokol tidak didukung.");
    }
  } catch {
    return NextResponse.json(
      { error: "URL tidak valid." },
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
        { error: `Situs tujuan membalas dengan status ${res.status}.` },
        { status: 502 }
      );
    }

    const html = await res.text();
    const data = parseKusonime(html, parsedUrl.toString());

    if (!isLikelyParsed(data)) {
      return NextResponse.json(
        {
          error:
            "Halaman berhasil diambil, tetapi strukturnya tidak dikenali. KUSOPARSE hanya mendukung halaman Kusonime.",
        },
        { status: 422 }
      );
    }

    return NextResponse.json({ data });
  } catch (err) {
    const message =
      err instanceof Error && err.name === "AbortError"
        ? "Situs tujuan tidak merespons (timeout)."
        : "Gagal mengambil halaman. Coba lagi atau periksa URL-nya.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
