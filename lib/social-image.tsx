import { ImageResponse } from "next/og";
import type { Locale } from "@/lib/i18n/dictionaries";

export const SOCIAL_IMAGE_SIZE = { width: 1200, height: 630 } as const;

type SocialCopy = {
  eyebrow: string;
  lead: string;
  mark: string;
  description: string;
};

const COPY: Record<Locale, SocialCopy> = {
  id: {
    eyebrow: "KUSOPARSE // KUSONIME PARSER",
    lead: "TEMPEL. PARSE.",
    mark: "UNDUH.",
    description: "Metadata anime, sinopsis, episode, dan link dalam satu tampilan.",
  },
  en: {
    eyebrow: "KUSOPARSE // KUSONIME PARSER",
    lead: "PASTE. PARSE.",
    mark: "DOWNLOAD.",
    description: "Anime metadata, synopsis, episodes, and links in one view.",
  },
  ja: {
    eyebrow: "KUSOPARSE // KUSONIME 解析",
    lead: "貼る。解析。",
    mark: "取得。",
    description: "アニメ情報、あらすじ、エピソード、リンクを一つの画面に整理。",
  },
};

export function createSocialImage(locale: Locale, dark = false) {
  const copy = COPY[locale];
  const background = dark ? "#171410" : "#f2ecdc";
  const foreground = dark ? "#fcfaf2" : "#171410";
  const leadSize = locale === "ja" ? 72 : 88;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: dark ? "center" : "space-between",
        ...(dark ? { gap: 24 } : {}),
        padding: "72px",
        background,
        color: foreground,
        fontFamily: "Arial",
      }}
    >
      <div style={{ display: "flex", fontSize: 28, fontWeight: 700 }}>
        {copy.eyebrow}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <div style={{ display: "flex", fontSize: leadSize, fontWeight: 900 }}>
          {copy.lead}
        </div>
        <div
          style={{
            display: "flex",
            width: 520,
            padding: "12px 20px",
            background: "#d63f1e",
            color: "#fcfaf2",
            fontSize: 58,
            fontWeight: 900,
          }}
        >
          {copy.mark}
        </div>
      </div>
      <div style={{ display: "flex", fontSize: 26 }}>
        {copy.description}
      </div>
    </div>,
    SOCIAL_IMAGE_SIZE,
  );
}
