"use client";

import Link from "next/link";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { localizedPath } from "@/lib/seo";

export default function NotFoundContent() {
  const { locale, t } = useLocale();

  return (
    <main
      id="content"
      aria-labelledby="not-found-title"
      className="min-h-dvh flex items-center justify-center px-5 relative z-10"
    >
      <div className="absolute top-4 right-4">
        <LocaleSwitcher />
      </div>

      <div className="hard-border shadow-hard bg-kuso-paper max-w-md w-full p-8 -rotate-1 text-center">
        <div className="font-mono text-xs font-bold uppercase tracking-[0.2em] opacity-50 mb-4">
          {t.notFound.label}
        </div>
        <h1
          id="not-found-title"
          className="font-display font-black text-7xl leading-none"
        >
          4<span className="text-kuso-accent">0</span>4
        </h1>
        <p className="mt-4 text-sm leading-relaxed opacity-80 text-pretty">
          {t.notFound.body}
        </p>
        <Link
          href={localizedPath(locale)}
          className="hard-border press-effect inline-block mt-6 bg-kuso-ink text-kuso-paper px-6 py-3 font-mono text-sm font-bold shadow-hard-sm hover:bg-kuso-accent"
        >
          {t.notFound.back}
        </Link>
      </div>
    </main>
  );
}
