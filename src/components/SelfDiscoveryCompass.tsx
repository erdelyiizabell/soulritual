import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  Check,
  Compass,
  Download,
  RotateCcw,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

interface Question {
  id: number;
  question: string;
  subtitle: string;
  options: {
    id: "boundaries" | "patterns" | "both";
    label: string;
    hint: string;
  }[];
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    question:
      "Mi történik benned leggyakrabban, amikor valaki kér tőled valamit, amihez valójában nincs erőd vagy időd?",
    subtitle: "1. kérdés a 3-ból · Energia és határhúzás",
    options: [
      {
        id: "boundaries",
        label: "Igent mondok, hogy ne okozzak csalódást — de utána feszült és kimerült leszek.",
        hint: "Saját szükségletek háttérbe szorítása",
      },
      {
        id: "patterns",
        label: "Automatikusan átveszem a felelősséget, mert otthon is azt tanultam, hogy „előbb mások, aztán én”.",
        hint: "Családból hozott szerep és minta",
      },
      {
        id: "both",
        label: "Sokáig tűrök és alkalmazkodom, majd egyszer csak robbanok vagy teljesen visszahúzódom.",
        hint: "Határsérülés + ismétlődő konfliktuskör",
      },
    ],
  },
  {
    id: 2,
    question: "Melyik mondat írja le leginkább a jelenlegi kapcsolati élményedet?",
    subtitle: "2. kérdés a 3-ból · Kapcsolati dinamika",
    options: [
      {
        id: "boundaries",
        label: "Sokszor érzem úgy, hogy bűntudatom van, amikor végre magamat választom.",
        hint: "Érzelmi és időbeli határok védelme",
      },
      {
        id: "patterns",
        label: "Újra és újra ugyanazokat a fájdalmas vitákat és köröket futjuk le a párommal vagy a családommal.",
        hint: "Ismétlődő párkapcsolati reakciólánc",
      },
      {
        id: "both",
        label: "Szeretném végre letenni a szüleimtől hozott kimondatlan szabályokat, és bűntudat nélkül nemet mondani.",
        hint: "Teljes belső újrarendeződés",
      },
    ],
  },
  {
    id: 3,
    question: "Milyen első lépés adná most neked a legtöbb biztonságot?",
    subtitle: "3. kérdés a 3-ból · A te saját tempód",
    options: [
      {
        id: "boundaries",
        label: "Konkrét, hétköznapi mondatokat és kapaszkodókat szeretnék, amikkel már holnap kiállhatok magamért.",
        hint: "Gyakorlati határtérkép",
      },
      {
        id: "patterns",
        label: "Mélyebben szeretném feltárni a családi térképemet (genogramomat) és a triggereimet.",
        hint: "Vezetett, 8 fejezetes mélyfúrás",
      },
      {
        id: "both",
        label: "Mindkettőt szeretném: megérteni a hozott mintáimat ÉS megtanulni tisztán meghúzni a határaimat.",
        hint: "Komplex önismereti folyamat",
      },
    ],
  },
];

