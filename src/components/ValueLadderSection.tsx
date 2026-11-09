import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Download,
  Flame,
  Heart,
  Sparkles,
} from "lucide-react";

const LADDER_STEPS = [
  {
    step: "01 · Első találkozás",
    badge: "Ajándék · 0 Ft",
    icon: Download,
    title: "Ingyenes 4 oldalas PDF betekintő",
    subtitle: "Kockázat nélküli első lépés",
    description:
      "Töltsd le azonnal az önreflexiós ízelítőt mindkét munkafüzet gyakorlataiból, próbáld ki a feladatokat, majd írd meg pár szóban a véleményedet egy 2 000 Ft-os ajándék kuponért.",
    highlights: [
      "Valódi oldalak és gyakorlatok mindkét munkafüzetből",
      "Azonnali PDF letöltés",
      "2 000 Ft-os ajándék kupon (`SOUL2000`) visszajelzésért",
    ],
    ctaLabel: "Kérem az ingyenes betekintőt",
    ctaHref: "/downloads/Soul_Ritual_Onreflexios_Izelito.pdf",
    secondaryLabel: "Már olvastam → Kérem a 2 000 Ft kupont",
    secondaryTo: "/visszajelzes",
    featured: false,
  },
  {
    step: "02 · Otthoni elmélyülés",
    badge: "4 900 Ft-tól · Csomagban 9 900 Ft",
    icon: BookOpen,
    title: "Önismereti munkafüzetek & 2 az 1-ben Csomag",
    subtitle: "Vezetett önmunka a saját tempódban",
    description:
      "Dolgozd fel otthon, biztonságos keretek között a Határok (14 oldal) és A kapcsolati mintáim nyomában (30 oldal) munkafüzeteket — együtt 13 800 Ft helyett 9 900 Ft-ért!",
    highlights: [
      "Határok munkafüzet: 4 900 Ft (kuponnal 2 900 Ft)",
      "Kapcsolati mintáim: 8 900 Ft (kuponnal 6 900 Ft)",
      "✦ 2 az 1-ben Csomag: 13 800 Ft helyett 9 900 Ft (kuponnal 7 900 Ft)",
    ],
    ctaLabel: "Megnézem a csomagot a Webshopban",
    ctaTo: "/webshop#csomagajanlat",
    featured: true,
  },
  {
    step: "03 · Élő közösségi tér",
    badge: "3 800 Ft – 9 000 Ft",
    icon: Flame,
    title: "Csoportos alkalmak a jurtában",
    subtitle: "Közös lelassulás a természetben",
    description:
      "Lépj be élőben is a Soul Ritual jurtába: csütörtöki kis létszámú jógaórák (max. 8 fő), 3 órás önismereti workshopok, női körök és szívnyitó kakaó szertartások.",
    highlights: [
      "Csütörtöki jóga a jurtában (3 800 Ft / fő)",
      "3 órás önismereti workshopok (9 000 Ft / fő)",
      "Kakaó szertartás, női körök és izzasztó kunyhó",
    ],
    ctaLabel: "Eseménynaptár & Jelentkezés",
    ctaAnchor: "#events",
    featured: false,
  },
  {
    step: "04 · Személyes kísérés",
    badge: "Egyéni folyamat",
    icon: Heart,
    title: "Egyéni konzultáció, ThetaHealing & Access Bars",
    subtitle: "100% rád hangolt, biztonságos tér",
    description:
      "Ha szeretnéd velem személyesen a jurtában vagy online átbeszélni a munkafüzetben feltárt mintáidat, vagy mélyebb tudatalatti és energetikai oldásra vágysz.",
    highlights: [
      "Személyes (a jurtában) vagy online egyéni konzultáció",
      "ThetaHealing tudatalatti blokkoldás",
      "Access Bars energetikai kezelés",
    ],
    ctaLabel: "Időpontot foglalok hozzád",
    ctaExternal: "https://app.minup.io/book/soulritual",
    featured: false,
  },
];

