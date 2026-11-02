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
import workbookCover from "@/assets/munkafuzet-hatarok.jpg";
import kezTermeszet from "@/assets/kez-termeszet.jpg";

// ─── Stripe konfiguráció a munkafüzethez ─────────────────────────────────────
const STRIPE_PUBLISHABLE_KEY =
  "pk_live_51TuujmV05iqq8bsGEcHVCXqFKMY0AxcMuwOwl5qe5TvQjDsGHeim19TM3GD0052Ou0iGQVf8ekIiA5Qlue28GEx600agL81W3h";

const WORKBOOK_STRIPE_BUY_BUTTON_ID = "";
const WORKBOOK_STRIPE_PAYMENT_URL = "https://buy.stripe.com/6oU4gCfiqdIT4XQ2LQ48002";
const WORKBOOK_PRICE = "4 900 Ft";
const WORKBOOK_PDF_URL = "/downloads/soul-ritual-hatarok-munkafuzet.pdf";

const boundaryAreas = [
  {
    name: "Fizikai határok",
    quote: "„Most nem szeretnék ölelést.” · „Kérlek, kopogj, mielőtt belépsz.”",
  },
  {
    name: "Érzelmi határok",
    quote: "„Meghallgatlak, de nem tudom helyetted megoldani.”",
  },
  {
    name: "Időbeli határok",
    quote: "„Ma már nem fér bele. Holnap visszatérhetünk rá.”",
  },
  {
    name: "Mentális és intellektuális határok",
    quote: "„Másképp gondolom, és ez rendben van.”",
  },
  {
    name: "Anyagi és tárgyi határok",
    quote: "„Most nem szeretnék kölcsönadni.” · „Kérlek, kérdezz, mielőtt elvennéd.”",
  },
  {
    name: "Intimitási és szexuális határok",
    quote: "A beleegyezés szabad, egyértelmű, folyamatos, és bármikor visszavonható.",
  },
  {
    name: "Digitális határok",
    quote: "„Este kikapcsolom az értesítéseket.”",
  },
  {
    name: "Értékrendi és spirituális határok",
    quote: "„Nem kell ugyanúgy gondolkodnunk.” · „A saját utamat szeretném járni.”",
  },
];

const mirrorPoints = [
  "Gyakran mondasz igent akkor is, amikor legbelül már nemet érzel — és utólag feszültséget, neheztelést vagy kimerültséget élsz meg.",
  "Sokat alkalmazkodsz másokhoz, mert tartasz a konfliktustól, a megbántástól vagy attól, hogy csalódást okozol.",
  "Bűntudatot érzel, amikor saját magadat és a saját szükségleteidet választod.",
  "Szeretnél változtatni a kapcsolati működéseden, de most nem egy többhetes tréninget vagy terápiát keresel, hanem a saját tempódban indulnál el.",
];

const pillars = [
  {
    num: "01",
    icon: Compass,
    title: "Kétirányú szemlélet",
    desc: "Ahogyan fontos felismernünk, amikor mások átlépik a mi határainkat, ugyanilyen fontos észrevennünk azt is, amikor mi lépünk át másokén — akár megszokásból, félelemből vagy túlzott aggodalomból.",
  },
  {
    num: "02",
    icon: Feather,
    title: "Hétköznapi önreflexió",
    desc: "Száraz elmélet helyett 8 konkrét határterületen, segítő táblázatokkal és irányított kérdésekkel segít felismerni a saját testi-érzelmi jelzéseidet és automatikus reakcióidat.",
  },
  {
    num: "03",
    icon: Heart,
    title: "Rugalmas keretek, nem falak",
    desc: "A határok nem büntetések és nem a szeretet hiányának jelei. Nem arra valók, hogy eltávolítsanak másoktól, hanem arra, hogy a kapcsolódásban is megőrizhessük önmagunkat.",
  },
  {
    num: "04",
    icon: BookOpen,
    title: "Önállóan, saját tempóban",
    desc: "Egy nyugodt, őszinte találkozás önmagaddal: nincs jó vagy rossz válasz, nincs időnyomás — otthon, ítélkezés nélkül haladhatsz vele.",
  },
];