export default function SelfDiscoveryCompass() {
  const [step, setStep] = useState<number>(0);
  const [answers, setAnswers] = useState<("boundaries" | "patterns" | "both")[]>([]);

  const handleSelect = (choice: "boundaries" | "patterns" | "both") => {
    const next = [...answers, choice];
    setAnswers(next);
    setStep(step + 1);
  };

  const handleReset = () => {
    setAnswers([]);
    setStep(0);
  };

  const isFinished = step >= QUESTIONS.length;

  const getDiagnosis = () => {
    const counts = { boundaries: 0, patterns: 0, both: 0 };
    answers.forEach((a) => {
      counts[a] += 1;
    });

    if (counts.both >= 1 || (counts.boundaries >= 1 && counts.patterns >= 1)) {
      return {
        badge: "Személyre szabott eredmény · Komplex fókusz",
        title: "A határaid és a hozott kapcsolati mintáid szorosan összekapcsolódnak",
        description:
          "A válaszaid alapján nálad a nehéz nemet mondás mögött mélyebb, otthonról hozott családi szerepek és ismétlődő kapcsolati körök állnak. Ha csak a felszínen próbálsz határt húzni, a bűntudat visszahúz — ezért neked a két terület együttes feldolgozása hozza a legfelszabadítóbb áttörést.",
        primaryFocus: "Teljes Belső Utazás 2 az 1-ben Csomag (Határok + Kapcsolati mintáim)",
      };
    }

    if (counts.boundaries >= 2) {
      return {
        badge: "Személyre szabott eredmény · Határok fókusz",
        title: "A legtöbb energiád most az elmosódott határaidnál szivárog el",
        description:
          "Túl sokat tartasz meg magadban, és gyakran előbb gondolsz mások nyugalmára, mint a saját belső békédre. A 17 határterület megismerése és a bűntudat nélküli, szelíd példamondatok azonnali megkönnyebbülést fognak adni a hétköznapokban.",
        primaryFocus: "Határok munkafüzet (vagy a 2 az 1-ben Teljes Önismereti Csomag)",
      };
    }

    return {
      badge: "Személyre szabott eredmény · Kapcsolati minták fókusz",
      title: "Az ismétlődő érzelmi körök mögött a hozott családi térképed dolgozik",
      description:
        "Amikor egy vitában hirtelen túl erős fájdalmat, dühöt vagy bezárkózást érzel, valójában egy régi, otthonról hozott mondat vagy seb szólal meg. A családi genogram és a konfliktuskör-térkép segít megszakítani ezt az öröklött láncolatot.",
      primaryFocus: "A kapcsolati mintáim nyomában (vagy a 2 az 1-ben Teljes Önismereti Csomag)",
    };
  };

  const currentQ = QUESTIONS[step];
  const diagnosis = isFinished ? getDiagnosis() : null;

  return (
    <section
      id="iranytu"
      className="relative overflow-hidden bg-gradient-to-b from-linen via-cream to-linen px-6 py-24 lg:py-32"
    >
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center" data-reveal>
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-[11px] font-semibold tracking-[0.22em] uppercase text-earth">
            <Compass className="h-3.5 w-3.5 text-gold" />
            <span>Interaktív Önismereti Iránytű · 1 perc</span>
          </div>
          <h2 className="mt-5 font-display text-3xl leading-tight text-earth sm:text-5xl">
            Hol szivárog most a legtöbb <em className="italic text-gold">belső energiád?</em>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-earth/75 sm:text-lg">
            Válaszolj 3 rövid kérdésre, és megmutatom, melyik önismereti lépcsőfok adja most neked
            a legnagyobb támogatást.
          </p>
        </div>

        {/* Quiz Card */}
        <div
          className="mt-12 overflow-hidden rounded-3xl border border-gold/35 bg-cream p-6 shadow-xl sm:p-10 lg:p-12"
          data-reveal
        >
          {!isFinished && currentQ ? (
            <div>
              {/* Progress bar */}
              <div className="flex items-center justify-between gap-4 text-xs uppercase tracking-widest text-earth/60">
                <span>{currentQ.subtitle}</span>
                <span className="font-semibold text-gold">{Math.round(((step + 1) / 3) * 100)}%</span>
              </div>
              <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-earth/10">
                <div
                  className="h-full rounded-full bg-gold transition-all duration-500"
                  style={{ width: `${((step + 1) / QUESTIONS.length) * 100}%` }}
                />
              </div>

              {/* Question */}
              <h3 className="mt-8 font-display text-2xl leading-snug text-earth sm:text-3xl">
                {currentQ.question}
              </h3>

              {/* Options */}
              <div className="mt-8 space-y-4">
                {currentQ.options.map((opt, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelect(opt.id)}
                    className="group flex w-full items-start justify-between gap-4 rounded-2xl border border-earth/15 bg-linen/70 p-5 text-left transition duration-300 hover:-translate-y-0.5 hover:border-gold hover:bg-linen hover:shadow-md cursor-pointer"
                  >
                    <div className="space-y-1">
                      <span className="inline-block text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">
                        {opt.hint}
                      </span>
                      <p className="text-sm sm:text-base font-medium leading-relaxed text-earth">
                        {opt.label}
                      </p>
                    </div>
                    <span className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-earth/20 text-earth/60 transition group-hover:border-gold group-hover:bg-gold group-hover:text-cream">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            diagnosis && (
              <div className="space-y-8">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-earth/10 pb-5">
                  <span className="inline-flex items-center gap-2 rounded-full bg-gold/15 border border-gold/30 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-earth">
                    <Sparkles className="h-3.5 w-3.5 text-gold" />
                    {diagnosis.badge}
                  </span>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-earth/60 hover:text-gold cursor-pointer"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    Újrakezdés
                  </button>
                </div>

                <div>
                  <h3 className="font-display text-2xl sm:text-4xl leading-snug text-earth">
                    {diagnosis.title}
                  </h3>
                  <p className="mt-4 text-sm sm:text-base leading-relaxed text-earth/80">
                    {diagnosis.description}
                  </p>
                </div>

                {/* Irresistible Bundle Recommendation Box */}
                <div className="rounded-2xl border-2 border-gold bg-gradient-to-br from-linen via-cream to-linen p-6 sm:p-8 shadow-md">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="rounded-full bg-gold px-3.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-cream">
                      🔥 Visszautasíthatatlan Csomagajánlat neked
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-sm text-earth/45 line-through">13 800 Ft</span>
                      <span className="font-display text-2xl sm:text-3xl font-semibold text-earth">
                        9 900 Ft
                      </span>
                    </div>
                  </div>

                  <h4 className="mt-4 font-display text-xl sm:text-2xl text-earth">
                    Teljes Belső Utazás · 2 az 1-ben Munkafüzet Csomag
                  </h4>
                  <p className="mt-1 text-xs sm:text-sm text-earth/75">
                    Mindkét vezetett munkafüzet együtt (44 oldal, 28 gyakorlat és táblázat) — a
                    második munkafüzetet gyakorlatilag <strong>1 000 Ft-ért</strong> kapod meg!
                  </p>

                  <ul className="mt-4 grid gap-2 sm:grid-cols-2 text-xs sm:text-sm text-earth/85">
                    <li className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                      <span>
                        <strong>Határok munkafüzet</strong> (4 900 Ft érték)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                      <span>
                        <strong>A kapcsolati mintáim nyomában</strong> (8 900 Ft érték)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                      <span>
                        <strong>14 napos 100% pénzvisszafizetési garancia</strong>
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                      <span>
                        <strong>2 000 Ft-os kuponkód</strong> (`SOUL2000`) beváltható!
                      </span>
                    </li>
                  </ul>

                  <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <Link
                      to="/webshop#csomagajanlat"
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-earth px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-cream shadow-md transition hover:bg-gold"
                    >
                      <BookOpen className="h-4 w-4" />
                      <span>Megnézem a 2 az 1-ben Csomagot</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <a
                      href="/downloads/Soul_Ritual_Onreflexios_Izelito.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-earth/25 bg-cream px-5 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-earth transition hover:border-gold hover:text-gold"
                    >
                      <Download className="h-4 w-4 text-gold" />
                      <span>Ingyenes 3 oldalas PDF ízelítő</span>
                    </a>
                  </div>
                </div>

                {/* Alternative Steps */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-earth/10 bg-linen/60 px-5 py-4 text-xs text-earth/75">
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck className="h-4 w-4 shrink-0 text-gold" />
                    <span>
                      Szívesebben beszélnéd át velem személyesen vagy online a helyzetedet?
                    </span>
                  </div>
                  <a
                    href="https://app.minup.io/book/soulritual"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex shrink-0 items-center gap-1.5 font-semibold uppercase tracking-widest text-gold hover:text-earth"
                  >
                    <Calendar className="h-3.5 w-3.5" />
                    Időpontfoglalás konzultációra →
                  </a>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}

