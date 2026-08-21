// ./lib/i18n/dictionaries.ts

export const LOCALES = ["id", "en", "ja"] as const;
export type Locale = (typeof LOCALES)[number];

export const LOCALE_LABELS: Record<Locale, string> = {
  id: "ID",
  en: "EN",
  ja: "JP",
};

const id = {
  header: {
    badge: "Kusonime Parser",
    subtitle:
      "Tempel URL Kusonime untuk mengambil metadata anime, informasi episode, dan seluruh link download — tanpa popup iklan, tanpa shortlink.",
  },
  ticker: [
    "Parser Kusonime",
    "Tanpa popup",
    "Tanpa shortlink",
    "Link download langsung",
    "Gratis selamanya",
  ],
  form: {
    button: "PARSE",
    parsing: "PARSING",
    invalid: "Masukkan URL artikel Kusonime yang valid.",
    ariaLabel: "URL artikel Kusonime",
    placeholder: "https://kusonime.com/judul-anime/",
  },
  errors: {
    title: "Parse gagal",
    network: "Gagal menghubungi server. Coba lagi.",
    urlRequired: "URL wajib diisi.",
    urlInvalid: "URL tidak valid.",
    upstreamStatus: (status: number) =>
      `Situs tujuan membalas dengan status ${status}.`,
    unrecognized:
      "Halaman berhasil diambil, tetapi strukturnya tidak dikenali. KUSOPARSE hanya mendukung halaman Kusonime.",
    timeout: "Situs tujuan tidak merespons (timeout).",
    fetchFailed: "Gagal mengambil halaman. Coba lagi atau periksa URL-nya.",
  },
  idle: {
    title: "Cara pakai",
    steps: [
      "Buka artikel anime di kusonime.com, lalu salin URL-nya.",
      "Tempel URL di kolom atas dan tekan tombol PARSE.",
      "Pilih kualitas dan host — link terbuka di tab baru.",
    ],
  },
  card: {
    found: "// anime ditemukan",
    pickPart: "// pilih part",
    pickQuality: "// pilih kualitas",
    readMore: "Baca selengkapnya",
    collapse: "Tutup",
    opening: "MEMBUKA…",
    stampOngoing: "ONGOING",
    stampCompleted: "TAMAT",
    stampArchive: "ARSIP",
    coverAlt: (title: string) => `Cover ${title}`,
    coverAltFallback: "Cover anime",
  },
  footer: {
    line1: "Dibuat untuk para pemalas.",
    line2: "Bukan afiliasi resmi Kusonime. Semua konten milik pemilik aslinya.",
  },
  skeleton: {
    aria: "Sedang memuat hasil parse",
  },
  notFound: {
    label: "// Halaman tidak ditemukan",
    body: "Halaman yang kamu cari tidak ada. Kayak episode minggu depan — belum rilis.",
    back: "← Kembali ke beranda",
  },
  a11y: {
    skipLink: "Langsung ke konten",
    switcher: "Pilih bahasa",
  },
};

export type Dictionary = typeof id;

