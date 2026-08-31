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
    headlineLead: ["TEMPEL.", "PARSE."],
    headlineMark: "UNDUH.",
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
  seo: {
    metaTitle: "Parser URL Kusonime: Metadata Anime dan Link Download",
    description:
      "KUSOPARSE adalah parser URL Kusonime untuk mengambil metadata anime, sinopsis, informasi episode, dan link download dari halaman artikel.",
    eyebrow: "Tentang KUSOPARSE",
    title: "Parser URL Kusonime untuk metadata yang lebih rapi",
    featuresTitle: "Yang bisa dilakukan KUSOPARSE",
    features: [
      {
        title: "Metadata anime",
        description:
          "Ambil judul, genre, status, skor, tipe, musim, dan informasi lain yang tersedia pada artikel sumber.",
      },
      {
        title: "Sinopsis dan episode",
        description:
          "Tampilkan sinopsis serta kelompok episode atau part dalam satu hasil yang mudah dipindai.",
      },
      {
        title: "Link berdasarkan kualitas",
        description:
          "Pilih resolusi dan host yang tersedia. Link dibuka di tab baru menuju alamat sumbernya.",
      },
      {
        title: "Sumber tetap jelas",
        description:
          "KUSOPARSE memproses URL artikel yang kamu masukkan dan tidak menjadi host untuk file anime.",
      },
    ],
    howToTitle: "Cara menggunakan parser Kusonime",
    howToSteps: [
      "Buka artikel anime di kusonime.com, lalu salin URL artikelnya.",
      "Tempel URL tersebut ke kolom parser dan tekan tombol PARSE.",
      "Pilih part, resolusi, dan host untuk membuka link yang tersedia.",
    ],
    guideLink: "Buka panduan lengkap",
    faqTitle: "Pertanyaan umum",
    faq: [
      {
        question: "Apa itu KUSOPARSE?",
        answer:
          "KUSOPARSE adalah alat web yang membaca halaman artikel Kusonime dan menyajikan metadata anime, sinopsis, informasi episode, serta link yang tersedia dalam format yang lebih ringkas.",
      },
      {
        question: "URL seperti apa yang didukung?",
        answer:
          "Masukkan URL artikel Kusonime dengan format https://kusonime.com/judul-anime/ atau URL www.kusonime.com yang setara.",
      },
      {
        question: "Apakah KUSOPARSE menyimpan atau meng-host file anime?",
        answer:
          "Tidak. KUSOPARSE hanya mengambil struktur halaman sumber dan meneruskan link yang tersedia. File tetap berada pada host atau pemilik sumber masing-masing.",
      },
      {
        question: "Mengapa hasil parsing bisa gagal?",
        answer:
          "Parsing dapat gagal jika URL tidak valid, halaman sumber tidak merespons, atau struktur halaman Kusonime berubah. Coba periksa URL dan ulangi beberapa saat kemudian.",
      },
      {
        question: "Apakah KUSOPARSE resmi berafiliasi dengan Kusonime?",
        answer:
          "Tidak. KUSOPARSE adalah alat independen dan tidak mengklaim afiliasi resmi dengan Kusonime.",
      },
    ],
    guideTitle: "Panduan menggunakan KUSOPARSE",
    guideDescription:
      "Panduan ringkas untuk mengambil metadata anime dan menemukan link yang tersedia dari artikel Kusonime.",
    guideIntro:
      "KUSOPARSE membantu merapikan informasi dari artikel Kusonime ke dalam satu tampilan. Kamu tetap memasukkan URL artikel sumber secara langsung, sehingga konteks dan atribusi sumber tetap jelas.",
    limitationsTitle: "Batasan dan penggunaan yang bertanggung jawab",
    limitations: [
      "KUSOPARSE tidak meng-host, menjual, atau mengklaim kepemilikan file yang ditautkan.",
      "Ketersediaan link bergantung pada halaman sumber dan host pihak ketiga.",
      "Gunakan hanya untuk konten dan tujuan yang memang kamu berhak akses.",
    ],
    sourceLabel: "Buka artikel sumber",
    backHome: "Kembali ke parser",
    hostsLink: "Lihat host yang didukung",
    hostsMetaTitle: "Host Download dan Resolver Shortlink yang Didukung",
    hostsTitle: "Host yang didukung KUSOPARSE",
    hostsDescription:
      "Daftar host download langsung dan resolver shortlink yang dikenali KUSOPARSE saat memproses link dari artikel Kusonime.",
    hostsIntro:
      "KUSOPARSE meneruskan link apa pun yang tersedia pada artikel sumber. Host berikut dikenali sebagai host download langsung, atau sebagai shortlink yang dapat di-resolve otomatis.",
    hostsDirectTitle: "Host download langsung",
    hostsResolverTitle: "Resolver shortlink",
    hostsNote:
      "Ketersediaan link bergantung pada artikel sumber dan host pihak ketiga. KUSOPARSE tidak berafiliasi dengan host-host di atas.",
  },
};

