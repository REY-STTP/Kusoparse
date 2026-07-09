"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AlertOctagon } from "lucide-react";
import UrlForm from "@/components/UrlForm";
import AnimeCard from "@/components/AnimeCard";
import { useKuso } from "@/hooks/useKuso";

const TITLE = "PASTE. PARSE. DOWNLOAD.";

export default function Home() {
  const { parseUrl, loading, error, data } = useKuso();

  const containerVars = {
    hidden: {},
    show: { transition: { staggerChildren: 0.04 } },
  };

  const letterVars = {
    hidden: { opacity: 0, y: 20, rotate: -4 },
    show: { opacity: 1, y: 0, rotate: 0 },
  };

  return (
    <main className="min-h-screen flex flex-col pt-14 pb-8 px-5 relative z-10">
      <div className="flex-1 w-full max-w-2xl mx-auto">
        <header className="text-center mb-10">
          <div className="mono-label hard-border inline-block bg-kuso-mustard px-4 py-1 mb-5 shadow-hard-sm -rotate-2 font-mono text-xs font-bold uppercase">
            ● KUSOPARSE — KUSONIME PARSER
          </div>

          <motion.h1
            variants={containerVars}
            initial="hidden"
            animate="show"
            className="font-display font-bold text-4xl sm:text-5xl md:text-6xl leading-[1.05] flex flex-wrap justify-center gap-x-3"
          >
            {TITLE.split(" ").map((word, wi) => (
              <span key={wi} className="inline-flex">
                {word.split("").map((ch, ci) => (
                  <motion.span key={ci} variants={letterVars}>
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
            className="max-w-md mx-auto mt-5 text-sm sm:text-base leading-relaxed"
          >
            Tempel URL Kusonime untuk mengambil metadata anime, informasi episode, dan seluruh link download tanpa popup iklan.
          </motion.p>
        </header>

        <UrlForm onSubmit={parseUrl} loading={loading} />

        <div className="mt-10 min-h-[300px]">
          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                key="error"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="hard-border shadow-hard bg-kuso-pink text-kuso-paper p-4 font-mono text-sm flex items-start gap-3"
              >
                <AlertOctagon className="w-6 h-6 shrink-0" />
                <div>
                  <strong className="block mb-1 text-base">⚠ PARSE GAGAL</strong>
                  {error}
                </div>
              </motion.div>
            )}

            {data && !error && (
              <AnimeCard key="anime-card" data={data} />
            )}

            {!data && !error && !loading && (
              <motion.div
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="font-mono text-center opacity-40 text-xs tracking-widest uppercase max-w-sm mx-auto mt-20"
              >
                SIAP UNTUK PARSE — TEMPEL URL KUSONIME DI ATAS
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <footer className="mt-auto pt-8 text-center font-mono text-xs opacity-40">
        KUSOPARSE © {new Date().getFullYear()} — Dibuat untuk para pemalas.
      </footer>
    </main>
  );
}