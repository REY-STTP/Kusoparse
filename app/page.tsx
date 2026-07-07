// ./app/page.tsx

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import UrlForm from "@/components/UrlForm";
import AnimeCard from "@/components/AnimeCard";
import type { ParsedAnime } from "@/lib/parseKusonime";

const TITLE = "PASTE. PARSE. DOWNLOAD.";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.035,
    },
  },
};

const letter = {
  hidden: {
    opacity: 0,
    y: 24,
    rotate: -6,
  },
  show: {
    opacity: 1,
    y: 0,
    rotate: 0,
  },
};

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<ParsedAnime | null>(null);

  async function handleSubmit(url: string) {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const res = await fetch(`/api/parse?url=${encodeURIComponent(url)}`);
      const json = await res.json();

      if (!res.ok) {
        setError(json.error ?? "Terjadi kesalahan.");
        return;
      }

      setData(json.data);
    } catch {
      setError("Gagal menghubungi server. Coba lagi.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        padding: "3.5rem 1.25rem 2rem",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div
        style={{
          flex: 1,
          width: "100%",
          maxWidth: "640px",
          margin: "0 auto",
        }}
      >
        <header
          style={{
            textAlign: "center",
            marginBottom: "2.5rem",
          }}
        >
          <div
            className="mono-label hard-border"
            style={{
              display: "inline-block",
              background: "var(--color-mustard)",
              padding: "0.3rem 0.9rem",
              marginBottom: "1.25rem",
              boxShadow: "3px 3px 0 0 var(--color-ink)",
              transform: "rotate(-2deg)",
            }}
          >
            ● KUSOPARSE — KUSONIME PARSER
          </div>

          <motion.h1
            variants={container}
            initial="hidden"
            animate="show"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(2.1rem, 7vw, 4rem)",
              lineHeight: 1.05,
              margin: 0,
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "0 0.6rem",
            }}
          >
            {TITLE.split(" ").map((word, wi) => (
              <span key={wi} style={{ display: "inline-flex" }}>
                {word.split("").map((ch, ci) => (
                  <motion.span key={ci} variants={letter}>
                    {ch}
                  </motion.span>
                ))}
              </span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.75 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            style={{
              maxWidth: "480px",
              margin: "1.25rem auto 0",
              fontSize: "1rem",
              lineHeight: 1.55,
            }}
          >
            Tempel URL Kusonime untuk mengambil metadata anime,
            informasi episode, dan seluruh link download dalam satu
            halaman.
          </motion.p>
        </header>

        <UrlForm
          onSubmit={handleSubmit}
          loading={loading}
        />

        <div
          style={{
            marginTop: "2.5rem",
          }}
        >
          {error && (
            <motion.div
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              className="hard-border"
              style={{
                background: "var(--color-pink)",
                color: "var(--color-paper)",
                padding: "1rem 1.25rem",
                fontFamily: "var(--font-mono)",
                fontSize: "0.88rem",
                boxShadow: "5px 5px 0 0 var(--color-ink)",
              }}
            >
              <strong
                style={{
                  display: "block",
                  marginBottom: "0.2rem",
                }}
              >
                ⚠ PARSE GAGAL
              </strong>

              {error}
            </motion.div>
          )}

          {data && <AnimeCard data={data} />}

          {!data && !error && !loading && (
            <div
              className="mono-label"
              style={{
                textAlign: "center",
                opacity: 0.4,
                maxWidth: "420px",
                margin: "0 auto",
              }}
            >
              SIAP UNTUK PARSE — TEMPEL URL KUSONIME DI ATAS
            </div>
          )}
        </div>
      </div>

      <footer
        className="mono-label"
        style={{
          marginTop: "auto",
          paddingTop: "2rem",
          textAlign: "center",
          opacity: 0.4,
        }}
      >
        KUSOPARSE © {new Date().getFullYear()} — dibuat untuk para pemalas
      </footer>
    </main>
  );
}