const en: Dictionary = {
  header: {
    badge: "Kusonime Parser",
    subtitle:
      "Paste a Kusonime URL to pull anime metadata, episode info, and every download link — no popups, no shortlinks.",
  },
  ticker: [
    "Kusonime Parser",
    "No popups",
    "No shortlinks",
    "Direct download links",
    "Free forever",
  ],
  form: {
    button: "PARSE",
    parsing: "PARSING",
    invalid: "Enter a valid Kusonime article URL.",
    ariaLabel: "Kusonime article URL",
    placeholder: "https://kusonime.com/anime-title/",
  },
  errors: {
    title: "Parse failed",
    network: "Couldn't reach the server. Try again.",
    urlRequired: "URL is required.",
    urlInvalid: "Invalid URL.",
    upstreamStatus: (status: number) =>
      `The target site responded with status ${status}.`,
    unrecognized:
      "The page loaded, but its structure wasn't recognized. KUSOPARSE only supports Kusonime pages.",
    timeout: "The target site didn't respond (timeout).",
    fetchFailed: "Failed to fetch the page. Try again or check the URL.",
  },
  idle: {
    title: "How to use",
    steps: [
      "Open an anime article on kusonime.com and copy its URL.",
      "Paste the URL into the field above and hit PARSE.",
      "Pick a quality and host — the link opens in a new tab.",
    ],
  },
  card: {
    found: "// anime found",
    pickPart: "// select part",
    pickQuality: "// select quality",
    readMore: "Read more",
    collapse: "Close",
    opening: "OPENING…",
    stampOngoing: "ONGOING",
    stampCompleted: "COMPLETE",
    stampArchive: "ARCHIVE",
    coverAlt: (title: string) => `Cover art for ${title}`,
    coverAltFallback: "Anime cover art",
  },
  footer: {
    line1: "Built for the lazy.",
    line2:
      "Not affiliated with Kusonime. All content belongs to its respective owners.",
  },
  skeleton: {
    aria: "Loading parse result",
  },
  notFound: {
    label: "// Page not found",
    body: "The page you're looking for doesn't exist. Like next week's episode — not out yet.",
    back: "← Back to home",
  },
  a11y: {
    skipLink: "Skip to content",
    switcher: "Select language",
  },
};

const ja: Dictionary = {
  header: {
    badge: "クソニメ解析ツール",
    subtitle:
      "KusonimeのURLを貼るだけで、アニメのメタデータ・エピソード情報・ダウンロードリンクを一括取得。ポップアップ広告なし、短縮リンクなし。",
  },
  ticker: [
    "クソニメ解析ツール",
    "ポップアップなし",
    "短縮リンクなし",
    "直接ダウンロード",
    "永久無料",
  ],
  form: {
    button: "解析",
    parsing: "解析中",
    invalid: "有効なKusonime記事のURLを入力してください。",
    ariaLabel: "Kusonime記事のURL",
    placeholder: "https://kusonime.com/anime-no-taitoru/",
  },
  errors: {
    title: "解析失敗",
    network: "サーバーに接続できませんでした。もう一度お試しください。",
    urlRequired: "URLは必須です。",
    urlInvalid: "URLが無効です。",
    upstreamStatus: (status: number) =>
      `リンク先のサイトがステータス ${status} を返しました。`,
    unrecognized:
      "ページは取得できましたが、構造を認識できませんでした。KUSOPARSEはKusonimeのページのみ対応しています。",
    timeout: "リンク先のサイトが応答しません（タイムアウト）。",
    fetchFailed: "ページの取得に失敗しました。もう一度試すか、URLを確認してください。",
  },
  idle: {
    title: "使い方",
    steps: [
      "kusonime.comでアニメの記事を開き、URLをコピーします。",
      "上の入力欄にURLを貼り、「解析」ボタンを押します。",
      "画質とホストを選択 — リンクは新しいタブで開きます。",
    ],
  },
  card: {
    found: "// アニメ発見",
    pickPart: "// パート選択",
    pickQuality: "// 画質選択",
    readMore: "続きを読む",
    collapse: "閉じる",
    opening: "起動中…",
    stampOngoing: "連載中",
    stampCompleted: "完結",
    stampArchive: "アーカイブ",
    coverAlt: (title: string) => `${title}のカバー画像`,
    coverAltFallback: "アニメのカバー画像",
  },
  footer: {
    line1: "怠け者のために作られました。",
    line2:
      "Kusonime公式とは提携していません。すべてのコンテンツは原著作者に帰属します。",
  },
  skeleton: {
    aria: "解析結果を読み込み中",
  },
  notFound: {
    label: "// ページが見つかりません",
    body: "お探しのページは存在しません。来週のエピソードのように——まだ公開前です。",
    back: "← ホームへ戻る",
  },
  a11y: {
    skipLink: "コンテンツへスキップ",
    switcher: "言語を選択",
  },
};

export const dictionaries: Record<Locale, Dictionary> = { id, en, ja };

export function isLocale(value: string | null): value is Locale {
  return value !== null && (LOCALES as readonly string[]).includes(value);
}
