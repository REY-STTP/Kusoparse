"use client";

import Link from "next/link";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { LOCALES, LOCALE_LABELS } from "@/lib/i18n/dictionaries";
import { pagePath, type LocalizedPage } from "@/lib/seo";

export default function LocaleSwitcher({ page = "home" }: { page?: LocalizedPage }) {
  const { locale, setLocale, t } = useLocale();

  return (
    <div className="flex" role="group" aria-label={t.a11y.switcher}>
      {LOCALES.map((nextLocale, index) => {
        const active = locale === nextLocale;

        return (
          <Link
            key={nextLocale}
            href={pagePath(nextLocale, page)}
            onClick={() => setLocale(nextLocale)}
            aria-current={active ? "page" : undefined}
            className={`hard-border press-effect px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-widest
              ${index > 0 ? "-ml-[3px]" : ""}
              ${
                active
                  ? "bg-kuso-accent text-kuso-paper relative z-10 shadow-hard-sm"
                  : "bg-kuso-paper hover:bg-kuso-tape"
              }`}
          >
            {LOCALE_LABELS[nextLocale]}
          </Link>
        );
      })}
    </div>
  );
}
