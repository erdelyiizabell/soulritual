import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  Check,
  Compass,
  Download,
  Heart,
  Mail,
  Phone,
  RotateCcw,
  Send,
  Sparkles,
  User,
} from "lucide-react";

type ChoiceType = "boundaries" | "patterns" | "both" | "balanced" | "personal";

interface Question {
  id: number;
  question: string;
  subtitle: string;
  options: {
    id: ChoiceType;
    label: string;
  }[];
}

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxAYJBGkm6gWNt2UZ8T2wm8_HEV2vuKlcHg7ZQmT2VQ7d2UgqW1Js0rTjGdYXScr5wg/exec";
const GOOGLE_SCRIPT_URL_ALT =
  "https://script.google.com/macros/s/AKfycbwlCkLgtx_vq1xk_ZEHYIKkzbGh0_nN8bhJ9SDW24_bPpNcaCHYecRXKufLSH2hG15W/exec";

const QUESTIONS: Question[] = [
  {
    id: 1,
    question:
      "Mi történik benned leggyakrabban, amikor valaki kér tőled valamit, amihez valójában nincs erőd vagy időd?",
    subtitle: "1. kérdés a 3-ból · Energia és határhúzás",
    options: [
      {
        id: "balanced",
        label:
          "Őszintén és szelíden nemet mondok — figyelek arra, mire van most kapacitásom, és ezt bűntudat nélkül tudom jelezni.",
      },
      {
        id: "boundaries",
        label:
          "Igent mondok, hogy ne okozzak csalódást — de utána feszült és kimerült leszek.",
      },
      {
        id: "patterns",
        label:
          "Automatikusan átveszem a felelősséget, mert otthon is azt tanultam, hogy „előbb mások, aztán én”.",
      },
      {
        id: "both",
        label:
          "Sokáig tűrök és alkalmazkodom, majd egyszer csak robbanok vagy teljesen visszahúzódom.",
      },
    ],
  },
  {
    id: 2,
    question: "Melyik mondat írja le leginkább a jelenlegi kapcsolati élményedet?",
    subtitle: "2. kérdés a 3-ból · Kapcsolati dinamika",
    options: [
      {
        id: "balanced",
        label:
          "Harmonikusak a kapcsolataim, tudunk nyíltan beszélni a nehézségekről, és nyitott vagyok a további önismereti elmélyülésre.",
      },
      {
        id: "boundaries",
        label:
          "Sokszor érzem úgy, hogy bűntudatom van, amikor végre magamat és a saját szükségleteimet választom.",
      },
      {
        id: "patterns",
        label:
          "Újra és újra ugyanazokat a fájdalmas vitákat és köröket futjuk le a párommal vagy a családommal.",
      },
      {
        id: "both",
        label:
          "Szeretném végre letenni a szüleimtől hozott kimondatlan szabályokat, és szabadabban kapcsolódni.",
      },
    ],
  },
  {
    id: 3,
    question: "Milyen következő lépés adná most neked a legtöbb biztonságot és támogatást?",
    subtitle: "3. kérdés a 3-ból · A te saját utad",
    options: [
      {
        id: "personal",
        label:
          "Leginkább egy személyes (jurtás) vagy online egyéni beszélgetésre vágynék, ahol biztonságos térben, kettesben nézhetünk rá az élethelyzetemre.",
      },
      {
        id: "balanced",
        label:
          "Szívesen töltődnék fel a jurtában (jógán, női körön, kakaó szertartáson), vagy mélyülnék el önismereti témákban.",
      },
      {
        id: "boundaries",
        label:
          "Konkrét, hétköznapi mondatokat és kapaszkodókat szeretnék otthonra, amikkel bűntudat nélkül képviselhetem a határaimat.",
      },
      {
        id: "both",
        label:
          "Otthon, a saját tempómban szeretném feltárni a családi térképemet (genogramomat) ÉS megtanulni tisztán meghúzni a határaimat.",
      },
    ],
  },
];

