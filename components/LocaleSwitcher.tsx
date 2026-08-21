"use client";

import { useLocale } from "@/lib/i18n/LocaleContext";
import { LOCALES, LOCALE_LABELS } from "@/lib/i18n/dictionaries";

export default function LocaleSwitcher() {
  const { locale, setLocale, t } = useLocale();

  return (
    <div className="flex" role="group" aria-label={t.a11y.switcher}>
      {LOCALES.map((l, i) => {
        const active = locale === l;
        return (
          <button
            key={l}
            onClick={() => setLocale(l)}
            aria-pressed={active}
            className={`hard-border press-effect px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-widest
              ${i > 0 ? "-ml-[3px]" : ""}
              ${
                active
                  ? "bg-kuso-accent text-kuso-paper relative z-10 shadow-hard-sm"
                  : "bg-kuso-paper hover:bg-kuso-tape"
              }`}
          >
            {LOCALE_LABELS[l]}
          </button>
        );
      })}
    </div>
  );
}
