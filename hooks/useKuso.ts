import { useState } from "react";
import type { ParsedAnime } from "@/lib/parseKusonime";
import { useLocale } from "@/lib/i18n/LocaleContext";

export function useKuso() {
  const { locale, t } = useLocale();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<ParsedAnime | null>(null);

  const parseUrl = async (url: string) => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const res = await fetch(
        `/api/parse?url=${encodeURIComponent(url)}&lang=${locale}`
      );
      const json = await res.json();

      if (!res.ok) throw new Error(json.error ?? t.errors.fetchFailed);
      setData(json.data);
    } catch (err: any) {
      setError(err.message || t.errors.network);
    } finally {
      setLoading(false);
    }
  };

  return { parseUrl, loading, error, data, setData };
}
