// ./components/AnimeCard.tsx

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ParsedAnime } from "@/lib/parseKusonime";

const STATUS_STAMP: Record<string, { label: string; color: string }> = {
  ongoing: { label: "ONGOING", color: "var(--color-pink)" },
  completed: { label: "TAMAT", color: "var(--color-blue)" },
  finished: { label: "TAMAT", color: "var(--color-blue)" },
};

function getStamp(info: Record<string, string>) {
  const status = (info["Status"] ?? "").toLowerCase();
  for (const key of Object.keys(STATUS_STAMP)) {
    if (status.includes(key)) return STATUS_STAMP[key];
  }
  return { label: status ? status.toUpperCase() : "ARSIP", color: "var(--color-mustard)" };
}

const INFO_ORDER = [
  "Japanese",
  "Genre",
  "Seasons",
  "Type",
  "Status",
  "Total Episode",
  "Score",
  "Duration",
  "Released on",
];

export default function AnimeCard({ data }: { data: ParsedAnime }) {
  const stamp = getStamp(data.info);
  const [showFullSynopsis, setShowFullSynopsis] = useState(false);
  const resolutions = Object.keys(data.downloads);
  const [openRes, setOpenRes] = useState<string | null>(
    resolutions[0] ?? null
  );
  const [resolvingKey, setResolvingKey] = useState<string | null>(null);

  async function handleDownloadClick(
    resolution: string,
    host: string,
    url: string
  ) {
    const key = `${resolution}-${host}`;
    setResolvingKey(key);
    try {
      const params = new URLSearchParams({ url, resolution, host });
      const res = await fetch(`/api/resolve?${params.toString()}`);
      const json = await res.json();
      const finalUrl = typeof json.url === "string" ? json.url : url;
      window.open(finalUrl, "_blank", "noopener,noreferrer");
    } catch {
      window.open(url, "_blank", "noopener,noreferrer");
    } finally {
      setResolvingKey(null);
    }
  }

  const orderedInfo = INFO_ORDER.filter((k) => data.info[k]).map((k) => [
    k,
    data.info[k],
  ]) as [string, string][];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotate: -1.5 }}
      animate={{ opacity: 1, y: 0, rotate: -0.6 }}
      transition={{ type: "spring", stiffness: 220, damping: 20 }}
      className="hard-border hard-shadow"
      style={{
        background: "var(--color-paper)",
        position: "relative",
        maxWidth: "640px",
        width: "100%",
        margin: "0 auto",
        padding: "1.75rem",
        overflow: "visible",
      }}
    >
      {/* perforation strip */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          left: "-3px",
          right: "-3px",
          height: 0,
          borderTop: `${3}px dashed rgba(20,18,31,0.35)`,
          transform: "translateY(1.1rem)",
        }}
      />

      {/* stamp */}
      <div
        style={{
          position: "absolute",
          top: "-14px",
          right: "18px",
          transform: "rotate(6deg)",
          background: stamp.color,
          border: "var(--border-w) solid var(--color-ink)",
          padding: "0.35rem 0.8rem",
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: "0.85rem",
          boxShadow: "3px 3px 0 0 var(--color-ink)",
        }}
      >
        {stamp.label}
      </div>

      <div
        className="mono-label"
        style={{ opacity: 0.5, marginBottom: "0.4rem" }}
      >
        KASET DITEMUKAN //
      </div>

      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: "clamp(1.3rem, 2.6vw, 1.9rem)",
          lineHeight: 1.15,
          margin: "0 0 1rem 0",
        }}
      >
        {data.title}
      </h2>

      {orderedInfo.length > 0 && (
        <div
          className="hard-border"
          style={{
            background: "var(--color-bg-tape)",
            padding: "0.9rem 1rem",
            marginBottom: "1.25rem",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
            gap: "0.5rem 1rem",
            fontFamily: "var(--font-mono)",
            fontSize: "0.8rem",
          }}
        >
          {orderedInfo.map(([key, value]) => (
            <div key={key}>
              <div style={{ opacity: 0.55, fontSize: "0.68rem" }}>
                {key.toUpperCase()}
              </div>
              <div style={{ fontWeight: 600 }}>{value}</div>
            </div>
          ))}
        </div>
      )}
      
      {data.synopsis && (
  <div
    style={{
      marginBottom: "1.5rem",
    }}
  >
    {(showFullSynopsis || data.synopsis.length <= 320
      ? data.synopsis
      : data.synopsis.slice(0, 320).trim() + "…")
      .split(/\n+/)
      .filter((paragraph) => paragraph.trim() !== "")
      .map((paragraph, index) => (
        <p
          key={index}
          style={{
            fontSize: "0.92rem",
            lineHeight: 1.5,
            opacity: 0.9,
            textAlign: "justify",
            textIndent: index === 0 ? "2em" : 0,
            overflowWrap: "break-word",
            margin: 0,
            marginBottom: index === 0 ? "0.5rem" : "0.5rem",
          }}
        >
          {paragraph}
        </p>
      ))}

    {data.synopsis.length > 320 && (
      <button
        onClick={() => setShowFullSynopsis((v) => !v)}
        className="hard-border press-sm"
        style={{
          background: "var(--color-paper)",
          padding: "0.45rem 0.9rem",
          fontFamily: "var(--font-mono)",
          fontSize: "0.75rem",
          fontWeight: 700,
          boxShadow: "3px 3px 0 0 var(--color-ink)",
          marginTop: "0.25rem",
        }}
      >
        {showFullSynopsis
          ? "▲ TUTUP"
          : "▼ BACA SELENGKAPNYA"}
      </button>
    )}
  </div>
)}

      <div
        className="mono-label"
        style={{ opacity: 0.5, marginBottom: "0.6rem" }}
      >
        PILIH KUALITAS //
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
        {resolutions.map((res) => {
          const active = openRes === res;
          return (
            <button
              key={res}
              onClick={() => setOpenRes(active ? null : res)}
              className="hard-border press-sm"
              style={{
                background: active ? "var(--color-lime)" : "var(--color-paper)",
                padding: "0.5rem 1rem",
                fontFamily: "var(--font-mono)",
                fontWeight: 600,
                fontSize: "0.85rem",
                boxShadow: active
                  ? "0 0 0 0 var(--color-ink)"
                  : "3px 3px 0 0 var(--color-ink)",
                transform: active ? "translate(3px, 3px)" : "none",
              }}
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
            style={{ overflow: "hidden" }}
          >
            <div
              style={{
                marginTop: "1rem",
                display: "flex",
                flexWrap: "wrap",
                gap: "0.5rem",
              }}
            >
              {data.downloads[openRes].map((link, i) => {
                const key = `${openRes}-${link.host}`;
                const isResolving = resolvingKey === key;
                return (
                  <button
                    key={`${link.host}-${i}`}
                    onClick={() =>
                      handleDownloadClick(openRes, link.host, link.url)
                    }
                    disabled={isResolving}
                    className="hard-border press-sm"
                    style={{
                      background: "var(--color-blue)",
                      color: "var(--color-paper)",
                      padding: "0.5rem 0.9rem",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.78rem",
                      fontWeight: 600,
                      border: "var(--border-w) solid var(--color-ink)",
                      boxShadow: "3px 3px 0 0 var(--color-ink)",
                      opacity: isResolving ? 0.7 : 1,
                      cursor: isResolving ? "wait" : "pointer",
                    }}
                  >
                    {isResolving ? "MEMBUKA…" : `${link.host} ↗`}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}