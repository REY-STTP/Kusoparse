"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, ExternalLink, Loader2 } from "lucide-react";
import type { ParsedAnime } from "@/lib/parseKusonime";

const STATUS_STAMP: Record<string, { label: string; color: string }> = {
  ongoing: { label: "ONGOING", color: "bg-kuso-pink" },
  completed: { label: "TAMAT", color: "bg-kuso-blue text-white" },
  finished: { label: "TAMAT", color: "bg-kuso-blue text-white" },
};

function getStamp(info: Record<string, string>) {
  const status = (info["Status"] ?? "").toLowerCase();
  for (const key of Object.keys(STATUS_STAMP)) {
    if (status.includes(key)) return STATUS_STAMP[key];
  }
  return { label: status ? status.toUpperCase() : "ARSIP", color: "bg-kuso-mustard" };
}

const INFO_ORDER = [
  "Japanese", "Genre", "Seasons", "Type", "Status", "Total Episode", "Score", "Duration", "Released on"
];

export default function AnimeCard({ data }: { data: ParsedAnime }) {
  const stamp = getStamp(data.info);
  const [showFullSynopsis, setShowFullSynopsis] = useState(false);
  
  const resolutions = Object.keys(data.downloads);
  const [openRes, setOpenRes] = useState<string | null>(resolutions[0] ?? null);
  
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
      const finalUrl = typeof json.url === "string" ? json.url : url;
      window.open(finalUrl, "_blank", "noopener,noreferrer");
    } catch {
      window.open(url, "_blank", "noopener,noreferrer");
    } finally {
      setIsResolving(false);
      setActiveHost(null);
    }
  }

  const orderedInfo = INFO_ORDER.filter((k) => data.info[k]).map((k) => [k, data.info[k]]) as [string, string][];

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

      <div className="font-mono text-xs opacity-50 mb-2 uppercase tracking-wider">
        ANIME DITEMUKAN //
      </div>

      {data.thumbnail && (
        <div className="mb-6 w-full relative">
          <img 
            src={data.thumbnail} 
            alt={data.title || "Thumbnail"} 
            className="w-full h-auto object-cover hard-border shadow-hard max-h-[350px] bg-kuso-tape"
            loading="lazy"
          />
        </div>
      )}

      <h2 className="font-display font-bold text-2xl sm:text-3xl leading-tight mb-4">
        {data.title}
      </h2>

      {orderedInfo.length > 0 && (
        <div className="hard-border bg-kuso-tape p-4 mb-6 grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono text-xs sm:text-sm">
          {orderedInfo.map(([key, value]) => (
            <div key={key}>
              <div className="opacity-60 text-[10px] sm:text-xs uppercase font-bold tracking-wider">{key}</div>
              <div className="font-semibold mt-0.5 line-clamp-2" title={value}>{value}</div>
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
              <p key={index} className="text-sm sm:text-base leading-relaxed opacity-90 text-justify mb-2">
                {paragraph}
              </p>
            ))}

          {data.synopsis.length > 320 && (
            <button
              onClick={() => setShowFullSynopsis((v) => !v)}
              className="hard-border press-effect bg-kuso-paper px-3 py-1.5 font-mono text-xs font-bold shadow-hard-sm mt-2 flex items-center gap-1"
            >
              {showFullSynopsis ? <><ChevronUp className="w-4 h-4"/> TUTUP</> : <><ChevronDown className="w-4 h-4"/> BACA SELENGKAPNYA</>}
            </button>
          )}
        </div>
      )}

      <div className="font-mono text-xs opacity-50 mb-3 uppercase tracking-wider">
        PILIH KUALITAS //
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {resolutions.map((res) => {
          const active = openRes === res;
          return (
            <button
              key={res}
              onClick={() => setOpenRes(active ? null : res)}
              className={`hard-border press-effect px-4 py-2 font-mono font-bold text-sm
                ${active ? "bg-kuso-lime translate-x-1 translate-y-1 shadow-none" : "bg-kuso-paper shadow-hard-sm"}
              `}
            >
              {res}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {openRes && data.downloads[openRes] && (
          <motion.div
            key={openRes}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pt-2 flex flex-wrap gap-2">
              {data.downloads[openRes].map((link, i) => {
                const isActiveResolving = activeHost === link.host && isResolving;
                return (
                  <button
                    key={`${link.host}-${i}`}
                    onClick={() => handleDownloadClick(openRes!, link.host, link.url)}
                    disabled={isResolving}
                    className={`hard-border press-effect flex items-center gap-2 px-3 py-2 font-mono text-xs font-bold shadow-hard-sm
                      ${isActiveResolving ? "bg-kuso-mustard text-kuso-ink cursor-wait" : "bg-kuso-blue text-kuso-paper hover:bg-kuso-blue/90"}
                      ${isResolving && !isActiveResolving ? "opacity-50 cursor-not-allowed" : ""}
                    `}
                  >
                    {isActiveResolving ? (
                      <><Loader2 className="w-4 h-4 animate-spin"/> MEMBUKA…</>
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