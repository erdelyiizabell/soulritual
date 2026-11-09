import { createElement, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  Compass,
  Download,
  Feather,
  Heart,
  Layers,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import logoUrl from "@/assets/soul-ritual-logo-transparent.png";
import relationshipCover from "@/assets/munkafuzet-kapcsolati-mintaim.jpg";
import kezTermeszet from "@/assets/kez-termeszet.jpg";

// ─── Stripe konfiguráció ──────────────────────────────────────────────────────
const STRIPE_PUBLISHABLE_KEY =
  "pk_live_51TuujmV05iqq8bsGEcHVCXqFKMY0AxcMuwOwl5qe5TvQjDsGHeim19TM3GD0052Ou0iGQVf8ekIiA5Qlue28GEx600agL81W3h";

const WORKBOOK_STRIPE_BUY_BUTTON_ID = "";
const WORKBOOK_STRIPE_PAYMENT_URL = "https://buy.stripe.com/00w4gCdai9sD3TM2LQ48003";
const WORKBOOK_PRICE = "8 900 Ft";
const WORKBOOK_PDF_URL = "/downloads/sr-kapcsolati-mintaim-4c8d1e9a2b.pdf";
const WORKBOOK_SECRET_KEY = "sr4m9p2v7w1z";

const mirrorPoints = [
  "Sokszor érzed úgy, hogy a párkapcsolatodban nem egyetlen problémán vitatkoztok, hanem újra és újra ugyanabba a fájdalmas körbe kerültök.",
  "Szeretnéd megérteni, milyen családi szabályokat, kimondott vagy kimondatlan mondatokat és szerepeket hoztál magaddal otthonról.",
  "Gyakran veszel át túl sok felelősséget a másik érzéseiért, vagy éppen visszahúzódsz és elhallgatsz, amikor feszültség támad.",
  "Nem hibást szeretnél keresni — sem a szüleidben, sem a partneredben, sem önmagadban —, hanem tisztábban látni és szabadabban választani.",
];

const pillars = [
  {
    num: "01",
    icon: Compass,
    title: "Tények, értelmezések és érzések",
    desc: "Segít szétválasztani azt, ami valójában történt (tény), attól, amit gondoltál róla (értelmezés), és attól, ami benned megszületett (érzés és szükséglet).",
  },
  {
    num: "02",
    icon: Feather,
    title: "Családi térkép (Genogram)",
    desc: "Több generáción átívelve térképezheted fel a családi közelségeket, távolságokat, szerepeket és ismétlődéseket — minősítés és hibáztatás nélkül.",
  },
  {
    num: "03",
    icon: Heart,
    title: "Párkapcsolati körök és reakciólánc",
    desc: "Megláthatod, hogyan épül fel egy visszatérő konfliktuskör köztetek, mi a védekezésed mögötti valódi szükséglet, és hol tudod megszakítani a kört.",
  },
  {
    num: "04",
    icon: BookOpen,
    title: "Szakmai alapok, szelíd önreflexió",
    desc: "A családi rendszerszemlélet (Bowen, McGoldrick) és az érzelemközpontú párterápia (Sue Johnson) fogalmain nyugszik, mégis közérthető, önállóan végezhető formában.",
  },
];

const chapters = [
  {
    badge: "1. fejezet",
    title: "Hol tartok most a kapcsolatomban?",
    desc: "Pillanatfelvétel a jelenlegi kapcsolatodról a tények, értelmezések és az érzelmi válaszkészség szétválasztásával.",
    worksheets: ["Kapcsolati pillanatfelvétel (Ami működik · Ami nehéz · Amire vágyom)"],
  },
  {
    badge: "2. fejezet",
    title: "A családi kapcsolati térképem",
    desc: "Több generációs családi térkép (genogram) a közelségek, távolságok, konfliktusok és generációs ismétlődések felismeréséhez.",
    worksheets: ["Családi térképem / Genogram", "Családi minták és ismétlődések"],
  },
  {
    badge: "3. fejezet",
    title: "Anyám és apám kapcsolata",
    desc: "A gyerekkorban látott kapcsolati forgatókönyvek, a közvetítő vagy békítő szerepek (trianguláció) megértése és elengedése.",
    worksheets: ["Egy emlék két nézőpontból (Akkor ezt éreztem · Ma így látom)"],
  },
  {
    badge: "4. fejezet",
    title: "Családi szabályok és örökségek",
    desc: "Kimondott és kimondatlan családi elvárások, láthatatlan lojalitások feltérképezése: mi az, amit értékként továbbviszel, és mi az, amit újraírsz?",
    worksheets: ["Családi szabályok újraírása", "A családi mondataim nyomában"],
  },
  {
    badge: "5. fejezet",
    title: "Saját párkapcsolati mintáim",
    desc: "Az automatikus reakciók, a mögöttük álló alapvető szükségletek és a választott védekező stratégiák megkülönböztetése.",
    worksheets: ["A saját reakcióláncom (Kiváltó esemény → Testérzet → Gondolat → Érzés → Reakció)"],
  },
  {
    badge: "6. fejezet",
    title: "A kapcsolati kör felismerése",
    desc: "A visszatérő negatív interakciós ciklus feltérképezése és a feszültségcsökkentés (deeszkaláció) lehetséges pontjai.",
    worksheets: ["A konfliktuskör térképe — Hol tudom megszakítani a kört?"],
  },
  {
    badge: "7. fejezet",
    title: "Mi az enyém, mi a másiké, és mi a közös?",
    desc: "Kapcsolódás és önállóság egyensúlya (differenciálás): a saját felelősség felvállalása és a másik felelősségének visszaadása önfeladás nélkül.",
    worksheets: ["Felelősségi körök (Az enyém · A másiké · A közös)", "Feladatok és hozzájárulások a kapcsolatban"],
  },
  {
    badge: "8. fejezet",
    title: "Mit szeretnék másképp továbbvinni?",
    desc: "A felismerések átültetése apró, értékalapú hétköznapi lépésekbe — a múlt megtagadása nélkül, saját tempóban.",
    worksheets: ["Hét napos kísérlet", "Záró összegzés (Három felismerés & Egy új választás)"],
  },
];

const workbookFaqs = [
  {
    q: "Milyen formátumban és terjedelemben kapom meg a munkafüzetet?",
    a: "Egy 30 oldalas, gazdagon felépített, nyomtatható és digitálisan is használható PDF munkafüzetként, amely 8 fejezetet, fogalomtárat, strukturált munkalapokat és jegyzetoldalakat tartalmaz.",
  },
  {
    q: "Egyedül vagy párkapcsolatban érdemes kitölteni?",
    a: "Mindkettőre alkalmas. A munkafüzet egyéni önreflexióra épül, így akkor is hatalmas felismeréseket ad, ha egyedül töltöd ki, és akkor is, ha egy meglévő párkapcsolat dinamikáit szeretnéd tisztábban látni.",
  },
  {
    q: "Helyettesíti a munkafüzet a pszichoterápiát vagy párterápiát?",
    a: "Nem. A munkafüzet önismereti célú, nem diagnosztizál és nem helyettesíti a szakmai segítséget. A gyakorlatokat a saját tempódban végezheted, és bármikor tarthatsz szünetet.",
  },
  {
    q: "Hogyan működik a pénzvisszafizetési garancia?",
    a: "Ha a vásárlástól számított 14 napon belül úgy érzed, hogy a munkafüzet nem nyújtotta számodra azt, amire számítottál, írj egy e-mailt az info@soulritual.hu címre, és kérdés nélkül visszatérítem a teljes vételárat.",
  },
];

export default function RelationshipWorkbook() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [searchParams] = useSearchParams();
  const [unlocked, setUnlocked] = useState(false);
  const [couponInput, setCouponInput] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState("");

  function handleApplyCoupon(e: React.FormEvent) {
    e.preventDefault();
    if (couponInput.trim().toUpperCase() === "SOUL2000") {
      setCouponApplied(true);
      setCouponError("");
    } else {
      setCouponApplied(false);
      setCouponError("Érvénytelen kuponkód.");
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    const key = searchParams.get("k");
    const sessionId = searchParams.get("session_id") ?? "";
    if (key === WORKBOOK_SECRET_KEY && sessionId.startsWith("cs_") && sessionId.length > 20) {
      setUnlocked(true);
      window.history.replaceState({}, "", "/kapcsolati-mintaim");
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-cream text-earth">
      {/* ── Header ── */}
      <header className="sticky top-0 z-40 border-b border-earth/10 bg-cream/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link
            to="/webshop"
            className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.18em] uppercase text-earth/75 transition hover:text-gold"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Vissza a Webshopba</span>
          </Link>

          <Link to="/" className="flex items-center">
            <img src={logoUrl} alt="Soul Ritual" className="h-12 sm:h-14 w-auto" />
          </Link>

          <a
            href="#vasarlas"
            className="rounded-full bg-earth px-5 py-2.5 text-[11px] font-medium tracking-[0.18em] uppercase text-cream transition hover:bg-gold"
          >
            Megrendelem
          </a>
        </div>
      </header>

      <main>
        {/* ── Sikeres fizetés utáni védett letöltő sáv ── */}
        {unlocked && (
          <section className="bg-earth px-6 py-12 text-cream border-b border-gold/30">
            <div className="mx-auto max-w-3xl rounded-3xl border border-gold/40 bg-cream/10 p-8 text-center">
              <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-gold/25 text-gold-soft">
                <Sparkles className="h-7 w-7" />
              </div>
              <p className="eyebrow text-gold-soft">Sikeres vásárlás</p>
              <h2 className="mt-2 font-display text-3xl sm:text-4xl text-cream">
                Köszönöm a bizalmadat! ✦
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-sm sm:text-base leading-relaxed text-cream/85">
                <strong>A kapcsolati mintáim nyomában</strong> önismereti munkafüzet készen
                áll. Kattints az alábbi gombra a PDF letöltéséhez (és mentsd el a saját
                eszközödre):
              </p>
              <a
                href={WORKBOOK_PDF_URL}
                download="Soul-Ritual-A-kapcsolati-mintaim-nyomaban-Munkafuzet.pdf"
                className="mt-6 inline-flex items-center gap-3 rounded-full bg-gold px-8 py-4 text-xs font-semibold tracking-[0.22em] uppercase text-cream shadow-lg transition hover:bg-cream hover:text-earth"
              >
                <Download className="h-4 w-4" />
                <span>Munkafüzet letöltése (PDF)</span>
              </a>
            </div>
          </section>
        )}

        {/* ── Hero Section ── */}
        <section className="relative overflow-hidden bg-gradient-to-b from-linen via-cream to-cream px-6 pt-14 pb-24 lg:pt-20 lg:pb-32">
          <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-12 lg:gap-16">
            {/* Left column */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-[11px] font-semibold tracking-[0.22em] uppercase text-earth">
                <Sparkles className="h-3.5 w-3.5 text-gold" />
                Soul Ritual · Vezetett önismereti munkafüzet
              </div>

              <h1 className="mt-6 font-display text-4xl leading-[1.1] text-earth sm:text-6xl lg:text-[4rem]">
                A kapcsolati mintáim nyomában
              </h1>
              <p className="mt-3 font-display text-xl italic text-gold sm:text-2xl">
                Családi örökség, párkapcsolati dinamika és önismereti feltárás
              </p>

              <p className="mt-8 max-w-xl text-base leading-relaxed text-earth/80 sm:text-lg">
                Egy 30 oldalas, mély és strukturált önismereti munkafüzet a családi örökségek,
                hozzuk-visszük mondatok és ismétlődő párkapcsolati körök megértéséhez — hogy a
                régi, automatikus reakciók helyett <strong>szabadabban választhass</strong>.
              </p>

              <div className="mt-6 rounded-2xl border-l-2 border-gold bg-linen/90 px-6 py-4 max-w-xl">
                <p className="font-display text-lg italic leading-relaxed text-earth/90">
                  „Lassíts. Figyelj. Értsd meg. Válassz újra.”
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-2.5 text-xs text-earth/75">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-earth/15 bg-white/70 px-3.5 py-1.5">
                  <Check className="h-3.5 w-3.5 text-gold" /> 30 oldalas, vezetett PDF
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-earth/15 bg-white/70 px-3.5 py-1.5">
                  <Check className="h-3.5 w-3.5 text-gold" /> 8 fejezet + kitölthető munkalapok
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold/10 px-3.5 py-1.5 font-medium text-earth">
                  <ShieldCheck className="h-3.5 w-3.5 text-gold" /> 100% pénzvisszafizetési garancia
                </span>
              </div>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                <a
                  href="#vasarlas"
                  className="inline-flex items-center justify-center gap-3 rounded-full bg-earth px-8 py-4 text-xs font-semibold tracking-[0.22em] uppercase text-cream shadow-lg transition hover:bg-gold"
                >
                  <span>Szeretném a munkafüzetet</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#tartalom"
                  className="inline-flex items-center justify-center rounded-full border border-earth/25 px-7 py-4 text-xs font-medium tracking-[0.2em] uppercase text-earth/80 transition hover:border-gold hover:text-earth"
                >
                  A 8 fejezet tartalma
                </a>
              </div>
            </div>

            {/* Right column: Workbook Cover */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md">
                <div className="absolute -inset-4 rounded-3xl border border-gold/30 bg-gold/5 -rotate-2" />
                <div className="relative overflow-hidden rounded-2xl border border-gold/30 bg-linen shadow-2xl">
                  <img
                    src={relationshipCover}
                    alt="A kapcsolati mintáim nyomában — Vezetett önismereti munkafüzet"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Mirror / Target Audience Section ── */}
        <section className="bg-earth px-6 py-24 text-cream lg:py-32">
          <div className="mx-auto max-w-5xl">
            <div className="max-w-2xl">
              <p className="eyebrow text-gold-soft">Magadra ismersz?</p>
              <h2 className="mt-5 font-display text-3xl leading-tight sm:text-5xl">
                Neked szól ez a munkafüzet, <em className="italic text-gold-soft">ha…</em>
              </h2>
            </div>

            <div className="mt-14 grid gap-6 sm:grid-cols-2">
              {mirrorPoints.map((pt, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 rounded-2xl border border-cream/15 bg-cream/5 p-6 sm:p-8"
                >
                  <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gold/25 text-gold-soft">
                    <Check className="h-4 w-4" />
                  </span>
                  <p className="text-base leading-relaxed text-cream/90">{pt}</p>
                </div>
              ))}
            </div>

            <p className="mt-12 text-center font-display text-xl italic text-gold-soft sm:text-2xl">
              „Egy kapcsolat megértése nem azzal kezdődik, hogy eldöntjük, ki a hibás, hanem
              azzal, hogy kíváncsian megfigyeljük, mi történik köztünk.”
            </p>
          </div>
        </section>

        {/* ── 4 Differentiators Section ── */}
        <section className="bg-cream px-6 py-24 lg:py-32">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-2xl">
              <p className="eyebrow">Módszertan & Szemlélet</p>
              <h2 className="mt-5 font-display text-4xl leading-tight sm:text-5xl">
                Mit ad neked ez a <em className="italic text-gold">folyamat</em>?
              </h2>
              <p className="mt-5 text-base leading-relaxed text-earth/75 sm:text-lg">
                A családi múlt nem egyetlen módon határozza meg a jelenedet. A „minta” nem
                ítélet: amint láthatóvá válik, megjelenik benne a választás szabadsága is.
              </p>
            </div>

            <div className="mt-16 grid gap-8 sm:grid-cols-2">
              {pillars.map(({ num, icon: Icon, title, desc }) => (
                <div
                  key={num}
                  className="group rounded-3xl border border-earth/10 bg-linen p-8 lg:p-10 transition hover:border-gold/40 hover:bg-cream hover:shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-display text-3xl italic text-gold">{num}</span>
                    <Icon className="h-7 w-7 text-gold" strokeWidth={1.25} />
                  </div>
                  <h3 className="mt-6 font-display text-2xl text-earth">{title}</h3>
                  <p className="mt-3 text-sm sm:text-base leading-relaxed text-earth/70">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 8 Chapters Section ── */}
        <section id="tartalom" className="bg-linen px-6 py-24 lg:py-32">
          <div className="mx-auto max-w-6xl">
            <div className="text-center max-w-2xl mx-auto">
              <p className="eyebrow">A munkafüzet felépítése</p>
              <h2 className="mt-5 font-display text-4xl leading-tight sm:text-5xl">
                Nyolc egymásra épülő <em className="italic text-gold">fejezet</em>.
              </h2>
              <p className="mt-5 text-earth/70 sm:text-lg">
                Minden fejezetben érthető elméleti bevezetőt, önreflexiós kérdéseket,
                fogalomtárat és vizuális, kitölthető munkalapokat találsz.
              </p>
            </div>

            <div className="mt-16 grid gap-6 md:grid-cols-2">
              {chapters.map((ch) => (
                <div
                  key={ch.badge}
                  className="flex flex-col justify-between rounded-3xl border border-earth/10 bg-cream p-8 shadow-sm"
                >
                  <div>
                    <span className="inline-block rounded-full bg-gold/15 px-3.5 py-1 text-[11px] font-semibold tracking-widest uppercase text-gold">
                      {ch.badge}
                    </span>
                    <h3 className="mt-4 font-display text-2xl text-earth">{ch.title}</h3>
                    <p className="mt-3 text-sm sm:text-base leading-relaxed text-earth/75">
                      {ch.desc}
                    </p>
                  </div>
                  <div className="mt-6 border-t border-earth/10 pt-4 space-y-2">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-earth/50">
                      Munkalapok a fejezetben:
                    </p>
                    {ch.worksheets.map((ws, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 text-xs sm:text-sm font-medium text-earth/85"
                      >
                        <Layers className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                        <span>{ws}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Author Note ── */}
        <section className="bg-cream px-6 py-24 lg:py-32">
          <div className="mx-auto grid max-w-5xl items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <img
                src={kezTermeszet}
                alt="Erdélyi Izabella — Soul Ritual"
                className="aspect-[4/5] w-full rounded-2xl object-cover shadow-md"
              />
            </div>
            <div className="lg:col-span-7">
              <p className="eyebrow">A szerzőtől</p>
              <h2 className="mt-4 font-display text-3xl sm:text-4xl text-earth">
                A kapcsolati örökség újraírása <em className="italic text-gold">nem a múlt megtagadása</em>.
              </h2>
              <div className="mt-6 space-y-4 text-base leading-relaxed text-earth/80">
                <p>
                  Megőrizheted a családod értékeit, miközben új módon fejezed ki őket. A
                  gondoskodás lehet határtartó; a hűség lehet őszinte; a konfliktus lehet
                  tiszteletteljes; az önállóság együtt járhat intimitással.
                </p>
                <p>
                  Ebben a munkafüzetben lépésről lépésre nézhetsz rá arra, milyen történeteket,
                  mondatokat és szerepeket hoztál magaddal — és arra is, hogy mi az, ami a
                  kapcsolatodban a te részed, mi a másiké, és mi a közös.
                </p>
                <p>
                  <em>
                    „A felismerés nem követel azonnali megoldást. Válassz egyetlen apró lépést,
                    amelyet biztonságosan és a saját tempódban gyakorolhatsz.”
                  </em>
                </p>
              </div>
              <p className="mt-6 font-display text-lg italic text-gold">— Erdélyi Izabella</p>
            </div>
          </div>
        </section>

        {/* ── Purchase / Checkout Section ── */}
        <section id="vasarlas" className="bg-linen px-6 py-24 lg:py-32">
          <div className="mx-auto max-w-4xl rounded-3xl border border-gold/35 bg-cream p-8 shadow-xl sm:p-12 lg:p-16">
            <div className="grid items-center gap-10 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <img
                  src={relationshipCover}
                  alt="A kapcsolati mintáim nyomában munkafüzet"
                  className="mx-auto w-64 sm:w-72 rounded-xl shadow-lg border border-gold/25"
                />
              </div>

              <div className="lg:col-span-7">
                <p className="eyebrow">Azonnali digitális kiadás (PDF)</p>
                <h2 className="mt-3 font-display text-3xl sm:text-4xl text-earth">
                  A kapcsolati mintáim nyomában
                </h2>
                <p className="mt-2 text-sm text-earth/65">
                  Családi örökség, párkapcsolati dinamika és önismereti feltárás
                </p>

                <div className="mt-6 flex items-baseline gap-3">
                  {couponApplied ? (
                    <>
                      <span className="font-display text-2xl line-through text-earth/40">
                        {WORKBOOK_PRICE}
                      </span>
                      <span className="font-display text-4xl text-gold font-semibold">
                        6 900 Ft
                      </span>
                      <span className="rounded-full bg-gold/15 px-3 py-1 text-[11px] font-semibold text-earth">
                        −2 000 Ft kupon
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="font-display text-4xl text-earth">{WORKBOOK_PRICE}</span>
                      <span className="text-xs uppercase tracking-widest text-earth/50">
                        egyszeri díj · azonnali letöltés
                      </span>
                    </>
                  )}
                </div>

                {/* Kuponkód beváltó mező */}
                <form onSubmit={handleApplyCoupon} className="mt-5 max-w-sm">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => {
                        setCouponInput(e.target.value);
                        setCouponError("");
                      }}
                      placeholder="Kuponkód megadása"
                      className="w-full rounded-xl border border-earth/20 bg-white px-4 py-2.5 text-xs uppercase tracking-wider text-earth placeholder:normal-case placeholder:tracking-normal placeholder:text-earth/40 focus:border-gold focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="shrink-0 rounded-xl border border-gold/50 bg-gold/15 px-4 py-2.5 text-xs font-semibold tracking-wider uppercase text-earth transition hover:bg-gold hover:text-cream cursor-pointer"
                    >
                      Beváltás
                    </button>
                  </div>
                  {couponApplied && (
                    <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-gold">
                      <Check className="h-3.5 w-3.5" /> A 2 000 Ft-os kedvezményt érvényesítettük!
                    </p>
                  )}
                  {couponError && (
                    <p className="mt-1.5 text-xs text-destructive">{couponError}</p>
                  )}
                </form>

                <ul className="mt-6 space-y-3 text-sm text-earth/80">
                  <li className="flex items-center gap-3">
                    <Check className="h-4 w-4 shrink-0 text-gold" />
                    30 oldalas vezetett önismereti munkafüzet (8 fejezet + fogalomtár)
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-4 w-4 shrink-0 text-gold" />
                    11 strukturált munkalap (Genogram, Reakciólánc, Konfliktuskör, Felelősségi körök)
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-4 w-4 shrink-0 text-gold" />
                    Letölthető és otthon is nyomtatható PDF formátum
                  </li>
                  <li className="flex items-center gap-3 font-medium text-earth">
                    <ShieldCheck className="h-4 w-4 shrink-0 text-gold" />
                    14 napos, 100%-os pénzvisszafizetési garancia
                  </li>
                </ul>

                <div className="mt-8">
                  {WORKBOOK_STRIPE_BUY_BUTTON_ID ? (
                    <div className="flex justify-start">
                      {createElement("stripe-buy-button", {
                        "buy-button-id": WORKBOOK_STRIPE_BUY_BUTTON_ID,
                        "publishable-key": STRIPE_PUBLISHABLE_KEY,
                      })}
                    </div>
                  ) : WORKBOOK_STRIPE_PAYMENT_URL ? (
                    <a
                      href={
                        couponApplied
                          ? `${WORKBOOK_STRIPE_PAYMENT_URL}?prefilled_promo_code=SOUL2000`
                          : WORKBOOK_STRIPE_PAYMENT_URL
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full sm:w-auto items-center justify-center gap-3 rounded-full bg-earth px-9 py-4 text-xs font-semibold tracking-[0.22em] uppercase text-cream shadow-md transition hover:bg-gold"
                    >
                      <span>
                        {couponApplied
                          ? "Megvásárlom kedvezménnyel (6 900 Ft)"
                          : "Megvásárlom a munkafüzetet"}
                      </span>
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  ) : (
                    <a
                      href="mailto:info@soulritual.hu?subject=A%20kapcsolati%20mint%C3%A1im%20nyom%C3%A1ban%20munkaf%C3%BCzet%20megrendel%C3%A9s"
                      className="inline-flex w-full sm:w-auto items-center justify-center gap-3 rounded-full bg-earth px-9 py-4 text-xs font-semibold tracking-[0.22em] uppercase text-cream shadow-md transition hover:bg-gold"
                    >
                      <span>Megvásárlom a munkafüzetet</span>
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  )}
                </div>

                <p className="mt-4 flex items-center gap-2 text-xs text-earth/55">
                  <ShieldCheck className="h-4 w-4 text-gold" />
                  Fizetés után azonnal letölthető · Kockázatmentes vásárlás
                </p>

                {/* ── 2 az 1-ben Csomagajánlat ── */}
                <div className="mt-6 rounded-2xl border border-gold/45 bg-gold/10 p-4 text-left">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">
                    ✦ 2 az 1-ben Csomagajánlat (+1 000 Ft)
                  </p>
                  <p className="mt-1 text-xs sm:text-sm leading-relaxed text-earth/85">
                    Mindössze <strong>+1 000 Ft-ért</strong> megkapod mellé a{" "}
                    <strong>Határok (14 oldal, 4 900 Ft)</strong> munkafüzetet is! Vidd el
                    mindkettőt <span className="line-through text-earth/50">13 800 Ft</span> helyett{" "}
                    <strong>9 900 Ft-ért</strong> (kuponnal csak <strong>7 900 Ft</strong>)!
                  </p>
                  <Link
                    to="/webshop#csomagajanlat"
                    className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-earth underline decoration-gold underline-offset-4 hover:text-gold"
                  >
                    <span>Átváltok a 2 az 1-ben Csomagra</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* ── Pénzvisszafizetési garancia blokk ── */}
            <div className="mt-10 border-t border-gold/25 pt-8">
              <div className="flex flex-col items-center gap-5 rounded-2xl border border-gold/30 bg-linen/70 p-6 text-center sm:flex-row sm:text-left">
                <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-gold/15 text-gold">
                  <ShieldCheck className="h-7 w-7" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-display text-xl text-earth">
                    100%-os elégedettségi és pénzvisszafizetési garancia
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-earth/75">
                    Szeretném, ha teljesen nyugodt szívvel vágnál bele. Ha a vásárlástól
                    számított 14 napon belül úgy érzed, hogy a munkafüzet nem adott neked
                    valódi értéket, csak írj egy e-mailt az{" "}
                    <a
                      href="mailto:info@soulritual.hu"
                      className="font-medium text-earth underline decoration-gold underline-offset-2"
                    >
                      info@soulritual.hu
                    </a>{" "}
                    címre, és kérdés nélkül visszautalom a teljes összeget.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ Section ── */}
        <section className="bg-cream px-6 py-24 lg:py-32">
          <div className="mx-auto max-w-3xl">
            <div className="text-center">
              <p className="eyebrow">Gyakori kérdések</p>
              <h2 className="mt-4 font-display text-3xl sm:text-4xl">
                Kérdésed van a <em className="italic text-gold">munkafüzetről</em>?
              </h2>
            </div>

            <div className="mt-12 space-y-px bg-border">
              {workbookFaqs.map((f, i) => (
                <div key={f.q} className="bg-cream">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="flex w-full items-center justify-between gap-6 py-5 text-left cursor-pointer"
                  >
                    <span className="text-base sm:text-lg text-earth">{f.q}</span>
                    <span
                      className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border border-earth/30 text-earth transition ${
                        openFaq === i ? "rotate-45 border-gold text-gold" : ""
                      }`}
                    >
                      +
                    </span>
                  </button>
                  {openFaq === i && (
                    <p className="pb-6 pr-12 text-sm sm:text-base leading-relaxed text-earth/70">
                      {f.a}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="bg-earth px-6 py-12 text-center text-xs text-cream/60">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
          <span>
            © {new Date().getFullYear()} Soul Ritual · Erdélyi Izabella · Minden jog fenntartva
          </span>
          <Link to="/webshop" className="text-gold-soft hover:text-cream uppercase tracking-widest">
            ← Vissza a Soul Ritual Webshopba
          </Link>
        </div>
      </footer>
    </div>
  );
}

