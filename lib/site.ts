const DEFAULT_SITE_URL = "https://www.kusoparse.web.id";

function getSiteUrl() {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (!configuredUrl) return DEFAULT_SITE_URL;

  try {
    const url = new URL(configuredUrl);
    if (!["http:", "https:"].includes(url.protocol)) return DEFAULT_SITE_URL;
    return url.origin;
  } catch {
    return DEFAULT_SITE_URL;
  }
}

export const SITE_URL = getSiteUrl();
export const SITE_NAME = "KUSOPARSE";
export const SITE_DESCRIPTION =
  "Parser URL Kusonime untuk mengambil metadata anime, informasi episode, sinopsis, dan link download dalam satu tampilan.";

// Google Search Console verification token for the site.
export const GOOGLE_SITE_VERIFICATION =
  "LKO88BruVcnQmYN33rV5V-vD97Ep9hrhSKUdHGsilMs";

// Bing Webmaster Tools verification token for the site.
export const BING_SITE_VERIFICATION =
  "251DD7C241139056B7F36D7E05ABA7E2";

export function absoluteUrl(path = "/") {
  return new URL(path, `${SITE_URL}/`).toString();
}
