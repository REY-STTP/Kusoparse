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
- Route crawlable per bahasa: home `/`, `/en`, `/ja`; panduan `/panduan`, `/en/guide`, `/ja/guide`; daftar host `/hosts`, `/en/hosts`, `/ja/hosts`.
- Setiap bahasa dirender lewat route group sendiri (`app/(id)`, `app/(en)`, `app/(ja)`) dengan root layout `<html lang>` statis — semua halaman konten ter-prerender (static) tanpa `headers()` di layout.
- Social preview image (Open Graph + Twitter) ter-lokalisasi per bahasa.
- Error API juga diterjemahkan (`/api/parse?lang=…`).

### Search-ready (SEO / GEO / AEO / LLMO)

- **Metadata** — title, description, dan canonical unik per bahasa; hreflang lengkap (`id-ID`, `en`, `ja`, `x-default`) di semua halaman; slug panduan ter-lokalisasi (`/panduan`, `/en/guide`, `/ja/guide`) dengan redirect permanen dari slug lama.
- **Structured data** — JSON-LD `Organization`, `WebSite`, `WebApplication`, `WebPage`, `HowTo`, `FAQPage`, `BreadcrumbList`, dan `ItemList` (daftar 15 host di halaman hosts).
- **Konten semantik** — FAQ, cara penggunaan, fitur, batasan layanan, dan daftar host ter-render di HTML (SSR statis), bukan hanya di schema.
- **Fakta kutipabel (GEO)** — jumlah host konsisten di seluruh situs: 12 host download langsung + 3 resolver shortlink (`lib/hosts.ts` sebagai sumber tunggal).
- **Discovery** — `sitemap.xml` (9 URL + alternate languages), `robots.txt`, `manifest.webmanifest`, `llms.txt` (ringkasan + tautan markdown), dan `llms-full.txt` (konten lengkap: fitur, langkah, FAQ, batasan, daftar host) untuk agen AI/LLM.
- **Rendering statis** — seluruh halaman konten `○ Static` (prerender, disajikan dari CDN edge); hanya catch-all 404 dan API yang dinamis.
- **Verifikasi** — meta tag Google Search Console (`verification.google`) dan Bing Webmaster Tools (`msvalidate.01`) di metadata layout tiap locale.

### Keamanan

- **Validasi URL ketat** — `/api/parse` hanya menerima URL artikel Kusonime (host, protokol, tanpa port/credentials/query); redirect diikuti manual maksimal 3 hop dengan validasi tiap tujuan.
- **Allowlist resolver** — `/api/resolve` hanya memproses host perantara dan host direct yang didukung; URL lain ditolak sebelum ada fetch.
- **Proteksi SSRF** — hostname diverifikasi via DNS sebelum fetch (alamat privat/link-local ditolak), redirect dicek manual (tidak `redirect: "follow"`), response body dibatasi 4 MB.
- **URL output dinormalisasi** — hanya `http(s)` yang dirender/dibuka dari data hasil parsing.
- **Canonical redirect** — `proxy.ts` mengonsolidasikan alias host/protokol ke origin kanonik (301) dengan menyimpan path dan query.

## Tech Stack

| Lapisan | Teknologi |
| --- | --- |
| Framework | Next.js 16.3 (App Router, Turbopack, `proxy.ts`) |
| Bahasa | TypeScript 5, React 18 |
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
  (id)/                     # Route group Bahasa Indonesia (root layout sendiri)
    layout.tsx              # <html lang="id-ID">, font, metadata, LocaleProvider
    page.tsx                # Halaman utama (/)
    panduan/page.tsx        # Panduan + FAQ (/panduan)
    hosts/page.tsx          # Daftar host yang didukung (/hosts)
    opengraph-image.tsx     # Social preview (id)
    twitter-image.tsx
    not-found.tsx           # 404 kustom (locale ini)
    [...rest]/page.tsx      # Catch-all -> 404 dengan layout locale
  (en)/                     # Route group English — pola yang sama di bawah /en
    en/page.tsx             # /en
    en/guide/page.tsx       # /en/guide (redirect 308 dari /en/panduan)
    en/hosts/page.tsx       # /en/hosts
    en/opengraph-image.tsx  # /en/opengraph-image
    en/twitter-image.tsx
    not-found.tsx
    en/[...rest]/page.tsx
  (ja)/                     # Route group 日本語 — pola yang sama di bawah /ja
  api/parse/route.ts        # Endpoint parsing (lang-aware, validasi URL, noindex)
  api/resolve/route.ts      # Endpoint resolve shortlink (allowlist, noindex)
  robots.ts                 # robots.txt
  sitemap.ts                # sitemap.xml (9 URL + alternate languages)
  manifest.ts               # manifest.webmanifest (PWA)
  llms.txt/route.ts         # Ringkasan mesin untuk agen AI/LLM (markdown links)
  llms-full.txt/route.ts    # Konten lengkap untuk agen AI/LLM (FAQ, fitur, host)
  globals.css
  icon.png / apple-icon.png
components/
  HomeClient.tsx            # Halaman utama (hero, form, hasil, SEO content)
  GuideClient.tsx           # Halaman panduan
  HostsContent.tsx          # Halaman daftar host (server component)
  NotFoundContent.tsx       # 404 kustom (dipakai semua group)
  UrlForm.tsx               # Form input URL + validasi
  AnimeCard.tsx             # Kartu hasil (info, sinopsis, link, atribusi sumber)
  SeoContent.tsx            # Konten semantik: fitur, how-to, FAQ
  StructuredData.tsx        # JSON-LD @graph per halaman (home/guide/hosts)
  LocaleSwitcher.tsx        # Toggle ID / EN / JP dengan path per-locale
  SkipLink.tsx              # Skip-to-content link
lib/
  site.ts                   # SITE_URL + absoluteUrl + verifikasi GSC & Bing
  seo.ts                    # Metadata localized, canonical, hreflang, social image, verifikasi
  hosts.ts                  # Sumber tunggal daftar host (12 direct + 3 resolver)
  fonts.ts                  # Font bersama untuk semua root layout
  urls.ts                   # Validasi URL Kusonime + normalisasi http(s)
  http.ts                   # Pembaca response body dengan batas ukuran
  parseKusonime.ts          # Scraper cheerio halaman Kusonime
  resolveLink.ts            # Resolver shortlink (allowlist + SSRF guard)
  social-image.tsx          # Generator social image per locale
  i18n/                     # dictionaries.ts + LocaleContext.tsx
hooks/
  useKuso.ts                # State parsing (loading / error / data)
proxy.ts                    # Redirect kanonik ke origin publik (301)
next.config.mjs             # Redirect slug lama (en/ja panduan -> guide) + image patterns
eslint.config.mjs           # Flat config ESLint 9
```

## Identitas Visual

- Palet: cream `#F2ECDC`, paper `#FCFAF2`, sand `#E7DDC6`, ink `#171410`, aksen vermilion `#D63F1E` — lihat `tailwind.config.ts`.
- Tipografi: Zen Kaku Gothic New (display & body), JetBrains Mono.
- Logo: monogram "K" yang menyatu dengan panah download, tersedia di `app/icon.png` (512), `app/apple-icon.png` (180), dan `public/favicon.ico` (32).

## Disclaimer

KUSOPARSE bukan afiliasi resmi Kusonime. Seluruh konten yang diproses tetap milik pemilik aslinya. Gunakan untuk keperluan yang diperbolehkan.
