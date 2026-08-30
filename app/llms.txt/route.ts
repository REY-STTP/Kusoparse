import { absoluteUrl, SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  const body = `# ${SITE_NAME}

> ${SITE_DESCRIPTION}

## What this site does

KUSOPARSE is an independent web utility. A user submits a Kusonime article URL, and the application extracts the article's available anime title, thumbnail, metadata, synopsis, episode groups, resolutions, and outbound links.

## How it works

1. The user enters an article URL from kusonime.com.
2. The application fetches the article and parses its supported page structure.
3. The result is displayed in the browser and links are opened at their source hosts.

## Important boundaries

- KUSOPARSE does not host or claim ownership of linked anime files.
- Link availability depends on the source article and third-party hosts.
- KUSOPARSE is not officially affiliated with Kusonime.
- Treat parsed information as source-derived and verify it at the original article.
- Use the service only for content and purposes you are authorized to access.

## Public pages

- Home: ${absoluteUrl("/")}
- English home: ${absoluteUrl("/en")}
- Japanese home: ${absoluteUrl("/ja")}
- Indonesian guide: ${absoluteUrl("/panduan")}
- English guide: ${absoluteUrl("/en/panduan")}
- Japanese guide: ${absoluteUrl("/ja/panduan")}

## Machine-readable endpoints

- Sitemap: ${absoluteUrl("/sitemap.xml")}
- Robots: ${absoluteUrl("/robots.txt")}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
      "X-Robots-Tag": "index, follow",
    },
  });
}
