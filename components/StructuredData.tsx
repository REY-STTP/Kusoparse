import { dictionaries, type Locale } from "@/lib/i18n/dictionaries";
import { absoluteUrl, SITE_NAME, SITE_URL } from "@/lib/site";
import { localizedPath, pagePath, type LocalizedPage } from "@/lib/seo";
import { DIRECT_HOSTS, INTERMEDIARY_HOSTS } from "@/lib/hosts";

function serializeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export default function StructuredData({
  locale = "id",
  page = "home",
}: {
  locale?: Locale;
  page?: LocalizedPage;
}) {
  const content = dictionaries[locale].seo;
  const pageUrl = absoluteUrl(pagePath(locale, page));
  const pageTitle =
    page === "guide"
      ? content.guideTitle
      : page === "hosts"
        ? content.hostsMetaTitle
        : content.metaTitle;
  const pageDescription =
    page === "guide"
      ? content.guideDescription
      : page === "hosts"
        ? content.hostsDescription
        : content.description;
  const supportedHosts = [...DIRECT_HOSTS, ...INTERMEDIARY_HOSTS];

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
        alternateName: ["Kusoparse", "Kusoparse Parser"],
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
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: ["#about", "#faq", "#how-to"],
        },
        ...(page === "home"
          ? { mainEntity: { "@id": `${SITE_URL}/#application` } }
          : {
              breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
              mainEntity: {
                "@id":
                  page === "guide" ? `${pageUrl}#how-to` : `${pageUrl}#hosts`,
              },
            }),
      },
      ...(page !== "home"
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
                  name: pageTitle,
                  item: pageUrl,
                },
              ],
            },
          ]
        : []),
      ...(page === "hosts"
        ? [
            {
              "@type": "ItemList",
              "@id": `${pageUrl}#hosts`,
              name: content.hostsTitle,
              numberOfItems: supportedHosts.length,
              itemListElement: supportedHosts.map((host, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: host,
                url: `https://${host}`,
              })),
            },
          ]
        : []),
      ...(page !== "hosts"
        ? [
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
          ]
        : []),
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
    />
  );
}