export default function ValueLadderSection() {
  return (
    <section
      id="utiterv"
      className="relative overflow-hidden bg-cream px-6 py-24 lg:py-36 border-t border-earth/10"
    >
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-[11px] font-semibold tracking-[0.22em] uppercase text-earth">
            <Sparkles className="h-3.5 w-3.5 text-gold" />
            <span>Hogyan indulhatsz el? · Saját tempóban</span>
          </div>
          <h2 className="mt-6 font-display text-4xl leading-tight text-earth sm:text-5xl lg:text-6xl">
            A belső megérkezés <em className="italic text-gold">négy útja</em>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-earth/75 sm:text-lg">
            Nem kell azonnal nagy döntést hoznod. Válaszd azt a kapcsolódási formát, ahol most a
            legnagyobb biztonságban érzed magad — az ingyenes otthoni betekintőtől a személyes
            folyamatokig.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="mt-16 grid gap-6 lg:grid-cols-4">
          {LADDER_STEPS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <article
                key={idx}
                className={`relative flex flex-col justify-between rounded-3xl p-7 transition duration-500 hover:-translate-y-1.5 ${
                  item.featured
                    ? "border-2 border-gold bg-gradient-to-b from-linen via-cream to-linen shadow-xl"
                    : "border border-earth/15 bg-linen/70 shadow-sm hover:border-gold/50 hover:shadow-lg"
                }`}
              >
                {item.featured && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gold px-4 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-cream shadow">
                    ✦ Legnépszerűbb választás
                  </span>
                )}

                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">
                      {item.step}
                    </span>
                    <div className="grid h-9 w-9 place-items-center rounded-full bg-gold/15 text-gold">
                      <Icon className="h-4 w-4" />
                    </div>
                  </div>

                  <div className="mt-3 inline-block rounded-full border border-gold/30 bg-cream px-3 py-1 text-[11px] font-semibold text-earth">
                    {item.badge}
                  </div>

                  <h3 className="mt-4 font-display text-2xl leading-snug text-earth">
                    {item.title}
                  </h3>
                  <p className="mt-1 font-display text-sm italic text-earth/70">{item.subtitle}</p>

                  <p className="mt-4 text-xs sm:text-sm leading-relaxed text-earth/75">
                    {item.description}
                  </p>

                  <ul className="mt-5 space-y-2 border-t border-earth/10 pt-4 text-xs text-earth/85">
                    {item.highlights.map((h, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-2">
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-7 pt-4 border-t border-earth/10 space-y-2.5">
                  {item.ctaTo && (
                    <Link
                      to={item.ctaTo}
                      className={`inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3.5 text-[11px] font-semibold uppercase tracking-[0.18em] transition ${
                        item.featured
                          ? "bg-gold text-cream shadow-md hover:bg-earth"
                          : "bg-earth text-cream hover:bg-gold"
                      }`}
                    >
                      <span>{item.ctaLabel}</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  )}

                  {item.ctaHref && (
                    <a
                      href={item.ctaHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-earth px-5 py-3.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-cream transition hover:bg-gold"
                    >
                      <span>{item.ctaLabel}</span>
                      <Download className="h-3.5 w-3.5" />
                    </a>
                  )}

                  {item.secondaryTo && (
                    <Link
                      to={item.secondaryTo}
                      className="block text-center text-[11px] font-semibold text-gold hover:text-earth underline underline-offset-4"
                    >
                      {item.secondaryLabel}
                    </Link>
                  )}

                  {item.ctaAnchor && (
                    <a
                      href={item.ctaAnchor}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-earth px-5 py-3.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-cream transition hover:bg-gold"
                    >
                      <span>{item.ctaLabel}</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </a>
                  )}

                  {item.ctaExternal && (
                    <a
                      href={item.ctaExternal}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-earth px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-earth transition hover:border-gold hover:bg-gold hover:text-cream"
                    >
                      <span>{item.ctaLabel}</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

