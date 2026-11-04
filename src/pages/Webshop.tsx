import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import logoUrl from "@/assets/soul-ritual-logo-transparent.png";
import workbookHatarokCover from "@/assets/munkafuzet-hatarok.jpg";
import workbookKapcsolatCover from "@/assets/munkafuzet-kapcsolati-mintaim.jpg";

export interface WorkbookCatalogItem {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  tag: string;
  pages: string;
  price: string;
  cover: string;
  excerpt: string;
  highlights: string[];
}

export const WORKBOOKS: WorkbookCatalogItem[] = [
  {
    id: "hatarok",
    slug: "/munkafuzet",
    title: "Határok",
    subtitle: "A saját szükségleteim felismerése és képviselete",
    tag: "Önismereti munkafüzet",
    pages: "13 oldal · PDF",
    price: "4 900 Ft",
    cover: workbookHatarokCover,
    excerpt:
      "Egy önismereti munkafüzet azoknak, akik szeretnének kiállni önmagukért anélkül, hogy közben elveszítenék a másokkal való kapcsolódást.",
    highlights: [
      "Kétirányú szemlélet: saját határok védelme & mások határainak tisztelete",
      "17 részletesen kifejtett határterület hétköznapi példamondatokkal",
      "Segítő táblázatok és kitölthető önismereti gyakorlatok",
    ],
  },
  {
    id: "kapcsolati-mintaim",
    slug: "/kapcsolati-mintaim",
    title: "A kapcsolati mintáim nyomában",
    subtitle: "Családi örökség, párkapcsolati dinamika és önismereti feltárás",
    tag: "Vezetett önismereti munkafüzet",
    pages: "30 oldal · 8 fejezet · PDF",
    price: "8 900 Ft",
    cover: workbookKapcsolatCover,
    excerpt:
      "Lassíts. Figyelj. Értsd meg. Válassz újra. Vezetett önismereti utazás a családi térképedtől és hozott mondataidtól a párkapcsolati konfliktuskörök megszakításáig.",
    highlights: [
      "8 egymásra épülő fejezet szakirodalmi alapokon, közérthető nyelven",
      "Többgenerációs családi térkép (genogram) és családi szabályok újraírása",
      "11 strukturált munkalap: reakciólánc, konfliktuskör és felelősségi körök",
    ],
  },
];

export default function Webshop() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-cream text-earth">
      {/* ── Header ── */}
      <header className="sticky top-0 z-40 border-b border-earth/10 bg-cream/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.18em] uppercase text-earth/75 transition hover:text-gold"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Vissza a főoldalra</span>
          </Link>

          <Link to="/" className="flex items-center">
            <img src={logoUrl} alt="Soul Ritual" className="h-12 sm:h-14 w-auto" />
          </Link>

          <span className="text-[11px] font-semibold tracking-[0.22em] uppercase text-gold">
            Webshop
          </span>
        </div>
      </header>

      <main>
        {/* ── Hero Banner ── */}
        <section className="bg-gradient-to-b from-linen via-cream to-cream px-6 pt-16 pb-16 lg:pt-24 lg:pb-20 text-center">
          <div className="mx-auto max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-[11px] font-semibold tracking-[0.22em] uppercase text-earth">
              <Sparkles className="h-3.5 w-3.5 text-gold" />
              Soul Ritual · Webshop
            </div>
            <h1 className="mt-6 font-display text-4xl leading-tight text-earth sm:text-6xl">
              Önismereti <em className="italic text-gold">munkafüzetek</em>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-earth/75 sm:text-lg">
              Digitális, otthon is nyomtatható önismereti munkafüzetek, amelyekkel a saját
              tempódban, biztonságos keretek között fedezheted fel a határaidat, a kapcsolati
              mintáidat és a belső válaszaidat.
            </p>
          </div>
        </section>

        {/* ── Workbook Grid ── */}
        <section className="px-6 pb-24 lg:pb-32">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2">
            {WORKBOOKS.map((wb) => (
              <article
                key={wb.id}
                className="group flex flex-col overflow-hidden rounded-3xl border border-gold/30 bg-linen shadow-sm transition duration-500 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Cover presentation */}
                <Link
                  to={wb.slug}
                  className="relative flex items-center justify-center bg-gradient-to-b from-earth/5 to-linen p-8 sm:p-12 overflow-hidden"
                >
                  <img
                    src={wb.cover}
                    alt={`${wb.title} — ${wb.subtitle}`}
                    className="h-80 sm:h-96 w-auto rounded-xl border border-gold/30 object-cover shadow-2xl transition duration-700 group-hover:scale-[1.03]"
                  />
                  <span className="absolute top-5 right-5 rounded-full bg-cream/90 backdrop-blur-sm border border-gold/30 px-3.5 py-1 text-[10px] font-semibold tracking-widest uppercase text-earth">
                    {wb.pages}
                  </span>
                </Link>

                {/* Content */}
                <div className="flex flex-1 flex-col justify-between p-8 sm:p-10 bg-cream">
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-gold">
                        {wb.tag}
                      </span>
                      <span className="font-display text-2xl text-earth">{wb.price}</span>
                    </div>

                    <Link to={wb.slug} className="block mt-3">
                      <h2 className="font-display text-3xl leading-snug text-earth transition group-hover:text-gold">
                        {wb.title}
                      </h2>
                    </Link>
                    <p className="mt-1 font-display text-base italic text-earth/70">
                      {wb.subtitle}
                    </p>

                    <p className="mt-5 text-sm sm:text-base leading-relaxed text-earth/75">
                      {wb.excerpt}
                    </p>

                    <ul className="mt-6 space-y-2.5 border-t border-earth/10 pt-5 text-xs sm:text-sm text-earth/80">
                      {wb.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                    <Link
                      to={wb.slug}
                      className="inline-flex flex-1 items-center justify-center gap-3 rounded-full bg-earth px-7 py-4 text-xs font-semibold tracking-[0.2em] uppercase text-cream shadow-md transition hover:bg-gold"
                    >
                      <BookOpen className="h-4 w-4" />
                      <span>Részletek & Megrendelés</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Guarantee Strip */}
          <div className="mx-auto mt-16 max-w-4xl rounded-3xl border border-gold/30 bg-linen p-8 text-center sm:p-10">
            <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-gold/15 text-gold">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="font-display text-2xl text-earth">
              14 napos, 100%-os elégedettségi garancia minden munkafüzetre
            </h3>
            <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-earth/70">
              Minden Soul Ritual munkafüzetet kockázat nélkül kipróbálhatsz. Sikeres fizetés
              után azonnal letöltheted PDF formátumban, és ha 14 napon belül úgy érzed, nem
              adott valódi értéket, kérdés nélkül visszatérítjük az árát.
            </p>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="bg-earth px-6 py-12 text-center text-xs text-cream/60">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
          <span>
            © {new Date().getFullYear()} Soul Ritual · Erdélyi Izabella · Minden jog fenntartva
          </span>
          <Link to="/" className="text-gold-soft hover:text-cream uppercase tracking-widest">
            ← Vissza a Soul Ritual főoldalára
          </Link>
        </div>
      </footer>
    </div>
  );
}

