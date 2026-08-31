"use client";

import Link from "next/link";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { hostsPath, localizedPath } from "@/lib/seo";

export default function GuideClient() {
  const { locale, t } = useLocale();

  return (
    <main
      id="content"
      className="min-h-dvh flex flex-col relative z-10 overflow-x-clip"
    >
      <div className="bg-kuso-ink text-kuso-paper border-b-[3px] border-kuso-ink py-2">
        <div className="max-w-3xl mx-auto px-5 flex items-center justify-between gap-4 font-mono text-[11px] font-bold tracking-[0.16em] uppercase">
          <Link href={localizedPath(locale)} className="hover:text-kuso-accent">
            KUSOPARSE
          </Link>
          <span className="text-kuso-accent" aria-hidden="true">
            GUIDE//
          </span>
        </div>
      </div>

      <div className="w-full max-w-3xl mx-auto px-5 pt-8 sm:pt-12 pb-12">
        <div className="flex justify-end mb-10">
          <LocaleSwitcher page="guide" />
        </div>

        <article>
          <header className="max-w-2xl mb-12">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-kuso-accent mb-4">
              {t.seo.eyebrow}
            </p>
            <h1 className="font-display font-black text-4xl sm:text-6xl leading-[0.95] text-balance">
              {t.seo.guideTitle}
            </h1>
            <p className="mt-6 text-base sm:text-lg leading-relaxed text-pretty opacity-85">
              {t.seo.guideDescription}
            </p>
          </header>

          <div className="grid gap-10 max-w-2xl">
            <section aria-labelledby="guide-intro-title">
              <h2
                id="guide-intro-title"
                className="font-display font-bold text-2xl mb-4"
              >
                {t.seo.title}
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-pretty opacity-85">
                {t.seo.guideIntro}
              </p>
            </section>

            <section aria-labelledby="steps-title" id="how-to">
              <h2 id="steps-title" className="font-display font-bold text-2xl mb-4">
                {t.seo.howToTitle}
              </h2>
              <ol className="space-y-4">
                {t.seo.howToSteps.map((step, index) => (
                  <li
                    key={step}
                    className="flex gap-4 border-l-[3px] border-kuso-accent pl-4 text-sm sm:text-base leading-relaxed"
                  >
                    <span className="font-mono text-kuso-accent font-bold tabular-nums">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </section>

            <section aria-labelledby="features-title">
              <h2 id="features-title" className="font-display font-bold text-2xl mb-4">
                {t.seo.featuresTitle}
              </h2>
              <ul className="space-y-4">
                {t.seo.features.map((feature) => (
                  <li key={feature.title}>
                    <h3 className="font-bold text-base">{feature.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed opacity-75">
                      {feature.description}
                    </p>
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="limits-title">
              <h2 id="limits-title" className="font-display font-bold text-2xl mb-4">
                {t.seo.limitationsTitle}
              </h2>
              <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base leading-relaxed opacity-85">
                {t.seo.limitations.map((limitation) => (
                  <li key={limitation}>{limitation}</li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="faq-title" id="faq">
              <h2 id="faq-title" className="font-display font-bold text-2xl mb-4">
                {t.seo.faqTitle}
              </h2>
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
                    <p className="mt-3 text-sm leading-relaxed opacity-75">
                      {item.answer}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          </div>
        </article>

        <nav aria-label={t.seo.backHome} className="mt-12 flex flex-wrap gap-3">
          <Link
            href={localizedPath(locale)}
            className="hard-border press-effect inline-flex bg-kuso-ink text-kuso-paper px-5 py-3 font-mono text-sm font-bold shadow-hard-sm hover:bg-kuso-accent"
          >
            {t.seo.backHome}
          </Link>
          <Link
            href={hostsPath(locale)}
            className="hard-border press-effect inline-flex bg-kuso-paper px-5 py-3 font-mono text-sm font-bold shadow-hard-sm hover:bg-kuso-tape"
          >
            {t.seo.hostsLink}
          </Link>
        </nav>
      </div>

      <footer className="mt-auto px-5 pb-8 pt-6 text-center font-mono text-[11px] leading-relaxed opacity-60">
        <p>KUSOPARSE © {new Date().getFullYear()} — {t.footer.line1}</p>
        <p className="mt-1">{t.footer.line2}</p>
      </footer>
    </main>
  );
}