export type Dictionary = typeof id;

const en: Dictionary = {
  header: {
    badge: "Kusonime Parser",
    headlineLead: ["PASTE.", "PARSE."],
    headlineMark: "DOWNLOAD.",
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
  seo: {
    metaTitle: "Kusonime URL Parser: Anime Metadata and Download Links",
    description:
      "KUSOPARSE is a Kusonime URL parser that extracts anime metadata, synopsis, episode information, and links from an article page.",
    eyebrow: "About KUSOPARSE",
    title: "A clearer parser for Kusonime article URLs",
    featuresTitle: "What KUSOPARSE does",
    features: [
      {
        title: "Anime metadata",
        description:
          "Extract the title, genres, status, score, type, season, and other information available on the source article.",
      },
      {
        title: "Synopsis and episodes",
        description:
          "Show the synopsis and episode or part groups in one easy-to-scan result.",
      },
      {
        title: "Links by quality",
        description:
          "Choose an available resolution and host. Links open in a new tab at their source address.",
      },
      {
        title: "Clear attribution",
        description:
          "KUSOPARSE processes the article URL you provide and does not host anime files.",
      },
    ],
    howToTitle: "How to use the Kusonime parser",
    howToSteps: [
      "Open an anime article on kusonime.com and copy its article URL.",
      "Paste the URL into the parser field and press PARSE.",
      "Choose a part, resolution, and host to open an available link.",
    ],
    guideLink: "Read the full guide",
    faqTitle: "Frequently asked questions",
    faq: [
      {
        question: "What is KUSOPARSE?",
        answer:
          "KUSOPARSE is a web tool that reads a Kusonime article and presents its anime metadata, synopsis, episode information, and available links in a more compact format.",
      },
      {
        question: "Which URLs are supported?",
        answer:
          "Enter a Kusonime article URL such as https://kusonime.com/anime-title/ or the equivalent www.kusonime.com URL.",
      },
      {
        question: "Does KUSOPARSE store or host anime files?",
        answer:
          "No. KUSOPARSE reads the source page structure and passes through available links. Files remain with their respective hosts or source owners.",
      },
      {
        question: "Why can parsing fail?",
        answer:
          "Parsing can fail when the URL is invalid, the source page does not respond, or the Kusonime page structure changes. Check the URL and try again later.",
      },
      {
        question: "Is KUSOPARSE officially affiliated with Kusonime?",
        answer:
          "No. KUSOPARSE is an independent tool and does not claim official affiliation with Kusonime.",
      },
    ],
    guideTitle: "How to use KUSOPARSE",
    guideDescription:
      "A short guide to extracting anime metadata and finding available links from a Kusonime article.",
    guideIntro:
      "KUSOPARSE organizes information from a Kusonime article into one view. You provide the source article URL directly, keeping the source context and attribution clear.",
    limitationsTitle: "Limitations and responsible use",
    limitations: [
      "KUSOPARSE does not host, sell, or claim ownership of linked files.",
      "Link availability depends on the source page and third-party hosts.",
      "Use the tool only for content and purposes you are authorized to access.",
    ],
    sourceLabel: "Open source article",
    backHome: "Back to parser",
    hostsLink: "See supported hosts",
    hostsMetaTitle: "Supported Download Hosts and Shortlink Resolvers",
    hostsTitle: "Hosts supported by KUSOPARSE",
    hostsDescription:
      "The direct download hosts and shortlink resolvers KUSOPARSE recognizes when processing links from a Kusonime article.",
    hostsIntro:
      "KUSOPARSE passes through every link available on the source article. The hosts below are recognized as direct download hosts, or as shortlinks the resolver can expand automatically.",
    hostsDirectTitle: "Direct download hosts",
    hostsResolverTitle: "Shortlink resolvers",
    hostsNote:
      "Link availability depends on the source article and third-party hosts. KUSOPARSE is not affiliated with the hosts listed above.",
  },
};

const ja: Dictionary = {
  header: {
    badge: "クソニメ解析ツール",
    headlineLead: ["貼る。", "解析。"],
    headlineMark: "取得。",
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
  seo: {
    metaTitle: "Kusonime URL解析: アニメ情報とダウンロードリンク",
    description:
      "KUSOPARSEは、記事URLからアニメのメタデータ、あらすじ、エピソード情報、利用可能なリンクを取得するKusonime解析ツールです。",
    eyebrow: "KUSOPARSEについて",
    title: "Kusonime記事URLを整理して解析",
    featuresTitle: "KUSOPARSEでできること",
    features: [
      {
        title: "アニメのメタデータ",
        description:
          "記事に掲載されたタイトル、ジャンル、状態、スコア、タイプ、シーズンなどを取得します。",
      },
      {
        title: "あらすじとエピソード",
        description:
          "あらすじとエピソードまたはパートのグループを、見やすい結果画面にまとめます。",
      },
      {
        title: "画質別リンク",
        description:
          "利用可能な画質とホストを選択できます。リンクは元のアドレスを新しいタブで開きます。",
      },
      {
        title: "出典を明確に表示",
        description:
          "入力された記事URLを処理するだけで、アニメファイル自体をホストしません。",
      },
    ],
    howToTitle: "Kusonime解析ツールの使い方",
    howToSteps: [
      "kusonime.comでアニメ記事を開き、記事URLをコピーします。",
      "解析欄にURLを貼り付け、「解析」ボタンを押します。",
      "パート、画質、ホストを選択して利用可能なリンクを開きます。",
    ],
    guideLink: "詳しい使い方を見る",
    faqTitle: "よくある質問",
    faq: [
      {
        question: "KUSOPARSEとは何ですか？",
        answer:
          "KUSOPARSEは、Kusonimeの記事を読み取り、アニメのメタデータ、あらすじ、エピソード情報、利用可能なリンクを簡潔に表示するウェブツールです。",
      },
      {
        question: "対応しているURLは？",
        answer:
          "https://kusonime.com/anime-title/ のようなKusonime記事URL、または同等のwww.kusonime.com URLを入力してください。",
      },
      {
        question: "KUSOPARSEはアニメファイルを保存・ホストしますか？",
        answer:
          "いいえ。KUSOPARSEは元ページの構造を読み取り、掲載されたリンクを表示するだけです。ファイルは各ホストまたは原著作者の管理下にあります。",
      },
      {
        question: "解析に失敗する理由は？",
        answer:
          "URLが無効、元ページが応答しない、またはKusonimeのページ構造が変更された場合に失敗することがあります。URLを確認して再試行してください。",
      },
      {
        question: "KUSOPARSEはKusonime公式と提携していますか？",
        answer:
          "いいえ。KUSOPARSEは独立したツールであり、Kusonimeとの公式な提携を主張していません。",
      },
    ],
    guideTitle: "KUSOPARSEの使い方",
    guideDescription:
      "Kusonimeの記事からアニメ情報と利用可能なリンクを取得するための簡単なガイドです。",
    guideIntro:
      "KUSOPARSEは、Kusonimeの記事情報を一つの画面に整理します。元記事のURLを直接入力するため、出典と文脈を確認できます。",
    limitationsTitle: "制限事項と責任ある利用",
    limitations: [
      "KUSOPARSEはリンク先のファイルをホスト、販売、所有権主張しません。",
      "リンクの有効性は元ページと第三者ホストに依存します。",
      "アクセスする権利のあるコンテンツと目的にのみ利用してください。",
    ],
    sourceLabel: "元記事を開く",
    backHome: "解析画面に戻る",
    hostsLink: "対応ホストを見る",
    hostsMetaTitle: "対応ダウンロードホストと短縮リンクリゾルバ",
    hostsTitle: "KUSOPARSEが対応するホスト",
    hostsDescription:
      "Kusonime記事のリンクを処理する際にKUSOPARSEが認識する直接ダウンロードホストと短縮リンクリゾルバの一覧。",
    hostsIntro:
      "KUSOPARSEはソース記事にあるリンクをすべてそのまま渡します。以下のホストは直接ダウンロードホスト、またはリゾルバが自動展開できる短縮リンクとして認識されます。",
    hostsDirectTitle: "直接ダウンロードホスト",
    hostsResolverTitle: "短縮リンクリゾルバ",
    hostsNote:
      "リンクの可用性はソース記事とサードパーティホストに依存します。KUSOPARSEは上記のホストと提携関係にありません。",
  },
};

export const dictionaries: Record<Locale, Dictionary> = { id, en, ja };

export function isLocale(value: string | null): value is Locale {
  return value !== null && (LOCALES as readonly string[]).includes(value);
}
