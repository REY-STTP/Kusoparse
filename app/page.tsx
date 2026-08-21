"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AlertOctagon } from "lucide-react";
import UrlForm from "@/components/UrlForm";
import AnimeCard from "@/components/AnimeCard";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import { useKuso } from "@/hooks/useKuso";
import { useLocale } from "@/lib/i18n/LocaleContext";

const LEAD_WORDS = ["PASTE.", "PARSE."];
const MARK_WORD = "DOWNLOAD.";

function ParseSkeleton() {
  const { t } = useLocale();

  return (
    <div
      className="hard-border shadow-hard bg-kuso-paper w-full max-w-2xl mx-auto p-5 sm:p-7 animate-pulse"
      role="status"
      aria-label={t.skeleton.aria}
    >
      <div className="hard-border bg-kuso-tape h-44 sm:h-56 mb-6" />
      <div className="bg-kuso-tape h-7 w-3/4 mb-2" />
      <div className="bg-kuso-tape h-7 w-2/5 mb-6" />
      <div className="hard-border bg-kuso-paper p-4 mb-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i}>
            <div className="bg-kuso-tape h-3 w-1/2 mb-2" />
            <div className="bg-kuso-tape h-4 w-4/5" />
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        <div className="hard-border bg-kuso-tape h-10 w-24" />
        <div className="hard-border bg-kuso-tape h-10 w-28" />
        <div className="hard-border bg-kuso-tape h-10 w-20" />
      </div>
    </div>
  );
}

function IdleState() {
  const { t } = useLocale();

  return (
    <motion.div
      key="idle"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="hard-border shadow-hard-sm bg-kuso-paper max-w-xl mx-auto p-6 rotate-[0.4deg]"
    >
      <div className="font-mono text-xs font-bold uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
        <span className="w-2 h-2 bg-kuso-accent" aria-hidden />
        {t.idle.title}
      </div>
      <ol className="space-y-3">
        {t.idle.steps.map((step, i) => (
          <li key={i} className="flex gap-3 font-mono text-sm leading-relaxed">
            <span className="font-bold text-kuso-accent tabular-nums shrink-0">
              0{i + 1}
            </span>
            <span className="opacity-80">{step}</span>
          </li>
        ))}
      </ol>
    </motion.div>
  );
}

export default function Home() {
  const { parseUrl, loading, error, data } = useKuso();
  const { t } = useLocale();

  const containerVars = {
    hidden: {},
    show: { transition: { staggerChildren: 0.04 } },
  };

  const letterVars = {
    hidden: { opacity: 0, y: 24, rotate: -4 },
    show: { opacity: 1, y: 0, rotate: 0 },
  };

  return (
    <main
      id="content"
      className="min-h-dvh flex flex-col relative z-10 overflow-x-clip"
    >
      <div
        aria-hidden="true"
        className="bg-kuso-ink text-kuso-paper border-b-[3px] border-kuso-ink overflow-hidden py-2 select-none"
      >
        <div className="flex w-max whitespace-nowrap animate-marquee font-mono text-[11px] font-bold tracking-[0.2em] uppercase">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex items-center">
              {t.ticker.map((item, i) => (
                <span key={i} className="flex items-center">
                  <span className="px-5">{item}</span>
                  <span className="text-kuso-accent">//</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute -bottom-6 right-0 -z-10 hidden lg:block"
      >
        <span className="text-outline font-display font-black text-[10rem] leading-none tracking-[-0.05em]">
          KUSO
        </span>
      </div>

      <div className="flex-1 w-full max-w-2xl mx-auto px-5 pt-6 sm:pt-8 pb-8">
        <div className="flex justify-end mb-8">
          <LocaleSwitcher />
        </div>

        <header className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="hard-border inline-block bg-kuso-ink text-kuso-paper px-4 py-1.5 mb-6 shadow-hard-sm -rotate-2 font-mono text-[11px] sm:text-xs font-bold uppercase tracking-[0.15em]"
          >
            <span className="text-kuso-accent mr-2">●</span>
            KUSOPARSE — {t.header.badge}
          </motion.div>

          <motion.h1
            variants={containerVars}
            initial="hidden"
            animate="show"
            className="font-display font-black text-[13vw] sm:text-6xl md:text-7xl leading-[0.95] tracking-[-0.03em] flex flex-wrap items-center gap-x-4 gap-y-2"
          >
            {LEAD_WORDS.map((word, wi) => (
              <span key={wi} className="inline-flex">
                {word.split("").map((ch, ci) => (
                  <motion.span
                    key={ci}
                    variants={letterVars}
                    className="inline-block"
                  >
                    {ch}
                  </motion.span>
                ))}
              </span>
            ))}
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.55, duration: 0.35, ease: "circOut" }}
              className="origin-left inline-block bg-kuso-accent text-kuso-paper px-3 -rotate-1 shadow-hard-sm"
            >
              {MARK_WORD}
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 0.75, y: 0 }}
            transition={{ delay: 0.7, duration: 0.4 }}
            className="max-w-md mt-6 text-sm sm:text-base leading-relaxed text-pretty"
          >
            {t.header.subtitle}
          </motion.p>
        </header>

        <UrlForm onSubmit={parseUrl} loading={loading} />

        <section className="mt-12 min-h-[300px]">
          <AnimatePresence mode="wait">
            {loading && (
              <motion.div
                key="skeleton"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <ParseSkeleton />
              </motion.div>
            )}

            {error && !loading && (
              <motion.div
                key="error"
                role="alert"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="hard-border shadow-hard bg-kuso-accent text-kuso-paper p-4 font-mono text-sm flex items-start gap-3 max-w-2xl mx-auto"
              >
                <AlertOctagon className="w-6 h-6 shrink-0" />
                <div>
                  <strong className="block mb-1 text-base font-bold uppercase tracking-wide">
                    {t.errors.title}
                  </strong>
                  {error}
                </div>
              </motion.div>
            )}

            {data && !error && !loading && (
              <AnimeCard key="anime-card" data={data} />
            )}

            {!data && !error && !loading && <IdleState />}
          </AnimatePresence>
        </section>
      </div>

      <footer className="px-5 pb-8 pt-6 text-center font-mono text-[11px] leading-relaxed opacity-60">
        <p>
          KUSOPARSE © {new Date().getFullYear()} — {t.footer.line1}
        </p>
        <p className="mt-1">{t.footer.line2}</p>
      </footer>
    </main>
  );
}
