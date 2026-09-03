import { ImageResponse } from "next/og";
import type { Locale } from "@/lib/i18n/dictionaries";

export const SOCIAL_IMAGE_SIZE = { width: 1200, height: 630 } as const;

type SocialCopy = {
  eyebrow: string;
  leadPrefix: string;
  leadAccent: string;
  leadSuffix: string;
  description: string;
  footer: string;
};

const COPY: Record<Locale, SocialCopy> = {
  id: {
    eyebrow: "KUSOPARSE // KUSONIME PARSER",
    leadPrefix: "TEMPEL.",
    leadAccent: "PARSE.",
    leadSuffix: "UNDUH.",
    description: "Metadata anime, sinopsis, episode, dan link dalam satu tampilan.",
    footer: "KUSOPARSE.WEB.ID",
  },
  en: {
    eyebrow: "KUSOPARSE // KUSONIME PARSER",
    leadPrefix: "PASTE.",
    leadAccent: "PARSE.",
    leadSuffix: "DOWNLOAD.",
    description: "Anime metadata, synopsis, episodes, and links in one view.",
    footer: "KUSOPARSE.WEB.ID",
  },
  ja: {
    eyebrow: "KUSOPARSE // KUSONIME 解析",
    leadPrefix: "貼る。",
    leadAccent: "解析。",
    leadSuffix: "取得。",
    description: "アニメ情報、あらすじ、エピソード、リンクを一つの画面に整理。",
    footer: "KUSOPARSE.WEB.ID",
  },
};

export function createSocialImage(locale: Locale, dark = false) {
  const copy = COPY[locale];
  const isJa = locale === "ja";

  // Brand tokens — mirror tailwind.config.ts kuso-* palette
  const background = dark ? "#171410" : "#f2ecdc";
  const ink = dark ? "#fcfaf2" : "#171410";
  const paper = dark ? "#1f1b16" : "#fcfaf2";
  const accent = "#d63f1e";
  const muted = dark ? "rgba(252,250,242,0.5)" : "rgba(23,20,16,0.5)";

  // Conservative sizing that fits 1200×630 with breathing room.
  const leadSize = isJa ? 76 : 88;
  const markSize = isJa ? 60 : 72;

  // Satori-friendly: avoid position:absolute, mixBlendMode, WebkitTextStroke.
  // Render hard-shadow by stacking two boxes with offset.
  // Render watermark as plain text in the background layer of the flex tree.

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background,
        color: ink,
        fontFamily: "Arial",
        overflow: "hidden",
      }}
    >
      {/* Top marquee-style bar */}
      <div
        style={{
          display: "flex",
          width: "100%",
          height: 60,
          background: ink,
          color: paper,
          padding: "0 64px",
          fontSize: 18,
          fontWeight: 700,
          letterSpacing: 4,
          textTransform: "uppercase",
          fontFamily: "Courier New",
          alignItems: "center",
          justifyContent: "space-between",
          flexShrink: 0,
        }}
      >
        <span style={{ display: "flex" }}>{copy.eyebrow}</span>
        <span
          style={{
            display: "flex",
            background: accent,
            color: paper,
            padding: "6px 12px",
            fontSize: 16,
          }}
        >
          v1.0
        </span>
      </div>

      {/* Main content + watermark in flex column.
          Watermark sits as a non-positioned block in the document flow. */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flex: 1,
          width: "100%",
          position: "relative",
        }}
      >
        {/* Left content column */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            flex: 1,
            padding: "48px 64px",
          }}
        >
          {/* Lead block */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div
              style={{
                display: "flex",
                fontSize: leadSize,
                fontWeight: 900,
                letterSpacing: -2,
                lineHeight: 1,
                textTransform: isJa ? "none" : "uppercase",
              }}
            >
              {copy.leadPrefix}
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 24,
              }}
            >
              {/* Accent block — hard-shadow simulated by two stacked boxes */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    background: accent,
                    color: paper,
                    padding: "10px 28px",
                    fontSize: markSize,
                    fontWeight: 900,
                    letterSpacing: -2,
                    lineHeight: 1,
                    textTransform: isJa ? "none" : "uppercase",
                    border: `4px solid ${ink}`,
                  }}
                >
                  {copy.leadAccent}
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  fontSize: leadSize,
                  fontWeight: 900,
                  letterSpacing: -2,
                  lineHeight: 1,
                  textTransform: isJa ? "none" : "uppercase",
                }}
              >
                {copy.leadSuffix}
              </div>
            </div>
          </div>

          {/* Description card — hard-bordered */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              marginTop: 32,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                background: paper,
                border: `4px solid ${ink}`,
                padding: "16px 24px",
                maxWidth: 780,
              }}
            >
              <span
                style={{
                  display: "flex",
                  width: 16,
                  height: 16,
                  background: accent,
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  display: "flex",
                  fontSize: 24,
                  fontWeight: 500,
                  color: ink,
                  lineHeight: 1.35,
                }}
              >
                {copy.description}
              </span>
            </div>
          </div>
        </div>

        {/* Right column — watermark + footer row stacked vertically */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            justifyContent: "space-between",
            padding: "48px 64px 32px 0",
            width: 360,
            flexShrink: 0,
          }}
        >
          {/* Watermark "KUSO" — plain text, no outline stroke.
              Renders as solid muted color so satori can paint it. */}
          <div
            style={{
              display: "flex",
              fontSize: 180,
              fontWeight: 900,
              letterSpacing: -4,
              lineHeight: 1,
              color: muted,
              textTransform: "uppercase",
              marginTop: 40,
            }}
          >
            KUSO
          </div>

          {/* OPEN SOURCE badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontSize: 18,
              fontWeight: 700,
              letterSpacing: 4,
              textTransform: "uppercase",
              fontFamily: "Courier New",
              color: muted,
            }}
          >
            <span
              style={{
                display: "flex",
                width: 14,
                height: 14,
                background: accent,
              }}
            />
            <span style={{ display: "flex" }}>OPEN SOURCE</span>
          </div>
        </div>
      </div>

      {/* Footer row — spans full width at bottom */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px 64px 24px 64px",
          fontSize: 18,
          fontWeight: 700,
          letterSpacing: 4,
          textTransform: "uppercase",
          fontFamily: "Courier New",
          color: muted,
          flexShrink: 0,
        }}
      >
        <span style={{ display: "flex" }}>{copy.footer}</span>
      </div>
    </div>,
    SOCIAL_IMAGE_SIZE,
  );
}