const modules = [
  {
    badge: "1. fejezet",
    title: "Határok — A saját szükségleteim felismerése és képviselete",
    desc: "Megnézzük, mit jelentenek a belső és külső keretek, hol ér véget a mi felelősségünk, és hogyan jelezhetjük őszintén és tisztelettel, mire van szükségünk — mielőtt a felgyülemlő feszültségből vagy kimerültségből reagálnánk.",
    items: [
      "A személyes határok főbb területei konkrét, hétköznapi példamondatokkal",
      "Honnan tudhatom, hogy sérülnek a határaim? — Táblázat a testi és érzelmi jelzésekről (összeszoruló gyomor, neheztelés, kimerültség, bűntudat, visszahúzódás)",
      "1. fejezet · Önismereti gyakorlat: 4 elmélyülő kérdés a saját szükségleteid és a heti első apró lépésed felismeréséhez",
    ],
  },
  {
    badge: "2. fejezet",
    title: "Határátlépés — A túlzott kontroll és a másik szabadságának tisztelete",
    desc: "A határaink tisztelete kétirányú. Megvizsgáljuk, hogyan léphetjük át mi mások határait — akár aggodalomból, bizonytalanságból vagy kontrollvágyból —, és hogyan vállalhatunk felelősséget önhibáztatás és szégyen nélkül.",
    items: [
      "Hogyan léphetem át mások határait? — gyakori, kevésbé észrevehető határátlépések a mindennapokban",
      "A túlzott kontroll hétköznapi formái — Táblázat: kontrolláló megnyilvánulások és a tiszteletben tartó alternatívák",
      "2. fejezet · Önismereti gyakorlat: egy közelmúltbeli feszült helyzet átkeretezése felelősségvállalással és tisztelettel",
    ],
  },
  {
    badge: "3. rész · Határtérkép",
    title: "17 határterület a kapcsolatainkban és a mindennapokban",
    desc: "A határok nem csupán a testi érintésről vagy a nemet mondásról szólnak. Ez az önismereti térkép segít észrevenni azt is, amit korábban természetesnek vettünk.",
    items: [
      "17 részletesen kifejtett határterület: a figyelmi, kommunikációs, döntési, családi és generációs határoktól a gondoskodási és segítői határokig",
      "Kevésbé nyilvánvaló határok: információs és önfeltárási határok, valamint határok a konfliktusban és a megbékélésben",
      "Kontroll vagy gondoskodás? — Önellenőrző kérdések, mielőtt közbelépnél, tanácsot adnál vagy mások helyett döntenél",
    ],
  },
];

const workbookFaqs = [
  {
    q: "Milyen formátumban kapom meg a munkafüzetet?",
    a: "Egy 14 oldalas, letisztult, nyomtatható és digitálisan is olvasható PDF munkafüzetként, amelyet a sikeres fizetés után azonnal letölthetsz.",
  },
  {
    q: "Mennyi idő alatt kell feldolgozni?",
    a: "Nincs időkorlát. A munkafüzet örökre a tiéd marad: feldolgozhatod egyetlen nyugodt délután alatt, vagy visszatérhetsz a kérdésekhez hétről hétre, ahogy változnak az élethelyzeteid.",
  },
  {
    q: "Szükséges hozzá előzetes önismereti tapasztalat?",
    a: "Egyáltalán nem. A példamondatok, táblázatok és önismereti kérdések közérthetőek, szelídek, és a mindennapi élethelyzetekből indulnak ki.",
  },
  {
    q: "Helyettesíti a munkafüzet a terápiát?",
    a: "Nem. Ez egy önállóan feldolgozható önismereti és önreflexiós eszköz, amely segít tisztábban látni a saját működésedet és szükségleteidet a hétköznapi kapcsolataidban.",
  },
];

