import { dictionaries, type Locale } from "@/lib/i18n/dictionaries";
import { absoluteUrl, SITE_NAME, SITE_URL } from "@/lib/site";
import { localizedPath } from "@/lib/seo";

function serializeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export default function StructuredData({
  locale = "id",
  page = "home",
}: {
  locale?: Locale;
  page?: "home" | "guide";
}) {
  const content = dictionaries[locale].seo;
  const pageUrl = absoluteUrl(
    page === "guide" ? localizedPath(locale, "panduan") : localizedPath(locale),
  );
  const pageTitle = page === "guide" ? content.guideTitle : content.metaTitle;
  const pageDescription =
    page === "guide" ? content.guideDescription : content.description;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: absoluteUrl("/icon.png"),
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        description: content.description,
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: ["id-ID", "en", "ja"],
      },
      {
        "@type": "WebApplication",
        "@id": `${SITE_URL}/#application`,
        name: SITE_NAME,
        url: SITE_URL,
        description: content.description,
        applicationCategory: "UtilityApplication",
        operatingSystem: "Any",
        browserRequirements: "Requires a modern web browser with JavaScript enabled.",
        isAccessibleForFree: true,
        featureList: content.features.map((feature) => feature.title),
        provider: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: pageTitle,
        description: pageDescription,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        inLanguage: locale === "id" ? "id-ID" : locale,
        ...(page === "guide"
          ? {
              breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
              mainEntity: { "@id": `${pageUrl}#how-to` },
            }
          : { mainEntity: { "@id": `${SITE_URL}/#application` } }),
      },
      ...(page === "guide"
        ? [
            {
              "@type": "BreadcrumbList",
              "@id": `${pageUrl}#breadcrumb`,
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: SITE_NAME,
                  item: absoluteUrl(localizedPath(locale)),
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: content.guideTitle,
                  item: pageUrl,
                },
              ],
            },
          ]
        : []),
      {
        "@type": "HowTo",
        "@id": `${pageUrl}#how-to`,
        name: content.howToTitle,
        description: content.description,
        totalTime: "PT1M",
        step: content.howToSteps.map((text, index) => ({
          "@type": "HowToStep",
          position: index + 1,
          name: text,
          text,
        })),
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: content.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
    />
  );
}
