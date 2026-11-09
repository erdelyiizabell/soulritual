import { useEffect, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Calendar,
  Check,
  Download,
  Gift,
  Heart,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import logoUrl from "@/assets/soul-ritual-logo-transparent.png";
import workbookHatarokCover from "@/assets/munkafuzet-hatarok.jpg";
import workbookKapcsolatCover from "@/assets/munkafuzet-kapcsolati-mintaim.jpg";

// ─── Csomagajánlat (2 az 1-ben Bundle) Stripe & PDF beállítások ───────────────
const BUNDLE_STRIPE_PAYMENT_URL = "https://buy.stripe.com/9B63cy8U29sD75Ybim48004";
const BUNDLE_SECRET_KEY = "srbundle9900";
const HATAROK_PDF_URL = "/downloads/sr-hatarok-9f8a7c6b5e4d.pdf";
const KAPCSOLAT_PDF_URL = "/downloads/sr-kapcsolati-mintaim-4c8d1e9a2b.pdf";

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
    tag: "1. lépcsőfok · Belépő munkafüzet",
    pages: "14 oldal · PDF",
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
    tag: "2. lépcsőfok · Mélyelemző munkafüzet",
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
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const [couponInput, setCouponInput] = useState("");
  const isCouponApplied = couponInput.trim().toUpperCase() === "SOUL2000";

  const isBundlePaid =
    searchParams.get("paid") === "bundle" && searchParams.get("key") === BUNDLE_SECRET_KEY;

  useEffect(() => {
    if (location.hash === "#csomagajanlat") {
      const el = document.getElementById("csomagajanlat");
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 100);
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [location.hash]);

  const checkoutUrl = isCouponApplied
    ? `${BUNDLE_STRIPE_PAYMENT_URL}${
        BUNDLE_STRIPE_PAYMENT_URL.includes("?") ? "&" : "?"
      }prefilled_promo_code=SOUL2000`
    : BUNDLE_STRIPE_PAYMENT_URL;

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
        {/* ── Sikeres Csomagvásárlás Letöltő Szekció (?paid=bundle&key=srbundle9900) ── */}
        {isBundlePaid && (
          <section className="bg-gradient-to-b from-gold/20 via-linen to-cream px-6 py-16 border-b border-gold/30">
            <div className="mx-auto max-w-3xl rounded-3xl border-2 border-gold bg-cream p-8 text-center shadow-2xl sm:p-12">
              <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-full bg-gold/20 text-gold">
                <Sparkles className="h-8 w-8" />
              </div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold">
                Sikeres vásárlás · Teljes Belső Utazás Csomag
              </p>
              <h1 className="mt-3 font-display text-3xl text-earth sm:text-5xl">
                Köszönöm a bizalmadat!
              </h1>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-earth/75 sm:text-base">
                Mindkét önismereti munkafüzetedet azonnal letöltheted az alábbi gombokra
                kattintva. Kérlek, mentsd le őket a készülékedre, hogy bármikor elővehesd!
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <a
                  href={HATAROK_PDF_URL}
                  download="Soul_Ritual_Hatarok_Munkafuzet.pdf"
                  className="inline-flex items-center justify-center gap-3 rounded-2xl bg-earth px-6 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-cream shadow-lg transition hover:bg-gold"
                >
                  <Download className="h-4 w-4" />
                  <span>1. Határok PDF letöltése</span>
                </a>
                <a
                  href={KAPCSOLAT_PDF_URL}
                  download="Soul_Ritual_Kapcsolati_Mintaim_Munkafuzet.pdf"
                  className="inline-flex items-center justify-center gap-3 rounded-2xl bg-gold px-6 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-cream shadow-lg transition hover:bg-earth"
                >
                  <Download className="h-4 w-4" />
                  <span>2. Kapcsolati mintáim PDF</span>
                </a>
              </div>

              <div className="mt-8 rounded-2xl border border-gold/30 bg-linen p-5 text-left text-xs sm:text-sm text-earth/80">
                <p className="font-semibold text-earth">
                  💡 Javasolt sorrend a feldolgozáshoz:
                </p>
                <p className="mt-1">
                  Kezdd a <strong>Határok</strong> munkafüzettel (14 oldal), hogy felismerd a
                  jelenlegi energiavesztéseidet, majd folytasd{" "}
                  <strong>A kapcsolati mintáim nyomában</strong> (30 oldal) vezetett gyakorlataival,
                  ahol a gyökerekig és a családi térképedig megyünk le.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* ── Hero Banner ── */}
        <section className="bg-gradient-to-b from-linen via-cream to-cream px-6 pt-16 pb-12 lg:pt-24 lg:pb-16 text-center">
          <div className="mx-auto max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-[11px] font-semibold tracking-[0.22em] uppercase text-earth">
              <Sparkles className="h-3.5 w-3.5 text-gold" />
              Soul Ritual · Webshop & Értéklépcső
            </div>
            <h1 className="mt-6 font-display text-4xl leading-tight text-earth sm:text-6xl">
              Önismereti <em className="italic text-gold">munkafüzetek</em> & csomagok
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-earth/75 sm:text-lg">
              Digitális, otthon is nyomtatható önismereti munkafüzetek, amelyekkel a saját
              tempódban, biztonságos keretek között fedezheted fel a határaidat, a kapcsolati
              mintáidat és a belső válaszaidat.
            </p>
          </div>
        </section>

        {/* ── 🔥 VISSZAUTASÍTHATATLAN AJÁNLAT: 2 AZ 1-BEN CSOMAG ── */}
        <section id="csomagajanlat" className="px-6 pb-16">
          <div className="mx-auto max-w-6xl">
            <div className="relative overflow-hidden rounded-3xl border-2 border-gold bg-gradient-to-br from-earth via-earth to-earth/95 p-8 text-cream shadow-2xl sm:p-12 lg:p-14">
              {/* Decorative golden glow */}
              <div
                className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full opacity-25 blur-3xl"
                style={{ background: "var(--gold)" }}
              />

              <div className="relative grid gap-10 lg:grid-cols-12 lg:items-center">
                {/* Left: Overlapping covers */}
                <div className="flex flex-col items-center justify-center lg:col-span-5">
                  <div className="relative flex items-center justify-center py-4">
                    <img
                      src={workbookHatarokCover}
                      alt="Határok munkafüzet"
                      className="h-60 sm:h-72 w-auto -rotate-6 rounded-xl border border-gold/40 object-cover shadow-2xl transition duration-500 hover:rotate-0"
                    />
                    <img
                      src={workbookKapcsolatCover}
                      alt="A kapcsolati mintáim nyomában munkafüzet"
                      className="-ml-10 sm:-ml-12 mt-6 h-64 sm:h-76 w-auto rotate-6 rounded-xl border-2 border-gold object-cover shadow-2xl transition duration-500 hover:rotate-0"
                    />
                  </div>
                  <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-gold/20 border border-gold-soft/40 px-4 py-1 text-[11px] font-semibold uppercase tracking-widest text-gold-soft">
                    <Gift className="h-3.5 w-3.5" />
                    44 oldal · 28 önismereti gyakorlat & munkalap
                  </span>
                </div>

                {/* Right: Offer Details & Value Stack */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-gold px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-cream shadow">
                      🔥 Visszautasíthatatlan ajánlat · Legnépszerűbb
                    </span>
                    <span className="rounded-full border border-gold-soft/40 bg-cream/10 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-widest text-gold-soft">
                      3 900 Ft azonnali megtakarítás
                    </span>
                  </div>

                  <div>
                    <h2 className="font-display text-3xl leading-tight text-cream sm:text-4xl lg:text-5xl">
                      „Teljes Belső Utazás”{" "}
                      <em className="italic text-gold-soft">2 az 1-ben Csomag</em>
                    </h2>
                    <p className="mt-3 text-sm sm:text-base leading-relaxed text-cream/80">
                      Miért választanál a határaid védelme és a kapcsolati mintáid megértése
                      között, ha a kettő szorosan összefügg? A csomagban a második munkafüzetet{" "}
                      <strong className="text-gold-soft">4 900 Ft helyett mindössze 1 000 Ft-ért</strong>{" "}
                      kapod meg!
                    </p>
                  </div>

                  {/* Value stack list */}
                  <div className="rounded-2xl border border-cream/15 bg-cream/5 p-5 space-y-3 text-xs sm:text-sm">
                    <div className="flex items-start justify-between gap-4 border-b border-cream/10 pb-2.5">
                      <div className="flex items-start gap-2.5">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-soft" />
                        <span>
                          <strong>1. Határok – Önismereti munkafüzet</strong> (14 oldal, 17
                          határterület, példamondatok)
                        </span>
                      </div>
                      <span className="shrink-0 text-cream/60 line-through">4 900 Ft</span>
                    </div>

                    <div className="flex items-start justify-between gap-4 border-b border-cream/10 pb-2.5">
                      <div className="flex items-start gap-2.5">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-soft" />
                        <span>
                          <strong>2. A kapcsolati mintáim nyomában</strong> (30 oldal, 8 fejezet,
                          családi genogram + 11 munkalap)
                        </span>
                      </div>
                      <span className="shrink-0 text-cream/60 line-through">8 900 Ft</span>
                    </div>

                    <div className="flex items-start justify-between gap-4 border-b border-cream/10 pb-2.5">
                      <div className="flex items-start gap-2.5">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-soft" />
                        <span>
                          <strong>+ AJÁNDÉK BÓNUSZ:</strong> 3 oldalas nyomtatható SOS Határtérkép
                          & Önismereti emlékeztető
                        </span>
                      </div>
                      <span className="shrink-0 font-semibold text-gold-soft">AJÁNDÉK</span>
                    </div>

                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-2.5">
                        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-gold-soft" />
                        <span>
                          <strong>14 napos 100% Lelki Nyugalom Garancia</strong> (kérdés nélküli
                          pénzvisszafizetés)
                        </span>
                      </div>
                      <span className="shrink-0 font-semibold text-gold-soft">GARANTÁLT</span>
                    </div>
                  </div>

                  {/* Coupon input & Price box */}
                  <div className="flex flex-col gap-5 rounded-2xl border border-gold/40 bg-cream p-5 text-earth sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-widest text-earth/60">
                        Összérték: <span className="line-through">13 800 Ft</span> helyett
                      </p>
                      <div className="mt-1 flex items-baseline gap-3">
                        {isCouponApplied ? (
                          <>
                            <span className="text-lg text-earth/45 line-through">9 900 Ft</span>
                            <span className="font-display text-3xl sm:text-4xl font-bold text-gold">
                              7 900 Ft
                            </span>
                          </>
                        ) : (
                          <span className="font-display text-3xl sm:text-4xl font-bold text-earth">
                            9 900 Ft
                          </span>
                        )}
                      </div>
                      <div className="mt-2 flex items-center gap-2">
                        <input
                          type="text"
                          value={couponInput}
                          onChange={(e) => setCouponInput(e.target.value)}
                          placeholder="Kuponkód (pl. SOUL2000)"
                          className="w-44 rounded-lg border border-earth/20 bg-linen px-3 py-1.5 text-xs uppercase tracking-wider text-earth placeholder:normal-case placeholder:tracking-normal focus:border-gold focus:outline-none"
                        />
                        {isCouponApplied && (
                          <span className="text-[11px] font-semibold text-gold">
                            ✓ -2 000 Ft levonva!
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col items-stretch sm:items-end gap-2">
                      <a
                        href={checkoutUrl}
                        className="inline-flex items-center justify-center gap-3 rounded-full bg-gold px-7 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-cream shadow-lg transition hover:bg-earth"
                      >
                        <BookOpen className="h-4 w-4" />
                        <span>Kérem a 2 az 1-ben Csomagot</span>
                        <ArrowRight className="h-4 w-4" />
                      </a>
                      <span className="text-center text-[11px] text-earth/60">
                        Azonnali PDF letöltés · Biztonságos Stripe fizetés
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Individual Workbooks Section Heading ── */}
        <section className="px-6 pb-8 text-center">
          <div className="mx-auto max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold">
              Külön-külön is elérhetőek
            </p>
            <h2 className="mt-2 font-display text-3xl text-earth sm:text-4xl">
              Válassz egyetlen <em className="italic text-gold">munkafüzetet</em>
            </h2>
          </div>
        </section>

        {/* ── Workbook Grid ── */}
        <section className="px-6 pb-20 lg:pb-28">
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

          {/* ── 4. Lépcsőfok: VIP Kísért Önismereti Folyamat (Munkafüzetek + Konzultáció) ── */}
          <div className="mx-auto mt-16 max-w-6xl rounded-3xl border border-gold/40 bg-gradient-to-r from-linen via-cream to-linen p-8 shadow-md sm:p-12">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-gold/15 border border-gold/30 px-3.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-earth">
                  <Heart className="h-3.5 w-3.5 text-gold" />
                  <span>Prémium lépcsőfok · Személyes kísérés</span>
                </div>
                <h3 className="font-display text-2xl sm:text-4xl text-earth">
                  Nem szeretnél egyedül végigmenni a kérdéseken?
                </h3>
                <p className="text-sm sm:text-base leading-relaxed text-earth/75">
                  A munkafüzetek kitöltése után (vagy közben) lehetőséged van{" "}
                  <strong>személyesen a töki mongol jurtában vagy online</strong> egyéni
                  konzultációra, ThetaHealing vagy Access Bars folyamatra érkezni hozzám, ahol
                  biztonságos, elfogadó térben dolgozzuk át a felmerült családi és kapcsolati
                  mintáidat.
                </p>
              </div>
              <div className="lg:col-span-4 flex flex-col items-stretch sm:items-center lg:items-end justify-center gap-3">
                <a
                  href="https://app.minup.io/book/soulritual"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-earth px-7 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-cream shadow-md transition hover:bg-gold"
                >
                  <Calendar className="h-4 w-4" />
                  <span>Időpontot foglalok</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
                <Link
                  to="/visszajelzes"
                  className="text-center text-xs font-semibold text-gold hover:text-earth underline underline-offset-4"
                >
                  Még nincs kuponod? Írj véleményt a 2 000 Ft-os kódért →
                </Link>
              </div>
            </div>
          </div>

          {/* Guarantee Strip */}
          <div className="mx-auto mt-12 max-w-4xl rounded-3xl border border-gold/30 bg-linen p-8 text-center sm:p-10">
            <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-gold/15 text-gold">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="font-display text-2xl text-earth">
              14 napos, 100%-os elégedettségi garancia minden munkafüzetre és csomagra
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
