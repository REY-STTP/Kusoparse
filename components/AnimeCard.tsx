"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, ExternalLink, Loader2 } from "lucide-react";
import type { ParsedAnime } from "@/lib/parseKusonime";
import { useLocale } from "@/lib/i18n/LocaleContext";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { normalizeHttpUrl } from "@/lib/urls";

function getStamp(info: Record<string, string>, t: Dictionary) {
  const status = (info["Status"] ?? "").toLowerCase();
  if (status.includes("ongoing")) {
    return { label: t.card.stampOngoing, color: "bg-kuso-accent text-kuso-paper" };
  }
  if (status.includes("completed") || status.includes("finished")) {
    return { label: t.card.stampCompleted, color: "bg-kuso-ink text-kuso-paper" };
  }
  return {
    label: status ? status.toUpperCase() : t.card.stampArchive,
    color: "bg-kuso-tape text-kuso-ink",
  };
}

const INFO_ORDER = [
  "Japanese", "Genre", "Seasons", "Type", "Status", "Total Episode", "Score", "Duration", "Released on"
];

export default function AnimeCard({ data }: { data: ParsedAnime }) {
  const { t } = useLocale();
  const stamp = getStamp(data.info, t);
  const [showFullSynopsis, setShowFullSynopsis] = useState(false);

  const [openGroup, setOpenGroup] = useState(0);

  const currentGroup = data.downloads[openGroup];
  const resolutions = currentGroup ? Object.keys(currentGroup.downloads) : [];

  const [openRes, setOpenRes] = useState<string | null>(
    resolutions[0] ?? null
  );

  const [isResolving, setIsResolving] = useState(false);
  const [activeHost, setActiveHost] = useState<string | null>(null);

  async function handleDownloadClick(resolution: string, host: string, url: string) {
    if (isResolving) return;
    setIsResolving(true);
    setActiveHost(host);
    try {
      const params = new URLSearchParams({ url, resolution, host });
      const res = await fetch(`/api/resolve?${params.toString()}`);
      const json = await res.json();
      const finalUrl = res.ok ? normalizeHttpUrl(json.url) : null;
      const fallbackUrl = normalizeHttpUrl(url);
      if (finalUrl || fallbackUrl) {
        window.open(finalUrl ?? fallbackUrl!, "_blank", "noopener,noreferrer");
      }
    } catch {
      const fallbackUrl = normalizeHttpUrl(url);
      if (fallbackUrl) {
        window.open(fallbackUrl, "_blank", "noopener,noreferrer");
      }
    } finally {
      setIsResolving(false);
      setActiveHost(null);
    }
  }

  const orderedInfo = INFO_ORDER.filter((k) => data.info[k]).map((k) => [k, data.info[k]]) as [string, string][];
  const sourceUrl = normalizeHttpUrl(data.sourceUrl);
  const thumbnailUrl = normalizeHttpUrl(data.thumbnail);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotate: -1.5 }}
      animate={{ opacity: 1, y: 0, rotate: -0.6 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
      transition={{ type: "spring", stiffness: 220, damping: 20 }}
      className="hard-border shadow-hard bg-kuso-paper relative w-full max-w-2xl mx-auto p-5 sm:p-7 z-10"
    >

      <div className="absolute top-0 -left-1 -right-1 h-0 border-t-[3px] border-dashed border-kuso-ink/35 translate-y-4" aria-hidden />

      <div className={`absolute -top-4 -right-2 sm:right-4 rotate-6 ${stamp.color} hard-border px-3 py-1 font-display font-bold text-sm shadow-hard-sm`}>
        {stamp.label}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-xs opacity-50 mb-2 lowercase italic tracking-wider">
        <span>{t.card.found}</span>
        {sourceUrl && (
          <a
            href={sourceUrl}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="not-italic underline underline-offset-2 hover:text-kuso-accent"
          >
            {t.seo.sourceLabel}
          </a>
        )}
      </div>

      {thumbnailUrl && (
        <div className="mb-6 w-full relative">
          {/* External artwork is intentionally loaded by the browser, not proxied through Next.js. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={thumbnailUrl}
            alt={data.title ? t.card.coverAlt(data.title) : t.card.coverAltFallback}
            className="w-full h-auto object-cover hard-border shadow-hard max-h-[350px] bg-kuso-tape"
            loading="lazy"
            decoding="async"
          />
        </div>
      )}

      <h2 className="font-display font-black text-2xl sm:text-3xl leading-tight text-balance mb-4">
        {data.title}
      </h2>

      {orderedInfo.length > 0 && (
        <div className="hard-border bg-kuso-tape p-4 mb-6 grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono text-xs sm:text-sm">
          {orderedInfo.map(([key, value]) => (
            <div key={key}>
              <div className="opacity-60 text-[10px] sm:text-xs uppercase font-bold tracking-wider">{key}</div>
              <div className="font-semibold mt-0.5 line-clamp-2 tabular-nums" title={value}>{value}</div>
            </div>
          ))}
        </div>
      )}

      {data.synopsis && (
        <div className="mb-7">
          {(showFullSynopsis || data.synopsis.length <= 320
            ? data.synopsis
            : data.synopsis.slice(0, 320).trim() + "…")
            .split(/\n+/)
            .filter((p) => p.trim() !== "")
            .map((paragraph, index) => (
              <p key={index} className="text-sm sm:text-base leading-relaxed opacity-90 text-left text-pretty max-w-[65ch] mb-2">
                {paragraph}
              </p>
            ))}

          {data.synopsis.length > 320 && (
            <button
              onClick={() => setShowFullSynopsis((v) => !v)}
              className="hard-border press-effect lift-hover bg-kuso-paper px-3 py-1.5 font-mono text-xs font-bold shadow-hard-sm mt-2 inline-flex items-center gap-1.5 hover:bg-kuso-tape"
            >
              {showFullSynopsis ? <><ChevronUp className="w-4 h-4"/> {t.card.collapse}</> : <><ChevronDown className="w-4 h-4"/> {t.card.readMore}</>}
            </button>
          )}
        </div>
      )}

      {data.downloads.length > 1 && (
        <div className="mb-5">
          <div className="font-mono text-xs opacity-50 mb-2 lowercase italic tracking-wider">
            {t.card.pickPart}
          </div>

          <div className="flex flex-wrap gap-2">
            {data.downloads.map((group, index) => {
              const active = openGroup === index;

              return (
                <button
                  key={index}
                  onClick={() => {
                    setOpenGroup(index);

                    const firstRes = Object.keys(group.downloads)[0] ?? null;
                    setOpenRes(firstRes);
                  }}
                  className={`hard-border press-effect px-4 py-2 font-mono text-sm font-bold ${
                    active
                      ? "bg-kuso-ink text-kuso-paper"
                      : "bg-kuso-paper shadow-hard-sm hover:bg-kuso-tape"
                  }`}
                >
                  {group.title}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="font-mono text-xs opacity-50 mb-3 lowercase italic tracking-wider">
        {t.card.pickQuality}
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {resolutions.map((res) => {
          const active = openRes === res;
          return (
            <button
              key={res}
              onClick={() => setOpenRes(active ? null : res)}
              className={`hard-border press-effect px-4 py-2 font-mono font-bold text-sm
                ${active ? "bg-kuso-accent text-kuso-paper translate-x-1 translate-y-1 shadow-none" : "bg-kuso-paper shadow-hard-sm hover:bg-kuso-tape"}
              `}
            >
              {res}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {openRes && currentGroup?.downloads[openRes] && (
          <motion.div
            key={openRes}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pt-2 flex flex-wrap gap-2">
              {currentGroup.downloads[openRes].map((link, i) => {
                const isActiveResolving = activeHost === link.host && isResolving;
                return (
                  <button
                    key={`${link.host}-${i}`}
                    onClick={() => handleDownloadClick(openRes!, link.host, link.url)}
                    disabled={isResolving}
                    className={`hard-border press-effect flex items-center gap-2 px-3 py-2 font-mono text-xs font-bold shadow-hard-sm
                      ${isActiveResolving ? "bg-kuso-tape text-kuso-ink cursor-wait" : "bg-kuso-ink text-kuso-paper hover:bg-kuso-accent"}
                      ${isResolving && !isActiveResolving ? "opacity-50 cursor-not-allowed" : ""}
                    `}
                  >
                    {isActiveResolving ? (
                      <><Loader2 className="w-4 h-4 animate-spin"/> {t.card.opening}</>
                    ) : (
                      <>{link.host} <ExternalLink className="w-3 h-3" /></>
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