export default function SelfDiscoveryCompass() {
  const [step, setStep] = useState<number>(0);
  const [answers, setAnswers] = useState<ChoiceType[]>([]);

  // Inline contact form state for 1-on-1 consultation request
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [consultSent, setConsultSent] = useState(false);
  const [formError, setFormError] = useState("");

  const handleSelect = (choice: ChoiceType) => {
    const next = [...answers, choice];
    setAnswers(next);
    setStep(step + 1);
  };

  const handleReset = () => {
    setAnswers([]);
    setStep(0);
    setConsultSent(false);
    setFormError("");
  };

  const isFinished = step >= QUESTIONS.length;

  const getDiagnosis = () => {
    const counts: Record<ChoiceType, number> = {
      boundaries: 0,
      patterns: 0,
      both: 0,
      balanced: 0,
      personal: 0,
    };
    answers.forEach((a) => {
      counts[a] += 1;
    });

    const wantsPersonal = answers[2] === "personal";

    if (counts.balanced >= 2) {
      return {
        badge: "Személyre szabott kiértékelés · Tudatos alapok & Elmélyülés",
        title: "Stabil belső alapokkal rendelkezel — készen állsz a mélyebb önreflexióra",
        description:
          "A válaszaidból látszik, hogy már van rálátásod a saját határaidra, és képes vagy szelíden nemet mondani. Ezen a ponton a legnagyobb ajándék számodra a finomhangolás: a kevésbé látható határterületek (pl. gondoskodási és generációs határok), a többgenerációs családi térkép (genogram) feltárása, vagy az élő kapcsolódás velem a jurtában vagy online.",
        insightBullets: [
          "Erősséged: Már észreveszed a saját kapacitásaidat, és nem csak automatizmusból reagálsz.",
          "Következő fejlődési tér: A finomabb családi örökségek és tudatalatti minták tudatosítása.",
          wantsPersonal
            ? "Ajánlott irány: Egyéni konzultáció (a jurtában vagy online), ahol személyre szabottan megyünk mélyebbre."
            : "Ajánlott irány: Csoportos feltöltődés a jurtában, egyéni folyamat vagy a 2 az 1-ben Munkafüzet Csomag.",
        ],
        wantsPersonal,
      };
    }

    if (counts.both >= 1 || (counts.boundaries >= 1 && counts.patterns >= 1)) {
      return {
        badge: "Személyre szabott kiértékelés · Határok & Kapcsolati minták",
        title: "A határaid és a hozott kapcsolati mintáid szorosan összekapcsolódnak",
        description:
          "A válaszaid alapján nálad a nehéz nemet mondás mögött mélyebb, otthonról hozott családi szerepek és ismétlődő kapcsolati körök állnak. Ha csak a felszínen próbálsz határt húzni, a bűntudat visszahúz — ezért neked a két terület együttes átlátása hozza a legfelszabadítóbb megkönnyebbülést.",
        insightBullets: [
          "Hol folyik el az energiád: Sokáig alkalmazkodsz másokhoz, miközben a saját szükségleteid háttérbe szorulnak.",
          "Mi áll a háttérben: Otthonról hozott kimondatlan szabályok arról, hogy a szeretetért cserébe mindig elérhetőnek kell lenned.",
          wantsPersonal
            ? "Ajánlott irány: Egyéni beszélgetés veled (a jurtában vagy online) + a két munkafüzet gyakorlatai."
            : "Ajánlott irány: A 2 az 1-ben Munkafüzet Csomag otthonra, vagy egyéni konzultáció velem.",
        ],
        wantsPersonal,
      };
    }

    if (counts.boundaries >= 2) {
      return {
        badge: "Személyre szabott kiértékelés · Határok fókusz",
        title: "A legtöbb energiád most az elmosódott határaidnál szivárog el",
        description:
          "Sokszor túl sokat tartasz meg magadban, és előbb gondolsz mások nyugalmára, mint a saját belső békédre. A 17 határterület megismerése, a testi-érzelmi jelzések felismerése és a bűntudat nélküli, szelíd példamondatok azonnali megkönnyebbülést fognak adni.",
        insightBullets: [
          "Hol folyik el az energiád: Olyankor is igent mondasz, amikor a tested és a belső hangod már nemet jelez.",
          "Mi áll a háttérben: A konfliktustól vagy a másik megbántásától való félelem.",
          wantsPersonal
            ? "Ajánlott irány: Egyéni beszélgetés (a jurtában vagy online), ahol biztonságos térben nézünk rá a határhelyzeteidre."
            : "Ajánlott irány: A Határok munkafüzet (vagy a 2 az 1-ben Csomag) + lehetőség egyéni beszélgetésre.",
        ],
        wantsPersonal,
      };
    }

    return {
      badge: "Személyre szabott kiértékelés · Kapcsolati minták fókusz",
      title: "Az ismétlődő érzelmi körök mögött a hozott családi térképed dolgozik",
      description:
        "Amikor egy vitában hirtelen túl erős fájdalmat, dühöt vagy bezárkózást érzel, valójában egy régi, otthonról hozott mondat vagy seb szólal meg. A családi genogram és a konfliktuskör-térkép segít megszakítani ezt az öröklött láncolatot.",
      insightBullets: [
        "Hol folyik el az energiád: Ismétlődő párkapcsolati vagy családi reakcióláncokban, ahol egyikőtök sem érzi magát igazán meghallva.",
        "Mi áll a háttérben: Többgenerációs családi minták és régi védekezési stratégiák.",
        wantsPersonal
          ? "Ajánlott irány: Egyéni konzultáció / ThetaHealing (a jurtában vagy online) a hozott blokkok oldására."
          : "Ajánlott irány: A kapcsolati mintáim nyomában munkafüzet (vagy a 2 az 1-ben Csomag) + személyes átbeszélés.",
      ],
      wantsPersonal,
    };
  };

  const currentQ = QUESTIONS[step];
  const diagnosis = isFinished ? getDiagnosis() : null;

  async function handleConsultSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setFormError("Kérlek, add meg a nevedet és az e-mail címedet!");
      return;
    }
    setSubmitting(true);
    setFormError("");

    const summaryText = `[Önismereti Iránytű: ${diagnosis?.title || ""}] Tel: ${
      phone.trim() || "-"
    } | Üzenet: ${note.trim() || "Egyéni beszélgetést szeretne"}`;

    const payload = JSON.stringify({
      type: "feedback",
      name: name.trim(),
      email: email.trim(),
      rating: 5,
      feedback: summaryText,
    });

    for (const url of [GOOGLE_SCRIPT_URL, GOOGLE_SCRIPT_URL_ALT]) {
      fetch(url, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: payload,
      }).catch(() => {});
    }

    try {
      await fetch("https://formsubmit.co/ajax/info@soulritual.hu", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `🌿 Új Egyéni Beszélgetés Kérés (Önismereti Iránytű): ${name.trim()}`,
          Név: name.trim(),
          "E-mail": email.trim(),
          Telefonszám: phone.trim() || "-",
          "Iránytű eredmény": diagnosis?.title || "-",
          Üzenet: note.trim() || "-",
        }),
      });
    } catch {}

    setSubmitting(false);
    setConsultSent(true);
  }

  return (
    <section
      id="iranytu"
      className="relative overflow-hidden bg-gradient-to-b from-linen via-cream to-linen px-6 py-24 lg:py-32"
    >
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-[11px] font-semibold tracking-[0.22em] uppercase text-earth">
            <Compass className="h-3.5 w-3.5 text-gold" />
            <span>Interaktív Önismereti Iránytű · 3 kérdés</span>
          </div>
          <h2 className="mt-5 font-display text-3xl leading-tight text-earth sm:text-5xl">
            Mire van most a legnagyobb szüksége a <em className="italic text-gold">lelkednek?</em>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-earth/75 sm:text-lg">
            Válaszolj 3 rövid kérdésre: a végén azonnali, személyre szabott kiértékelést kapsz, és
            kérhetsz egyéni beszélgetést vagy választhatsz az otthoni munkafüzetek közül.
          </p>
        </div>

        {/* Quiz Card */}
        <div className="mt-12 overflow-hidden rounded-3xl border border-gold/35 bg-cream p-6 shadow-xl sm:p-10 lg:p-12">
          {!isFinished && currentQ ? (
            <div>
              {/* Progress bar */}
              <div className="flex items-center justify-between gap-4 text-xs uppercase tracking-widest text-earth/60">
                <span>{currentQ.subtitle}</span>
                <span className="font-semibold text-gold">
                  {step + 1} / {QUESTIONS.length}
                </span>
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
              <div className="mt-8 space-y-3.5">
                {currentQ.options.map((opt, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelect(opt.id)}
                    className="group flex w-full items-center justify-between gap-4 rounded-2xl border border-earth/15 bg-linen/70 p-4 sm:p-5 text-left transition duration-300 hover:-translate-y-0.5 hover:border-gold hover:bg-linen hover:shadow-md cursor-pointer"
                  >
                    <p className="text-sm sm:text-base font-medium leading-relaxed text-earth">
                      {opt.label}
                    </p>
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-earth/20 text-earth/60 transition group-hover:border-gold group-hover:bg-gold group-hover:text-cream">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            diagnosis && (
              <div className="space-y-8">
                {/* Top badge + Reset */}
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
                    Kitöltöm újra
                  </button>
                </div>

                {/* Detailed Evaluation */}
                <div>
                  <h3 className="font-display text-2xl sm:text-4xl leading-snug text-earth">
                    {diagnosis.title}
                  </h3>
                  <p className="mt-4 text-sm sm:text-base leading-relaxed text-earth/80">
                    {diagnosis.description}
                  </p>

                  <ul className="mt-5 space-y-2.5 rounded-2xl border border-gold/25 bg-linen/70 p-5 text-xs sm:text-sm text-earth/85">
                    {diagnosis.insightBullets.map((b, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* ── 1. LEHETŐSÉG: EGYÉNI BESZÉLGETÉS VELEM (A JURTÁBAN VAGY ONLINE) ── */}
                <div className="rounded-2xl border-2 border-earth/20 bg-linen p-6 sm:p-8 shadow-sm">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-earth px-3.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-cream">
                      <Heart className="h-3 w-3 text-gold-soft" />
                      Személyes kapcsolódás · A jurtában vagy online
                    </span>
                  </div>

                  <h4 className="mt-4 font-display text-xl sm:text-2xl text-earth">
                    Szeretnéd egyéniben átbeszélni velem az élethelyzetedet?
                  </h4>
                  <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-earth/75">
                    Foglalhatsz közvetlenül időpontot a naptáramban egyéni konzultációra,
                    ThetaHealing vagy Access Bars folyamatra — vagy hagyd meg lent az
                    elérhetőségedet, és <strong>személyesen felveszem veled a kapcsolatot</strong>{" "}
                    (+ elküldöm neked a 2 000 Ft-os ajándék kuponkódot is)!
                  </p>

                  {!consultSent ? (
                    <form onSubmit={handleConsultSubmit} className="mt-5 space-y-3">
                      <div className="grid gap-3 sm:grid-cols-3">
                        <div className="relative">
                          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-earth/40" />
                          <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Keresztneved *"
                            className="w-full rounded-xl border border-earth/20 bg-cream pl-10 pr-3 py-3 text-xs sm:text-sm text-earth placeholder:text-earth/45 focus:border-gold focus:outline-none"
                          />
                        </div>
                        <div className="relative">
                          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-earth/40" />
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="E-mail címed *"
                            className="w-full rounded-xl border border-earth/20 bg-cream pl-10 pr-3 py-3 text-xs sm:text-sm text-earth placeholder:text-earth/45 focus:border-gold focus:outline-none"
                          />
                        </div>
                        <div className="relative">
                          <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-earth/40" />
                          <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Telefonszámod (opcionális)"
                            className="w-full rounded-xl border border-earth/20 bg-cream pl-10 pr-3 py-3 text-xs sm:text-sm text-earth placeholder:text-earth/45 focus:border-gold focus:outline-none"
                          />
                        </div>
                      </div>

                      <input
                        type="text"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="Miben segíthetek most a leginkább? (pl. egyéni beszélgetés online / a jurtában, kérdésem van...)"
                        className="w-full rounded-xl border border-earth/20 bg-cream px-4 py-3 text-xs sm:text-sm text-earth placeholder:text-earth/45 focus:border-gold focus:outline-none"
                      />

                      {formError && <p className="text-xs text-destructive">{formError}</p>}

                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
                        <button
                          type="submit"
                          disabled={submitting}
                          className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-earth px-6 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-cream shadow-md transition hover:bg-gold cursor-pointer"
                        >
                          <Send className="h-3.5 w-3.5" />
                          <span>
                            {submitting
                              ? "Küldés folyamatban..."
                              : "Szeretnék egyéni beszélgetést · Keress meg!"}
                          </span>
                        </button>
                        <a
                          href="https://app.minup.io/book/soulritual"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-earth bg-cream px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-earth transition hover:border-gold hover:bg-gold hover:text-cream"
                        >
                          <Calendar className="h-4 w-4" />
                          <span>Azonnali időpontfoglalás</span>
                        </a>
                      </div>
                    </form>
                  ) : (
                    <div className="mt-5 rounded-2xl border border-gold/40 bg-cream p-5 text-center">
                      <p className="font-display text-xl text-earth">
                        Köszönöm, kedves {name}! Megkaptam az üzenetedet. 🌿
                      </p>
                      <p className="mt-1.5 text-xs sm:text-sm text-earth/75">
                        Hamarosan keresni foglak a megadott elérhetőségeden, és e-mailben el is
                        küldtem neked a <strong>SOUL2000</strong> (2 000 Ft-os) ajándék kuponkódot!
                      </p>
                    </div>
                  )}
                </div>

                {/* ── 2. LEHETŐSÉG: OTTHONI ELMÉLYÜLÉS (CSOMAGAJÁNLAT & INGYENES BETEKINTŐ) ── */}
                <div className="rounded-2xl border-2 border-gold bg-gradient-to-br from-linen via-cream to-linen p-6 sm:p-8 shadow-md">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="rounded-full bg-gold px-3.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-cream">
                      ✦ Otthoni önmunka · 2 az 1-ben Csomagajánlat
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
                    Ha otthon, a saját tempódban indulnál el: mindkét vezetett munkafüzet együtt
                    (44 oldal, 28 gyakorlat és táblázat) — a második munkafüzetet gyakorlatilag{" "}
                    <strong>1 000 Ft-ért</strong> kapod meg!
                  </p>

                  <div className="mt-5 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <Link
                      to="/webshop#csomagajanlat"
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-gold px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-cream shadow-md transition hover:bg-earth"
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
                      <span>Ingyenes 4 oldalas PDF ízelítő</span>
                    </a>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
