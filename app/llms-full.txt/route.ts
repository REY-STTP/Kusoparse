import { absoluteUrl, SITE_NAME } from "@/lib/site";
import { dictionaries } from "@/lib/i18n/dictionaries";
import {
  DIRECT_HOSTS,
  DIRECT_HOST_COUNT,
  INTERMEDIARY_HOSTS,
  INTERMEDIARY_HOST_COUNT,
} from "@/lib/hosts";
import { guidePath, hostsPath, localizedPath } from "@/lib/seo";

export const dynamic = "force-static";

function link(label: string, path: string) {
  return `- [${label}](${absoluteUrl(path)})`;
}

export function GET() {
  const seo = dictionaries.en.seo;

  const body = `# ${SITE_NAME}

> ${seo.description}

KUSOPARSE is an independent web utility at ${absoluteUrl("/")}. It reads a Kusonime article page and presents the article's anime metadata, synopsis, episode groups, resolutions, and outbound download links in a single scannable result. The interface is available in Indonesian, English, and Japanese.

## Overview

- Supported input: a Kusonime article URL such as https://kusonime.com/anime-title/ (or an equivalent www.kusonime.com URL).
- Interface languages: Indonesian, English, Japanese.
- Direct download hosts recognized: ${DIRECT_HOST_COUNT}.
- Shortlink resolvers supported: ${INTERMEDIARY_HOST_COUNT}.
- No account, upload, or payment is required; the service is free to use.

## How it works

${seo.howToSteps.map((step, index) => `${index + 1}. ${step}`).join("\n")}

## Features

${seo.features.map((feature) => `- **${feature.title}**: ${feature.description}`).join("\n")}

## Supported hosts

Direct download hosts (${DIRECT_HOST_COUNT}):

${DIRECT_HOSTS.map((host) => `- ${host}`).join("\n")}

Shortlink resolvers (${INTERMEDIARY_HOST_COUNT}):

${INTERMEDIARY_HOSTS.map((host) => `- ${host}`).join("\n")}

Only the resolvers listed above are expanded automatically. Other links found on the source article are opened directly at their source address.

## Frequently asked questions

${seo.faq.map((item) => `### ${item.question}\n\n${item.answer}`).join("\n\n")}

## Limitations and responsible use

${seo.limitations.map((limitation) => `- ${limitation}`).join("\n")}

## Attribution

KUSOPARSE is an independent tool and does not claim affiliation with Kusonime. Every parsed result links back to the original source article. Parsed information is source-derived and should be verified at the original article.

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
${link("llms.txt", "/llms.txt")}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
      "X-Robots-Tag": "index, follow",
    },
  });
}
