# KUSOPARSE

Parser untuk halaman [Kusonime](https://kusonime.com): tempel URL artikel anime, dapatkan metadata, informasi episode, dan seluruh link download dalam satu klik — tanpa popup iklan, tanpa shortlink.

Dibangun dengan Next.js App Router, bergaya risograph print / neo-brutalist, dan mendukung tiga bahasa.

## Fitur

- **Parsing instan** — ekstrak judul, thumbnail, info (genre, status, score, dst.), sinopsis, dan semua link download dari halaman Kusonime.
- **Resolve shortlink** — membuka shortlink host (shrinkearn, tpi.li, justpaste.it, dst.) langsung ke link download aslinya.
- **Multibahasa** — UI dalam Bahasa Indonesia, English, dan 日本語. Deteksi otomatis dari bahasa browser, pilihan tersimpan di `localStorage`. Error API juga terjemahan (`/api/parse?lang=…`).
- **Validasi URL** — hanya menerima URL artikel Kusonime yang valid.
- **State lengkap** — skeleton loader saat parsing, error state yang jelas, empty state "cara pakai", halaman 404 kustom.
- **Aksesibilitas** — skip-link, `focus-visible`, `aria` attributes, dukungan `prefers-reduced-motion`.

## Tech Stack

| Lapisan | Teknologi |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack) |
| Bahasa | TypeScript |
| UI | Tailwind CSS 3, Framer Motion, lucide-react |
| Parsing | cheerio |

## Menjalankan

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # jalankan build produksi
```

## Struktur

```
app/
  page.tsx              # Halaman utama
  layout.tsx            # Font, metadata, LocaleProvider
  not-found.tsx         # 404 kustom
  api/parse/route.ts    # Endpoint parsing (lang-aware)
  api/resolve/route.ts  # Endpoint resolve shortlink
components/
  UrlForm.tsx           # Form input URL + validasi
  AnimeCard.tsx         # Kartu hasil (info, sinopsis, link)
  LocaleSwitcher.tsx    # Toggle ID / EN / JP
  SkipLink.tsx          # Skip-to-content link
lib/
  parseKusonime.ts      # Scraper cheerio halaman Kusonime
  resolveLink.ts        # Resolver shortlink
  i18n/                 # dictionaries.ts + LocaleContext.tsx
hooks/
  useKuso.ts            # State parsing (loading / error / data)
```

## Identitas Visual

- Palet: cream `#F2ECDC`, paper `#FCFAF2`, sand `#E7DDC6`, ink `#171410`, aksen vermilion `#D63F1E` — lihat `tailwind.config.ts`.
- Tipografi: Zen Kaku Gothic New (display & body), JetBrains Mono.
- Logo: monogram "K" yang menyatu dengan panah download, tersedia di `app/icon.png` (512), `app/apple-icon.png` (180), dan `public/favicon.ico` (32).

## Disclaimer

KUSOPARSE bukan afiliasi resmi Kusonime. Seluruh konten yang diproses tetap milik pemilik aslinya. Gunakan untuk keperluan yang diperbolehkan.
