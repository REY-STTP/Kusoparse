import { useState } from "react";
import type { ParsedAnime } from "@/lib/parseKusonime";

export function useKuso() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<ParsedAnime | null>(null);

  const parseUrl = async (url: string) => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const res = await fetch(`/api/parse?url=${encodeURIComponent(url)}`);
      const json = await res.json();

      if (!res.ok) throw new Error(json.error ?? "Terjadi kesalahan pada server.");
      setData(json.data);
    } catch (err: any) {
      setError(err.message || "Gagal menghubungi server. Coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return { parseUrl, loading, error, data, setData };
}