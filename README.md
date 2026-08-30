# KUSOPARSE

Parser untuk halaman [Kusonime](https://kusonime.com): tempel URL artikel anime, dapatkan metadata, informasi episode, dan seluruh link download dalam satu klik — tanpa popup iklan, tanpa shortlink.

Dibangun dengan Next.js App Router, bergaya risograph print / neo-brutalist, dan mendukung tiga bahasa.

## Fitur

### Parser

- **Parsing instan** — ekstrak judul, thumbnail, info (genre, status, score, dst.), sinopsis, dan semua link download dari halaman Kusonime.
- **Resolve shortlink** — membuka shortlink host (shrinkearn, tpi.li, justpaste.it, dst.) langsung ke link download aslinya.
- **State lengkap** — skeleton loader saat parsing, error state yang jelas, empty state "cara pakai", halaman 404 kustom.
- **Aksesibilitas** — skip-link, `focus-visible`, `aria` attributes, dukungan `prefers-reduced-motion`.

### Multibahasa

- UI dan metadata tersedia dalam Bahasa Indonesia (`/`), English (`/en`), dan 日本語 (`/ja`).
- Route crawlable per bahasa: `/`, `/en`, `/ja` + panduan `/panduan`, `/en/panduan`, `/ja/panduan`.
- Social preview image (Open Graph + Twitter) ter-lokalisasi per bahasa.
- Error API juga diterjemahkan (`/api/parse?lang=…`).

### Search-ready (SEO / GEO / AEO / LLMO)

- **Metadata** — title, description, dan canonical unik per bahasa; hreflang lengkap (`id-ID`, `en`, `ja`, `x-default`) di semua halaman.
- **Structured data** — JSON-LD `Organization`, `WebSite`, `WebApplication`, `WebPage`, `HowTo`, `FAQPage`, dan `BreadcrumbList`.
- **Konten semantik** — FAQ, cara penggunaan, fitur, dan batasan layanan ter-render di HTML (SSR), bukan hanya di schema.
- **Discovery** — `sitemap.xml` dengan alternate languages, `robots.txt`, `manifest.webmanifest`, dan `llms.txt` untuk agen AI/LLM.
- **Verifikasi** — meta tag Google Search Console (`verification.google` di root layout).

### Keamanan

- **Validasi URL ketat** — `/api/parse` hanya menerima URL artikel Kusonime (host, protokol, tanpa port/credentials/query); redirect diikuti manual maksimal 3 hop dengan validasi tiap tujuan.
- **Allowlist resolver** — `/api/resolve` hanya memproses host perantara dan host direct yang didukung; URL lain ditolak sebelum ada fetch.
- **Proteksi SSRF** — hostname diverifikasi via DNS sebelum fetch (alamat privat/link-local ditolak), redirect dicek manual (tidak `redirect: "follow"`), response body dibatasi 4 MB.
- **URL output dinormalisasi** — hanya `http(s)` yang dirender/dibuka dari data hasil parsing.
- **Canonical redirect** — `proxy.ts` mengonsolidasikan alias host/protokol ke origin kanonik (301) dengan menyimpan path dan query.

## Tech Stack

| Lapisan | Teknologi |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack, `proxy.ts`) |
| Bahasa | TypeScript |
| UI | Tailwind CSS 3, Framer Motion, lucide-react |
| Parsing | cheerio |
| Lint | ESLint 9 (flat config, `eslint-config-next`) |

## Konfigurasi

Salin `.env.example` menjadi `.env.local` lalu sesuaikan:

```
NEXT_PUBLIC_SITE_URL=https://www.kusoparse.web.id
```

Variabel ini menjadi origin kanonik untuk canonical URL, hreflang, sitemap, JSON-LD, social image, dan target redirect `proxy.ts`. Di lingkungan development, request ke `localhost`/`127.0.0.1`/`::1` dilewati dari redirect kanonik.

## Menjalankan

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint     # ESLint 9 (flat config)
npm run build    # production build
npm run start    # jalankan build produksi
```

## Struktur

```
app/
  page.tsx                  # Halaman utama Bahasa Indonesia
  en/ + ja/                 # Halaman utama, panduan, dan social image terlokalisasi
  panduan/page.tsx          # Panduan, langkah penggunaan, dan FAQ
  layout.tsx                # Font, metadata global, verifikasi GSC, LocaleProvider
  not-found.tsx             # 404 kustom
  robots.ts                 # robots.txt
  sitemap.ts                # sitemap.xml + alternate languages
  manifest.ts               # manifest.webmanifest (PWA)
  llms.txt/route.ts         # Ringkasan mesin untuk agen AI/LLM
  opengraph-image.tsx       # Social preview (id) + varian en/ja
  twitter-image.tsx         # Social preview (id) + varian en/ja
  api/parse/route.ts        # Endpoint parsing (lang-aware, validasi URL, noindex)
  api/resolve/route.ts      # Endpoint resolve shortlink (allowlist, noindex)
components/
  HomeClient.tsx            # Halaman utama (hero, form, hasil, SEO content)
  GuideClient.tsx           # Halaman panduan
  LocalizedHome.tsx         # Wrapper locale + structured data
  LocalizedGuide.tsx        # Wrapper locale + structured data
  UrlForm.tsx               # Form input URL + validasi
  AnimeCard.tsx             # Kartu hasil (info, sinopsis, link, atribusi sumber)
  SeoContent.tsx            # Konten semantik: fitur, how-to, FAQ
  StructuredData.tsx        # JSON-LD @graph per halaman
  LocaleSwitcher.tsx        # Toggle ID / EN / JP
  SkipLink.tsx              # Skip-to-content link
lib/
  site.ts                   # SITE_URL + absoluteUrl
  seo.ts                    # Metadata localized, canonical, hreflang
  urls.ts                   # Validasi URL Kusonime + normalisasi http(s)
  http.ts                   # Pembaca response body dengan batas ukuran
  parseKusonime.ts          # Scraper cheerio halaman Kusonime
  resolveLink.ts            # Resolver shortlink (allowlist + SSRF guard)
  social-image.tsx          # Generator social image per locale
  i18n/                     # dictionaries.ts + LocaleContext.tsx
hooks/
  useKuso.ts                # State parsing (loading / error / data)
proxy.ts                    # Redirect kanonik + header locale per request
eslint.config.mjs           # Flat config ESLint 9
```

## Identitas Visual

- Palet: cream `#F2ECDC`, paper `#FCFAF2`, sand `#E7DDC6`, ink `#171410`, aksen vermilion `#D63F1E` — lihat `tailwind.config.ts`.
- Tipografi: Zen Kaku Gothic New (display & body), JetBrains Mono.
- Logo: monogram "K" yang menyatu dengan panah download, tersedia di `app/icon.png` (512), `app/apple-icon.png` (180), dan `public/favicon.ico` (32).

## Disclaimer

KUSOPARSE bukan afiliasi resmi Kusonime. Seluruh konten yang diproses tetap milik pemilik aslinya. Gunakan untuk keperluan yang diperbolehkan.
