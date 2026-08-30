import GuideClient from "@/components/GuideClient";
import StructuredData from "@/components/StructuredData";
import { LocaleProvider } from "@/lib/i18n/LocaleContext";
import type { Locale } from "@/lib/i18n/dictionaries";

export default function LocalizedGuide({ locale }: { locale: Locale }) {
  return (
    <LocaleProvider initialLocale={locale}>
      <StructuredData locale={locale} page="guide" />
      <GuideClient />
    </LocaleProvider>
  );
}