export default function Workbook() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [searchParams] = useSearchParams();
  const isSuccess = searchParams.get("sikeres") === "1";

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

          <a
            href="#vasarlas"
            className="rounded-full bg-earth px-5 py-2.5 text-[11px] font-medium tracking-[0.18em] uppercase text-cream transition hover:bg-gold"
          >
            Megrendelem
          </a>
        </div>
      </header>

      <main>
        {/* ── Sikeres fizetés utáni letöltő sáv (?sikeres=1) ── */}
        {isSuccess && (
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
                A <strong>Határok — Önismereti munkafüzet</strong> készen áll. Kattints az
                alábbi gombra a PDF letöltéséhez (és mentsd el a saját eszközödre):
              </p>
              <a
                href={WORKBOOK_PDF_URL}
                download="Soul-Ritual-Hatarok-Onismereti-Munkafuzet.pdf"
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
                Soul Ritual · Önismereti munkafüzet
              </div>

              <h1 className="mt-6 font-display text-5xl leading-[1.08] text-earth sm:text-6xl lg:text-7xl">
                Határok
              </h1>
              <p className="mt-3 font-display text-2xl italic text-gold sm:text-3xl">
                A saját szükségleteim felismerése és képviselete
              </p>

              <p className="mt-8 max-w-xl text-base leading-relaxed text-earth/80 sm:text-lg">
                Egy nyugodt, őszinte találkozás önmagaddal — azoknak, akik szeretnének{" "}
                <strong>kiállni önmagukért</strong> anélkül, hogy közben elveszítenék a
                másokkal való kapcsolódást.
              </p>

              <div className="mt-6 rounded-2xl border-l-2 border-gold bg-linen/90 px-6 py-4 max-w-xl">
                <p className="text-sm sm:text-base italic leading-relaxed text-earth/85">
                  „A határok nem falak. Olyan rugalmas keretek, amelyek segítenek kapcsolatban
                  maradni önmagunkkal és másokkal.”
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-2.5 text-xs text-earth/75">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-earth/15 bg-white/70 px-3.5 py-1.5">
                  <Check className="h-3.5 w-3.5 text-gold" /> 14 oldalas, letisztult PDF
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-earth/15 bg-white/70 px-3.5 py-1.5">
                  <Check className="h-3.5 w-3.5 text-gold" /> 17 határterület & példamondatok
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-earth/15 bg-white/70 px-3.5 py-1.5">
                  <Check className="h-3.5 w-3.5 text-gold" /> Önismereti gyakorlatok & táblázatok
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
                  Mit tartalmaz?
                </a>
              </div>
            </div>

            {/* Right column: Workbook Cover */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md">
                <div className="absolute -inset-4 rounded-3xl border border-gold/30 bg-gold/5 -rotate-2" />
                <div className="relative overflow-hidden rounded-2xl border border-gold/30 bg-linen shadow-2xl">
                  <img
                    src={workbookCover}
                    alt="Határok — A saját szükségleteim felismerése és képviselete önismereti munkafüzet"
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
              „Jogunk van újragondolni a döntéseinket, meggondolni magunkat, időt kérni, nemet
              mondani, vagy egyszerűen jelezni: Most erre nincs kapacitásom.”
            </p>
          </div>
        </section>

        {/* ── 4 Differentiators Section ── */}
        <section className="bg-cream px-6 py-24 lg:py-32">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-2xl">
              <p className="eyebrow">Szemléletmód</p>
              <h2 className="mt-5 font-display text-4xl leading-tight sm:text-5xl">
                Miben más ez a <em className="italic text-gold">munkafüzet</em>?
              </h2>
              <p className="mt-5 text-base leading-relaxed text-earth/75 sm:text-lg">
                A határhúzás tanulható készség. Nem arról szól, hogy irányítsuk a másikat,
                hanem arról, hogy felelősséget vállaljunk a saját döntéseinkért,
                szükségleteinkért és viselkedésünkért.
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

        {/* ── 8 Boundary Areas Preview ── */}
        <section id="tartalom" className="bg-linen px-6 py-24 lg:py-32">
          <div className="mx-auto max-w-6xl">
            <div className="text-center max-w-2xl mx-auto">
              <p className="eyebrow">A munkafüzet felépítése</p>
              <h2 className="mt-5 font-display text-4xl leading-tight sm:text-5xl">
                Három egymásra épülő <em className="italic text-gold">rész</em>.
              </h2>
              <p className="mt-5 text-earth/70 sm:text-lg">
                Elméleti iránymutatás, gyakorlati táblázatok, 17 területet átfogó
                határtérkép és kitölthető önismereti munkalapok 14 letisztult oldalon.
              </p>
            </div>

            <div className="mt-16 space-y-8 max-w-4xl mx-auto">
              {modules.map((m) => (
                <div
                  key={m.badge}
                  className="rounded-3xl border border-earth/10 bg-cream p-8 sm:p-10 shadow-sm"
                >
                  <span className="inline-block rounded-full bg-gold/15 px-3.5 py-1 text-[11px] font-semibold tracking-widest uppercase text-gold">
                    {m.badge}
                  </span>
                  <h3 className="mt-4 font-display text-2xl sm:text-3xl text-earth">
                    {m.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-earth/75">{m.desc}</p>
                  <ul className="mt-6 space-y-2.5 border-t border-earth/10 pt-5">
                    {m.items.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-sm sm:text-base text-earth/80"
                      >
                        <Layers className="mt-1 h-4 w-4 shrink-0 text-gold" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* 8 Boundary Areas Grid */}
            <div className="mt-20">
              <div className="text-center max-w-2xl mx-auto">
                <p className="eyebrow">Ízelítő a munkafüzetből</p>
                <h3 className="mt-4 font-display text-3xl text-earth sm:text-4xl">
                  A személyes határok <em className="italic text-gold">8 fő területe</em>
                </h3>
                <p className="mt-3 text-sm sm:text-base text-earth/70">
                  A munkafüzetben mind a 8 területet megvizsgáljuk mindkét oldalról: hogyan
                  képviseld a saját határaidat, és hogyan tartsd tiszteletben másokét.
                </p>
              </div>

              <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {boundaryAreas.map((b) => (
                  <div
                    key={b.name}
                    className="rounded-2xl border border-earth/10 bg-cream p-6 flex flex-col justify-between"
                  >
                    <h4 className="font-display text-lg text-earth">{b.name}</h4>
                    <p className="mt-3 text-xs italic leading-relaxed text-earth/65">
                      {b.quote}
                    </p>
                  </div>
                ))}
              </div>
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
                Miért született meg a <em className="italic text-gold">Határok</em> munkafüzet?
              </h2>
              <div className="mt-6 space-y-4 text-base leading-relaxed text-earth/80">
                <p>
                  A csoportos és egyéni folyamatok során újra és újra láttam, mennyire sokan
                  küzdenek azzal, hogy miközben mindenki másra figyelnek, saját magukra már alig
                  marad erejük.
                </p>
                <p>
                  Sokszor azt hisszük, hogy a határhúzás keménységet vagy elzárkózást jelent.
                  Pedig valójában éppen a világos és szelíd határok teszik lehetővé, hogy ne
                  felgyülemlő feszültségből, sértettségből vagy kimerültségből reagáljunk, hanem
                  őszintén és tisztelettel legyünk jelen.
                </p>
                <p>
                  Emlékeztetőül az útra:{" "}
                  <em>
                    „Nem kell minden határomat azonnal megváltoztatnom. Elég, ha ma egyet
                    észreveszek, és teszek érte egy apró lépést.”
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
                  src={workbookCover}
                  alt="Határok Önismereti munkafüzet"
                  className="mx-auto w-64 sm:w-72 rounded-xl shadow-lg border border-gold/25"
                />
              </div>

              <div className="lg:col-span-7">
                <p className="eyebrow">Azonnali digitális kiadás (PDF)</p>
                <h2 className="mt-3 font-display text-3xl sm:text-4xl text-earth">
                  Határok — Önismereti munkafüzet
                </h2>
                <p className="mt-2 text-sm text-earth/65">
                  A saját szükségleteim felismerése és képviselete
                </p>

                <div className="mt-6 flex items-baseline gap-3">
                  <span className="font-display text-4xl text-earth">{WORKBOOK_PRICE}</span>
                  <span className="text-xs uppercase tracking-widest text-earth/50">
                    egyszeri díj · azonnali letöltés
                  </span>
                </div>

                <ul className="mt-6 space-y-3 text-sm text-earth/80">
                  <li className="flex items-center gap-3">
                    <Check className="h-4 w-4 shrink-0 text-gold" />
                    14 oldalas önismereti munkafüzet (Határok · Határátlépés · Határtérkép)
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-4 w-4 shrink-0 text-gold" />
                    17 határterület példamondatokkal, segítő táblázatokkal és munkalapokkal
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-4 w-4 shrink-0 text-gold" />
                    Letölthető és otthon is nyomtatható PDF formátum
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
                  ) : (
                    <a
                      href={WORKBOOK_STRIPE_PAYMENT_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full sm:w-auto items-center justify-center gap-3 rounded-full bg-earth px-9 py-4 text-xs font-semibold tracking-[0.22em] uppercase text-cream shadow-md transition hover:bg-gold"
                    >
                      <span>Megvásárlom a munkafüzetet</span>
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  )}
                </div>

                <p className="mt-4 flex items-center gap-2 text-xs text-earth/55">
                  <ShieldCheck className="h-4 w-4 text-gold" />
                  Fizetés után azonnal letölthető PDF formátumban
                </p>
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
          <span>© {new Date().getFullYear()} Soul Ritual · Erdélyi Izabella · Minden jog fenntartva</span>
          <Link to="/" className="text-gold-soft hover:text-cream uppercase tracking-widest">
            ← Vissza a Soul Ritual főoldalára
          </Link>
        </div>
      </footer>
    </div>
  );
}
