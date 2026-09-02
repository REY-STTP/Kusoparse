import { absoluteUrl, SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";
import { guidePath, hostsPath, localizedPath } from "@/lib/seo";
import {
  DIRECT_HOST_COUNT,
  INTERMEDIARY_HOST_COUNT,
} from "@/lib/hosts";

export const dynamic = "force-static";

function link(label: string, path: string) {
  return `- [${label}](${absoluteUrl(path)})`;
}

export function GET() {
  const body = `# ${SITE_NAME}

> ${SITE_DESCRIPTION}

## What this site does

KUSOPARSE is an independent web utility. A user submits a Kusonime article URL, and the application extracts the article's available anime title, thumbnail, metadata, synopsis, episode groups, resolutions, and outbound links.

The parser recognizes ${DIRECT_HOST_COUNT} direct download hosts and ${INTERMEDIARY_HOST_COUNT} shortlink resolvers.

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

## Frequently asked questions

FAQ is available as JSON-LD FAQPage on every page. For full Q&A see ${absoluteUrl("/llms-full.txt")}.

## Public pages

${link("Home (Bahasa Indonesia)", localizedPath("id"))}
${link("Home (English)", localizedPath("en"))}
${link("Home (Japanese)", localizedPath("ja"))}
${link("Guide (Bahasa Indonesia)", guidePath("id"))}
${link("Guide (English)", guidePath("en"))}
${link("Guide (Japanese)", guidePath("ja"))}
${link("Supported hosts (Bahasa Indonesia)", hostsPath("id"))}
${link("Supported hosts (English)", hostsPath("en"))}
${link("Supported hosts (Japanese)", hostsPath("ja"))}

## Machine-readable endpoints

${link("Sitemap", "/sitemap.xml")}
${link("Robots", "/robots.txt")}
${link("Full content for LLMs (llms-full.txt)", "/llms-full.txt")}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
      "X-Robots-Tag": "index, follow",
    },
  });
}
