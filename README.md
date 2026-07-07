# KUSOPARSE

> Parse Kusonime pages into a clean, modern download interface.

KUSOPARSE is a lightweight web application that extracts anime information and download links from Kusonime pages. Simply paste a Kusonime URL, and KUSOPARSE will display metadata, synopsis, and organized download mirrors in a clean Neubrutalism-inspired interface.

---

## ✨ Features

* 🎬 Parse Kusonime anime pages
* 📖 Display anime metadata
* 📝 Readable synopsis section
* 🎞 Organized download links by resolution
* 🔗 Automatic download link resolver
* ⚡ Fast and lightweight
* 🎨 Neubrutalism-inspired UI
* 📱 Responsive design

---

## Preview

Paste a Kusonime URL such as:

```text
https://kusonime.com/example-anime-batch-sub-indo/
```

KUSOPARSE will automatically extract:

* Anime title
* Japanese title
* Genre
* Season
* Type
* Status
* Total episodes
* Score
* Duration
* Release date
* Synopsis
* Download mirrors grouped by resolution

---

## Tech Stack

* Next.js
* React
* TypeScript
* Framer Motion
* CSS Modules

---

## Getting Started

Clone the repository:

```bash
git clone https://github.com/REY-STTP/kusoparse.git
```

Move into the project:

```bash
cd kusoparse
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open your browser:

```
http://localhost:3000
```

---

## Project Structure

```text
app/
components/
lib/
public/
styles/
```

---

## How It Works

1. Paste a Kusonime URL.
2. The server fetches the page.
3. HTML is parsed.
4. Anime metadata is extracted.
5. Download mirrors are grouped by resolution.
6. Clicking a mirror resolves the final download URL.

---

## Disclaimer

KUSOPARSE does not host, upload, or redistribute anime files.

This project only parses publicly available information from Kusonime pages and redirects users to the original download sources.

All copyrights belong to their respective owners.

---

## License

MIT License

---

Made with ❤️ for the Kusonime community.

Kalau mau dibuat lebih keren lagi, saya bisa membuat README dengan **badge GitHub (Next.js, TypeScript, MIT, Vercel)**, screenshot preview, GIF demo, dan tampilan yang setara dengan proyek-proyek populer di GitHub sehingga terlihat lebih profesional.
