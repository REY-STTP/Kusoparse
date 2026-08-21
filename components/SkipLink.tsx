"use client";

import { useLocale } from "@/lib/i18n/LocaleContext";

export default function SkipLink() {
  const { t } = useLocale();

  return (
    <a href="#content" className="skip-link">
      {t.a11y.skipLink}
    </a>
  );
}
