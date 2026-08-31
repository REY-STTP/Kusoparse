import Link from "next/link";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import { dictionaries, type Locale } from "@/lib/i18n/dictionaries";
import { guidePath, localizedPath } from "@/lib/seo";
import {
  DIRECT_HOSTS,
  DIRECT_HOST_COUNT,
  INTERMEDIARY_HOSTS,
  INTERMEDIARY_HOST_COUNT,
} from "@/lib/hosts";

export default function HostsContent({ locale }: { locale: Locale }) {
  const t = dictionaries[locale];

  return (
    <main
      id="content"
      className="min-h-dvh flex flex-col relative z-10 overflow-x-clip"
    >
      <div className="bg-kuso-ink text-kuso-paper border-b-[3px] border-kuso-ink py-2">
        <div className="max-w-3xl mx-auto px-5 flex items-center justify-between gap-4 font-mono text-[11px] font-bold tracking-[0.16em] uppercase">
          <Link href={localizedPath(locale)} className="hover:text-kuso-accent">
            KUSOPARSE
          </Link>
          <span className="text-kuso-accent" aria-hidden="true">
            HOSTS//
          </span>
        </div>
      </div>

      <div className="w-full max-w-3xl mx-auto px-5 pt-8 sm:pt-12 pb-12">
        <div className="flex justify-end mb-10">
          <LocaleSwitcher page="hosts" />
        </div>

        <article>
          <header className="max-w-2xl mb-12">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-kuso-accent mb-4">
              {t.seo.eyebrow}
            </p>
            <h1 className="font-display font-black text-4xl sm:text-6xl leading-[0.95] text-balance">
              {t.seo.hostsTitle}
            </h1>
            <p className="mt-6 text-base sm:text-lg leading-relaxed text-pretty opacity-85">
              {t.seo.hostsDescription}
            </p>
          </header>

          <div className="grid gap-10 max-w-2xl">
            <section aria-labelledby="hosts-intro-title">
              <h2
                id="hosts-intro-title"
                className="font-display font-bold text-2xl mb-4"
              >
                {t.seo.title}
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-pretty opacity-85">
                {t.seo.hostsIntro}
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <p className="hard-border shadow-hard-sm bg-kuso-paper p-4">
                  <span className="font-display font-black text-4xl text-kuso-accent tabular-nums">
                    {DIRECT_HOST_COUNT}
                  </span>
                  <span className="mt-1 block font-mono text-xs font-bold uppercase tracking-wider">
                    {t.seo.hostsDirectTitle}
                  </span>
                </p>
                <p className="hard-border shadow-hard-sm bg-kuso-paper p-4">
                  <span className="font-display font-black text-4xl text-kuso-accent tabular-nums">
                    {INTERMEDIARY_HOST_COUNT}
                  </span>
                  <span className="mt-1 block font-mono text-xs font-bold uppercase tracking-wider">
                    {t.seo.hostsResolverTitle}
                  </span>
                </p>
              </div>
            </section>

            <section aria-labelledby="direct-hosts-title">
              <h2
                id="direct-hosts-title"
                className="font-display font-bold text-2xl mb-4"
              >
                {t.seo.hostsDirectTitle}
              </h2>
              <ul className="flex flex-wrap gap-2">
                {DIRECT_HOSTS.map((host) => (
                  <li
                    key={host}
                    className="hard-border bg-kuso-paper shadow-hard-sm px-3 py-2 font-mono text-xs font-bold"
                  >
                    {host}
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="resolver-hosts-title">
              <h2
                id="resolver-hosts-title"
                className="font-display font-bold text-2xl mb-4"
              >
                {t.seo.hostsResolverTitle}
              </h2>
              <ul className="flex flex-wrap gap-2">
                {INTERMEDIARY_HOSTS.map((host) => (
                  <li
                    key={host}
                    className="hard-border bg-kuso-tape shadow-hard-sm px-3 py-2 font-mono text-xs font-bold"
                  >
                    {host}
                  </li>
                ))}
              </ul>
            </section>

            <section
              aria-labelledby="hosts-note-title"
              className="hard-border bg-kuso-tape p-5"
            >
              <h2
                id="hosts-note-title"
                className="font-display font-bold text-lg mb-2"
              >
                {t.seo.limitationsTitle}
              </h2>
              <p className="text-sm leading-relaxed text-pretty opacity-85">
                {t.seo.hostsNote}
              </p>
            </section>
          </div>
        </article>

        <nav aria-label={t.seo.backHome} className="mt-12 flex flex-wrap gap-3">
          <Link
            href={localizedPath(locale)}
            className="hard-border press-effect inline-flex bg-kuso-ink text-kuso-paper px-5 py-3 font-mono text-sm font-bold shadow-hard-sm hover:bg-kuso-accent"
          >
            {t.seo.backHome}
          </Link>
          <Link
            href={guidePath(locale)}
            className="hard-border press-effect inline-flex bg-kuso-paper px-5 py-3 font-mono text-sm font-bold shadow-hard-sm hover:bg-kuso-tape"
          >
            {t.seo.guideLink}
          </Link>
        </nav>
      </div>

      <footer className="mt-auto px-5 pb-8 pt-6 text-center font-mono text-[11px] leading-relaxed opacity-60">
        <p>KUSOPARSE © {new Date().getFullYear()} — {t.footer.line1}</p>
        <p className="mt-1">{t.footer.line2}</p>
      </footer>
    </main>
  );
}
