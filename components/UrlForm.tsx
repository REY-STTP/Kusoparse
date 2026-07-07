// ./components/UrlForm.tsx

"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface UrlFormProps {
  onSubmit: (url: string) => void;
  loading: boolean;
}

export default function UrlForm({ onSubmit, loading }: UrlFormProps) {
  const [value, setValue] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!value.trim() || loading) return;
    onSubmit(value.trim());
  }

  return (
    <form onSubmit={handleSubmit} style={{ width: "100%" }}>
      <div
        style={{
          display: "flex",
          gap: "0.75rem",
          flexWrap: "wrap",
        }}
      >
        <div
          className="hard-border"
          style={{
            flex: "1 1 320px",
            background: "var(--color-paper)",
            display: "flex",
            alignItems: "center",
            padding: "0 1rem",
            position: "relative",
          }}
        >
          <span
            className="mono-label"
            style={{
              color: "var(--color-ink)",
              opacity: 0.45,
              marginRight: "0.6rem",
              userSelect: "none",
            }}
          >
            URL//
          </span>
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="https://kusonime.com/judul-anime/"
            disabled={loading}
            style={{
              flex: 1,
              border: "none",
              outline: "none",
              background: "transparent",
              padding: "1rem 0",
              fontFamily: "var(--font-mono)",
              fontSize: "0.95rem",
              color: "var(--color-ink)",
            }}
          />
        </div>

        <motion.button
          type="submit"
          disabled={loading}
          whileHover={loading ? {} : { y: -2 }}
          className="hard-border hard-shadow press"
          style={{
            background: loading ? "var(--color-mustard)" : "var(--color-lime)",
            padding: "0 1.75rem",
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "1.05rem",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            minWidth: "140px",
            justifyContent: "center",
            opacity: loading ? 0.85 : 1,
          }}
        >
          {loading ? (
            <>
              <ParseSpinner /> PARSING
            </>
          ) : (
            <>SEARCH ▶</>
          )}
        </motion.button>
      </div>
    </form>
  );
}

function ParseSpinner() {
  return (
    <motion.span
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 0.9, ease: "linear" }}
      style={{
        display: "inline-block",
        width: "0.9rem",
        height: "0.9rem",
        borderRadius: "50%",
        border: "3px solid var(--color-ink)",
        borderTopColor: "transparent",
      }}
    />
  );
}
