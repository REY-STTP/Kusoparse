import HomeClient from "@/components/HomeClient";
import StructuredData from "@/components/StructuredData";
import { LocaleProvider } from "@/lib/i18n/LocaleContext";
import type { Locale } from "@/lib/i18n/dictionaries";

export default function LocalizedHome({ locale }: { locale: Locale }) {
  return (
    <LocaleProvider initialLocale={locale}>
      <StructuredData locale={locale} />
      <HomeClient />
    </LocaleProvider>
  );
}
