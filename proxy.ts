import { NextRequest, NextResponse } from "next/server";
import { SITE_URL } from "@/lib/site";

const PUBLIC_SITE = new URL(SITE_URL);

function firstForwardedValue(value: string | null) {
  return value?.split(",", 1)[0]?.trim() || null;
}

function getHostname(host: string) {
  const normalized = host.trim().toLowerCase();

  if (normalized.startsWith("[")) {
    const closingBracket = normalized.indexOf("]");
    return closingBracket > 0
      ? normalized.slice(1, closingBracket)
      : normalized;
  }

  return normalized.split(":", 1)[0];
}

function isLocalDevelopmentHost(host: string) {
  if (process.env.NODE_ENV === "production") return false;

  const hostname = getHostname(host);
  return (
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname === "::1"
  );
}

export function proxy(request: NextRequest) {
  const requestHost = (
    request.headers.get("host") ||
    request.nextUrl.host
  ).trim().toLowerCase();
  const requestProtocol =
    firstForwardedValue(request.headers.get("x-forwarded-proto")) ||
    request.nextUrl.protocol.replace(":", "");
  const isLocalHost = isLocalDevelopmentHost(requestHost);
  let isCanonicalRequest = false;

  try {
    const requestOrigin = new URL(
      `${requestProtocol.toLowerCase()}://${requestHost}`,
    );
    isCanonicalRequest =
      requestOrigin.hostname.toLowerCase() === PUBLIC_SITE.hostname.toLowerCase() &&
      requestOrigin.port === PUBLIC_SITE.port &&
      requestOrigin.protocol === PUBLIC_SITE.protocol;
  } catch {
    isCanonicalRequest = false;
  }

  // Consolidate aliases and preview hosts on the configured canonical origin.
  if (!isLocalHost && !isCanonicalRequest) {
    const destination = new URL(
      request.nextUrl.pathname + request.nextUrl.search,
      PUBLIC_SITE,
    );
    return NextResponse.redirect(destination, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|_next/data|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico|css|js|map)$).*)",
  ],
};
