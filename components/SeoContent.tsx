"use client";

import Link from "next/link";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { localizedPath } from "@/lib/seo";

export default function SeoContent() {
  const { locale, t } = useLocale();

  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="mt-16 border-t-[3px] border-kuso-ink/20 pt-10"
    >
      <div className="max-w-2xl mx-auto space-y-10">
        <div>
          <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-kuso-accent mb-3">
            {t.seo.eyebrow}
          </p>
          <h2
            id="about-title"
            className="font-display font-black text-2xl sm:text-3xl leading-tight"
          >
            {t.seo.title}
          </h2>
          <p className="mt-4 text-sm sm:text-base leading-relaxed text-pretty opacity-85">
            {t.seo.description}
          </p>
        </div>

        <div>
          <h3 className="font-display font-bold text-xl mb-4">
            {t.seo.featuresTitle}
          </h3>
          <ul className="grid gap-4 sm:grid-cols-2">
            {t.seo.features.map((feature) => (
              <li
                key={feature.title}
                className="border-l-[3px] border-kuso-accent pl-4"
              >
                <h4 className="font-bold text-base">{feature.title}</h4>
                <p className="mt-1 text-sm leading-relaxed opacity-75">
                  {feature.description}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div id="how-to" aria-labelledby="how-to-title">
          <h3
            id="how-to-title"
            className="font-display font-bold text-xl mb-4"
          >
            {t.seo.howToTitle}
          </h3>
          <ol className="space-y-3">
            {t.seo.howToSteps.map((step, index) => (
              <li
                key={step}
                className="flex gap-3 font-mono text-sm leading-relaxed"
              >
                <span className="text-kuso-accent font-bold tabular-nums shrink-0">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
          <Link
            href={localizedPath(locale, "panduan")}
            className="inline-flex mt-5 font-mono text-xs font-bold uppercase tracking-wider underline decoration-2 underline-offset-4 hover:text-kuso-accent"
          >
            {t.seo.guideLink}
          </Link>
        </div>

        <div id="faq" aria-labelledby="faq-title">
          <h3 id="faq-title" className="font-display font-bold text-xl mb-4">
            {t.seo.faqTitle}
          </h3>
          <div className="divide-y-[2px] divide-kuso-ink/20 border-y-[2px] border-kuso-ink/20">
            {t.seo.faq.map((item) => (
              <details key={item.question} className="group py-4">
                <summary className="cursor-pointer list-none pr-8 font-bold text-sm sm:text-base relative">
                  {item.question}
                  <span
                    aria-hidden="true"
                    className="absolute right-0 top-0 font-mono text-kuso-accent group-open:rotate-45 transition-transform"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 max-w-prose text-sm leading-relaxed opacity-75">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
