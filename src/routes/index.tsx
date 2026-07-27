import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Flower2,
  Heart,
  Wind,
  Sparkles,
  Sun,
  Flame,
  Users,
  Baby,
  Building2,
  Leaf,
  ChevronDown,
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
  ArrowUpRight,
  Quote,
} from "lucide-react";

import jurtaHero from "@/assets/jurta-hero.asset.json";
import kezTermeszet from "@/assets/kez-termeszet.asset.json";
import ritualObject from "@/assets/ritual-object.asset.json";
import sunsetWalk from "@/assets/sunset-walk.asset.json";
import kezekOssze from "@/assets/kezek-osszekapcsolodas.asset.json";
import logoUrl from "@/assets/soul-ritual-logo-transparent.png";
import jurtaInterior from "@/assets/jurta-interior.jpg";
import whyLavender from "@/assets/why-lavender.jpg";
import eventCouples from "@/assets/event-couples.jpg";
import eventWomensCircle from "@/assets/event-womens-circle.jpg";
import blogSlowLiving from "@/assets/blog-slow-living.jpg";
import blogCacao from "@/assets/blog-cacao.jpg";
import blogSafeSpace from "@/assets/blog-safe-space.jpg";
import kakaoSacred from "@/assets/kakao-sacred.jpg";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { property: "og:image", content: jurtaHero.url },
      { name: "twitter:image", content: jurtaHero.url },
    ],
  }),
});

const services = [
  { icon: Flower2, name: "Jóga", desc: "Tudatos mozgás, légzés és jelenlét." },
  { icon: Leaf, name: "Meditáció", desc: "Csendes befelé fordulás, vezetett gyakorlatok." },
  { icon: Wind, name: "Légzőgyakorlatok", desc: "A lélegzet ereje a nyugalomhoz." },
  { icon: Sparkles, name: "Access Bars", desc: "Finom energiamunka a fejed 32 pontján." },
  { icon: Heart, name: "Theta Healing", desc: "Mély tudatalatti átprogramozás." },
  { icon: Sun, name: "Kakaó szertartás", desc: "Szív-nyitó rituálé ceremoniális kakaóval." },
  { icon: Flame, name: "Izzasztó kunyhó", desc: "Tisztító hőélmény, ősi hagyomány." },
  { icon: Users, name: "Női körök", desc: "Biztonságos tér a női energia számára." },
  { icon: Baby, name: "Gyerek mindfulness", desc: "Játékos figyelem-gyakorlatok kicsiknek." },
  { icon: Building2, name: "Céges wellbeing", desc: "Csapatok újrahangolása a természetben." },
];

const reasons = [
  "Természetközeli helyszín",
  "Kis létszámú csoportok",
  "Több mint 10 év tapasztalat",
  "Biztonságos, elfogadó közeg",
  "Kezdők számára is",
  "A hétköznapokban is alkalmazható módszerek",
];

const events = [
  {
    img: kakaoSacred,
    date: "2026. augusztus 3.",
    title: "Kakaó szertartás telihold alatt",
    desc: "Szív-nyitó este ceremoniális kakaóval, dobszóval és csenddel.",
  },
  {
    img: eventCouples,
    date: "2026. augusztus 17.",
    title: "Hétvégi elvonulás párokban",
    desc: "Két nap közös lelassulás, jóga, meditáció és természetjárás.",
  },
  {
    img: eventWomensCircle,
    date: "2026. szeptember 5.",
    title: "Női kör — az őszi egyensúly",
    desc: "Rituálé, megosztás és belső csend a jurta ölelésében.",
  },
];

const testimonials = [
  {
    text: "Amint beléptem a jurtába, valami elcsendesedett bennem. Évek óta nem éreztem ilyen mély nyugalmat.",
    author: "Eszter, 42",
  },
  {
    text: "Izabella jelenléte biztonságot ad. Nem tanít, hanem terepet nyit — és ez ritka ajándék.",
    author: "Ádám, 51",
  },
  {
    text: "A kakaó szertartás után napokig ott volt bennem az a lágyság. Hazataláltam magamhoz.",
    author: "Nóra, 36",
  },
];

const posts = [
  {
    img: blogSlowLiving,
    tag: "Vlog",
    title: "A lelassulás művészete a hétköznapokban",
    excerpt: "Öt apró rituálé, amit már ma bevezethetsz — és amitől megváltozik a napod ritmusa.",
    href: "https://www.youtube.com/@soulritual",
  },
  {
    img: blogCacao,
    tag: "Vlog",
    title: "Mi történik egy kakaó szertartáson?",
    excerpt: "A ceremoniális kakaó nem trend, hanem évezredes szív-nyitó gyakorlat. Bemutatjuk.",
    href: "https://www.youtube.com/@soulritual",
  },
  {
    img: blogSafeSpace,
    tag: "Vlog",
    title: "Miért van szükségünk biztonságos terekre?",
    excerpt: "A modern élet elszakít önmagunktól. A jurta emlékeztet, hogyan találjunk vissza.",
    href: "https://www.youtube.com/@soulritual",
  },
];

const faqs = [
  {
    q: "Alkalmas a Soul Ritual kezdőknek is?",
    a: "Igen. Minden foglalkozás és rituálé úgy épül fel, hogy kezdők és haladók egyaránt biztonságosan részt vehessenek benne.",
  },
  {
    q: "Mit vigyek magammal egy alkalomra?",
    a: "Kényelmes ruhát, egy meleg réteget, vizet és nyitott szívet. A jóga- és meditációs kellékeket biztosítjuk.",
  },
  {
    q: "Hol található a jurta?",
    a: "Egy csendes, természetközeli helyen, levendulamezők és fák között. A pontos helyszínt a foglalás megerősítésekor küldjük.",
  },
  {
    q: "Lehet egyénileg is időpontot foglalni?",
    a: "Természetesen. Az Access Bars, Theta Healing és egyéni konzultációk mind személyre szabott időpontban is elérhetők.",
  },
  {
    q: "Van lehetőség céges csoportokat fogadni?",
    a: "Igen — külön programokat állítunk össze csapatoknak, akik szeretnének kiszakadni a mindennapokból.",
  },
];

function useScrolled(threshold = 40) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Header() {
  const scrolled = useScrolled(60);
  const [open, setOpen] = useState(false);
  const nav = [
    ["Bemutatkozás", "#about"],
    ["Szolgáltatások", "#services"],
    ["A jurta", "#jurta"],
    ["Események", "#events"],
    ["Blog", "#blog"],
    ["Kapcsolat", "#contact"],
  ] as const;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-earth/90 backdrop-blur-md shadow-[0_1px_0_0_color-mix(in_oklab,var(--gold)_35%,transparent)]"
          : "bg-gradient-to-b from-earth/50 to-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <a href="#top" className="flex items-center gap-3">
          <img
            src={logoUrl}
            alt="Soul Ritual"
            className={`transition-all duration-500 ${scrolled ? "h-14 sm:h-16" : "h-20 sm:h-28"} w-auto`}
            style={{ filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.55)) drop-shadow(0 6px 24px rgba(0,0,0,0.45))" }}
          />
        </a>
        <nav className="hidden items-center gap-9 lg:flex">
          {nav.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="text-sm font-medium tracking-[0.18em] uppercase text-cream transition hover:text-gold-soft"
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-4 lg:flex">
          <a
            href={SCOOL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium tracking-[0.24em] uppercase text-cream transition hover:text-gold-soft"
          >
            Videótár
          </a>
          <a
            href="https://app.minup.io/book/soulritual" target="_blank" rel="noopener noreferrer"
            className="rounded-full border border-cream/80 px-6 py-2.5 text-xs font-medium tracking-[0.24em] uppercase text-cream transition hover:bg-cream hover:text-earth"
          >
            Időpontot foglalok
          </a>
        </div>
        <button
          onClick={() => setOpen(!open)}
          className="flex flex-col gap-1.5 p-2 lg:hidden"
          aria-label="Menü"
        >
          <span className={`h-px w-6 bg-cream transition ${open ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`h-px w-6 bg-cream transition ${open ? "opacity-0" : ""}`} />
          <span className={`h-px w-6 bg-cream transition ${open ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </div>
      {open && (
        <div className="border-t border-cream/20 bg-earth/95 backdrop-blur-md lg:hidden">
          <nav className="flex flex-col gap-1 px-6 py-4">
            {nav.map(([label, href]) => (
              <a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="border-b border-cream/15 py-3 text-sm tracking-widest uppercase text-cream"
              >
                {label}
              </a>
            ))}
            <a
              href={SCOOL_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="border-b border-cream/15 py-3 text-sm tracking-widest uppercase text-cream"
            >
              Videótár
            </a>
            <a
              href="https://app.minup.io/book/soulritual" target="_blank" rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="mt-3 rounded-full bg-cream py-3 text-center text-[11px] tracking-[0.28em] uppercase text-earth"
            >
              Időpontot foglalok
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable parallax on touch / small screens to prevent image jump
    if (window.matchMedia("(max-width: 1023px), (pointer: coarse)").matches) return;
    const onScroll = () => {
      if (!heroRef.current) return;
      const y = window.scrollY;
      heroRef.current.style.transform = `translate3d(0, ${y * 0.35}px, 0) scale(${1 + y * 0.0004})`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="top" className="relative h-[100svh] min-h-[560px] w-full overflow-hidden">
      <div ref={heroRef} className="absolute inset-0 will-change-transform">
        <img
          src={jurtaHero.url}
          alt="Soul Ritual jurta a levendulamező szélén"
          className="ken-burns h-full w-full object-cover"
          fetchPriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-earth/25 via-earth/10 to-earth/60" />
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <p className="fade-up eyebrow text-gold-soft" style={{ animationDelay: "0.1s" }}>
          Soul Ritual · természetközeli elvonulás
        </p>
        <h1
          className="fade-up mt-6 max-w-4xl text-5xl leading-[1.05] text-cream sm:text-6xl md:text-7xl lg:text-[5.5rem]"
          style={{ animationDelay: "0.25s" }}
        >
          Találj vissza <em className="italic text-gold-soft">önmagadhoz</em>
        </h1>
        <p
          className="fade-up mt-8 max-w-xl text-base leading-relaxed text-cream/85 sm:text-lg"
          style={{ animationDelay: "0.5s" }}
        >
          Egy hely, ahol lelassulhatsz, feltöltődhetsz és újra kapcsolódhatsz önmagadhoz.
        </p>
        <div
          className="fade-up mt-12 flex flex-col items-center gap-4 sm:flex-row"
          style={{ animationDelay: "0.75s" }}
        >
          <a
            href="https://app.minup.io/book/soulritual" target="_blank" rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 rounded-full bg-cream px-8 py-4 text-[11px] tracking-[0.28em] uppercase text-earth transition hover:bg-gold hover:text-cream"
          >
            Időpontot foglalok
            <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a
            href="#events"
            className="inline-flex items-center gap-3 rounded-full border border-cream/60 px-8 py-4 text-[11px] tracking-[0.28em] uppercase text-cream transition hover:border-cream"
          >
            Közelgő események
          </a>
        </div>
      </div>

      <a
        href="#about"
        aria-label="Tovább"
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-cream/70"
      >
        <span className="text-[10px] tracking-[0.32em] uppercase">Tovább</span>
        <ChevronDown className="h-4 w-4 animate-bounce" />
      </a>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="relative bg-cream px-6 py-28 lg:py-40">
      <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-5" data-reveal>
          <div className="relative">
            <img
              src={kezTermeszet.url}
              alt="Izabella"
              className="aspect-[4/5] w-full object-cover"
            />
            <div className="absolute -bottom-6 -right-6 hidden h-40 w-40 border border-gold sm:block" />
          </div>
        </div>
        <div className="lg:col-span-7 lg:pt-10" data-reveal>
          <p className="eyebrow">Bemutatkozás</p>
          <h2 className="mt-6 text-4xl leading-tight sm:text-5xl lg:text-6xl">
            Izabella <em className="italic text-gold">vagyok</em>.
          </h2>
          <div className="mt-10 space-y-6 text-base leading-relaxed text-earth/80 sm:text-lg">
            <p>
              Építőmérnökként éveken át nagy projekteken dolgoztam, miközben több mint tíz éve
              a jóga, a meditáció és az önismeret is meghatározó része az életemnek.
            </p>
            <p>
              A Soul Ritual azért született, hogy létrehozzak egy elfogadó és biztonságos teret,
              ahol mindenki megpihenhet, feltöltődhet és újra kapcsolódhat önmagához.
            </p>
            <p className="text-earth/60">
              Nem egy tanárt kapsz, hanem egy társat az úton — aki maga is jár rajta.
            </p>
          </div>
          <div className="mt-12 flex items-center gap-4">
            <div className="hairline max-w-[80px]" />
            <span className="font-display text-lg italic text-gold">— Izabella</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="relative bg-linen px-6 py-28 lg:py-40">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl" data-reveal>
          <p className="eyebrow">Szolgáltatások</p>
          <h2 className="mt-6 text-4xl leading-tight sm:text-5xl lg:text-6xl">
            Tíz út, egyetlen <em className="italic text-gold">cél</em>.
          </h2>
          <p className="mt-6 text-earth/70 sm:text-lg">
            Bármelyiket választod, ugyanoda vezet: befelé. A módszer más, a lényeg ugyanaz —
            lelassulás, jelenlét, kapcsolódás.
          </p>
        </div>

        <div className="mt-16 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({ icon: Icon, name, desc }, i) => (
            <div
              key={name}
              data-reveal
              style={{ transitionDelay: `${i * 40}ms` }}
              className="group relative bg-linen p-8 transition duration-500 hover:bg-cream lg:p-10"
            >
              <Icon
                strokeWidth={1}
                className="h-8 w-8 text-gold transition duration-500 group-hover:scale-110"
              />
              <h3 className="mt-6 text-2xl">{name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-earth/65">{desc}</p>
              <ArrowUpRight className="absolute right-6 top-6 h-4 w-4 text-earth/20 transition duration-500 group-hover:text-gold" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Jurta() {
  return (
    <section id="jurta" className="relative bg-cream px-6 py-28 lg:py-40">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5 lg:pt-16" data-reveal>
            <p className="eyebrow">A jurta</p>
            <h2 className="mt-6 text-4xl leading-tight sm:text-5xl lg:text-6xl">
              Nem csupán egy <em className="italic text-gold">épület</em>.
            </h2>
            <div className="mt-10 space-y-6 text-base leading-relaxed text-earth/75 sm:text-lg">
              <p>
                Egy hely, ahol kiszakadhatsz a mindennapokból, lelassulhatsz, és biztonságos
                térben kapcsolódhatsz önmagadhoz.
              </p>
            </div>
          </div>
          <div className="lg:col-span-7" data-reveal>
            <img
              src={jurtaInterior}
              alt="A jurta belső tere"
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-3" data-reveal>
          <img src={sunsetWalk.url} alt="Séta a természetben" className="aspect-square w-full object-cover" />
          <img src={ritualObject.url} alt="Rituális tárgy" className="aspect-square w-full object-cover" />
          <img src={kezekOssze.url} alt="Kapcsolódás" className="aspect-square w-full object-cover" />
        </div>
      </div>
    </section>
  );
}

function Why() {
  return (
    <section
      className="relative overflow-hidden bg-earth px-6 py-28 text-cream lg:py-40"
      style={{
        backgroundImage: `linear-gradient(to bottom, color-mix(in oklab, var(--earth) 92%, transparent), color-mix(in oklab, var(--earth) 96%, transparent)), url(${whyLavender})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl" data-reveal>
          <p className="eyebrow text-gold-soft">Miért a Soul Ritual</p>
          <h2 className="mt-6 text-4xl leading-tight text-cream sm:text-5xl lg:text-6xl">
            <em className="italic text-gold-soft">Hat</em> ok, amiért ide térsz vissza.
          </h2>
        </div>

        <ul className="mt-16 grid gap-x-12 gap-y-10 sm:grid-cols-2">
          {reasons.map((r, i) => (
            <li key={r} data-reveal className="flex items-start gap-5 border-t border-cream/15 pt-6">
              <span className="font-display text-2xl italic text-gold-soft">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-lg text-cream/90">{r}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Events() {
  return (
    <section id="events" className="bg-linen px-6 py-28 lg:py-40">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end" data-reveal>
          <div className="max-w-xl">
            <p className="eyebrow">Közelgő események</p>
            <h2 className="mt-6 text-4xl leading-tight sm:text-5xl lg:text-6xl">
              Együtt <em className="italic text-gold">lelassulni</em>.
            </h2>
          </div>
          <a
            href="https://app.minup.io/book/soulritual" target="_blank" rel="noopener noreferrer"
            className="text-[11px] tracking-[0.28em] uppercase text-earth underline decoration-gold underline-offset-8 hover:decoration-earth"
          >
            Összes esemény →
          </a>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {events.map((e, i) => (
            <article
              key={e.title}
              data-reveal
              style={{ transitionDelay: `${i * 80}ms` }}
              className="group flex flex-col"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={e.img}
                  alt={e.title}
                  className="h-full w-full object-cover transition duration-[1200ms] group-hover:scale-105"
                />
                <div className="absolute left-4 top-4 bg-cream/95 px-3 py-1.5 text-[10px] tracking-[0.24em] uppercase text-earth">
                  {e.date}
                </div>
              </div>
              <h3 className="mt-6 text-2xl leading-snug">{e.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-earth/65">{e.desc}</p>
              <a
                href="https://app.minup.io/book/soulritual" target="_blank" rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-[11px] tracking-[0.28em] uppercase text-gold hover:text-earth"
              >
                Jelentkezem <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % testimonials.length), 6500);
    return () => clearInterval(t);
  }, []);
  return (
    <section className="bg-cream px-6 py-28 lg:py-40">
      <div className="mx-auto max-w-4xl text-center" data-reveal>
        <Quote className="mx-auto h-8 w-8 text-gold" strokeWidth={1} />
        <div className="relative mt-10 min-h-[220px]">
          {testimonials.map((t, idx) => (
            <blockquote
              key={idx}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                idx === i ? "opacity-100" : "opacity-0"
              }`}
            >
              <p className="font-display text-2xl italic leading-relaxed text-earth sm:text-3xl lg:text-4xl">
                „{t.text}”
              </p>
              <footer className="mt-8 text-[11px] tracking-[0.28em] uppercase text-gold">
                — {t.author}
              </footer>
            </blockquote>
          ))}
        </div>
        <div className="mt-16 flex justify-center gap-2">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              aria-label={`Vélemény ${idx + 1}`}
              className={`h-px transition-all duration-500 ${
                idx === i ? "w-12 bg-gold" : "w-6 bg-earth/25"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Blog() {
  return (
    <section id="blog" className="bg-cream px-6 py-28 lg:py-40">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end" data-reveal>
          <div className="max-w-xl">
            <p className="eyebrow">Vlog</p>
            <h2 className="mt-6 text-4xl leading-tight sm:text-5xl lg:text-6xl">
              Gondolatok az <em className="italic text-gold">útról</em>.
            </h2>
          </div>
          <a
            href="https://www.youtube.com/@soulritual"
            target="_blank"
            rel="noreferrer"
            className="text-[11px] tracking-[0.28em] uppercase text-earth underline decoration-gold underline-offset-8 hover:decoration-earth"
          >
            YouTube csatorna →
          </a>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-3">
          {posts.map((p, i) => (
            <a
              key={p.title}
              href={p.href}
              target="_blank"
              rel="noreferrer"
              data-reveal
              style={{ transitionDelay: `${i * 80}ms` }}
              className="group block"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={p.img}
                  alt={p.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-[1200ms] group-hover:scale-105"
                />
              </div>
              <p className="eyebrow mt-6">{p.tag}</p>
              <h3 className="mt-4 text-2xl leading-snug transition group-hover:text-gold">
                {p.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-earth/65">{p.excerpt}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-[11px] tracking-[0.28em] uppercase text-gold">
                Megnézem <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="bg-linen px-6 py-28 lg:py-40">
      <div className="mx-auto max-w-3xl">
        <div data-reveal className="text-center">
          <p className="eyebrow">Gyakori kérdések</p>
          <h2 className="mt-6 text-4xl leading-tight sm:text-5xl">
            Mielőtt <em className="italic text-gold">megérkeznél</em>.
          </h2>
        </div>
        <div className="mt-16 space-y-px bg-border">
          {faqs.map((f, i) => (
            <div key={f.q} className="bg-linen">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between gap-6 py-6 text-left"
              >
                <span className="text-lg text-earth">{f.q}</span>
                <span
                  className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border border-earth/30 text-earth transition ${
                    open === i ? "rotate-45 border-gold text-gold" : ""
                  }`}
                >
                  <span className="relative block h-3 w-3">
                    <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-current" />
                    <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-current" />
                  </span>
                </span>
              </button>
              <div
                className={`grid overflow-hidden transition-all duration-500 ${
                  open === i ? "grid-rows-[1fr] pb-6" : "grid-rows-[0fr]"
                }`}
              >
                <div className="min-h-0">
                  <p className="max-w-2xl pr-14 text-earth/70">{f.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <section id="contact" className="relative bg-cream px-6 py-28 lg:py-40">
      <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5" data-reveal>
          <p className="eyebrow">Kapcsolat</p>
          <h2 className="mt-6 text-4xl leading-tight sm:text-5xl lg:text-6xl">
            Írj, <em className="italic text-gold">érkezz meg</em>.
          </h2>
          <p className="mt-6 max-w-md text-earth/70">
            Foglalj időpontot, kérdezz bátran, vagy egyszerűen csak jelezz, hogy figyelsz — minden
            üzenetre személyesen válaszolok.
          </p>

          <ul className="mt-12 space-y-5 text-earth/80">
            <li className="flex items-start gap-4">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-gold" strokeWidth={1.25} />
              <span>Természetközeli helyszín · pontos cím a foglalás után</span>
            </li>
            <li className="flex items-start gap-4">
              <Phone className="mt-1 h-5 w-5 shrink-0 text-gold" strokeWidth={1.25} />
              <a href="tel:+36304078583" className="hover:text-gold">+36 30 407 85 83</a>
            </li>
            <li className="flex items-start gap-4">
              <Mail className="mt-1 h-5 w-5 shrink-0 text-gold" strokeWidth={1.25} />
              <a href="mailto:info@soulritual.hu" className="hover:text-gold">info@soulritual.hu</a>
            </li>
          </ul>

          <div className="mt-10 flex gap-3">
            <a
              href="#"
              aria-label="Instagram"
              className="grid h-11 w-11 place-items-center rounded-full border border-earth/30 text-earth transition hover:border-gold hover:text-gold"
            >
              <Instagram className="h-4 w-4" strokeWidth={1.25} />
            </a>
            <a
              href="#"
              aria-label="Facebook"
              className="grid h-11 w-11 place-items-center rounded-full border border-earth/30 text-earth transition hover:border-gold hover:text-gold"
            >
              <Facebook className="h-4 w-4" strokeWidth={1.25} />
            </a>
          </div>
        </div>

        <form
          data-reveal
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          className="space-y-6 lg:col-span-7"
        >
          <div className="grid gap-6 sm:grid-cols-2">
            <Field label="Neved" name="name" required />
            <Field label="E-mail" name="email" type="email" required />
          </div>
          <Field label="Telefonszám" name="phone" type="tel" />
          <div>
            <label className="eyebrow" htmlFor="msg">Üzenet</label>
            <textarea
              id="msg"
              rows={5}
              required
              className="mt-3 w-full resize-none border-b border-earth/30 bg-transparent py-3 text-earth outline-none transition placeholder:text-earth/40 focus:border-gold"
              placeholder="Miben segíthetek?"
            />
          </div>
          <label className="flex items-start gap-3 text-xs text-earth/70">
            <input type="checkbox" required className="mt-1 accent-[color:var(--gold)]" />
            <span>
              Elfogadom az adatkezelési tájékoztatót, és hozzájárulok, hogy Izabella válaszoljon.
            </span>
          </label>
          <button
            type="submit"
            className="group inline-flex items-center gap-3 rounded-full bg-earth px-8 py-4 text-[11px] tracking-[0.28em] uppercase text-cream transition hover:bg-gold"
          >
            {sent ? "Köszönöm — hamarosan írok" : "Üzenet küldése"}
            <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </form>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="eyebrow" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="mt-3 w-full border-b border-earth/30 bg-transparent py-3 text-earth outline-none transition placeholder:text-earth/40 focus:border-gold"
      />
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-earth px-6 py-20 text-cream/80">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <img src={logoUrl} alt="Soul Ritual" className="h-32 w-auto" />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-cream/70">
            Egy hely, ahol lelassulhatsz, feltöltődhetsz és újra kapcsolódhatsz önmagadhoz.
          </p>
        </div>

        <div className="lg:col-span-4">
          <p className="eyebrow text-gold-soft">Hírlevél</p>
          <p className="mt-4 text-sm text-cream/70">
            Havonta egy csendes levél — közelgő rituálék, gondolatok, meghívások.
          </p>
          <form className="mt-6 flex items-center gap-2 border-b border-cream/25">
            <input
              type="email"
              placeholder="E-mail címed"
              className="flex-1 bg-transparent py-3 text-sm text-cream outline-none placeholder:text-cream/40"
            />
            <button className="text-[11px] tracking-[0.28em] uppercase text-gold-soft hover:text-cream">
              Feliratkozom
            </button>
          </form>
        </div>

        <div className="lg:col-span-3">
          <p className="eyebrow text-gold-soft">Menü</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li><a href="#about" className="hover:text-gold">Bemutatkozás</a></li>
            <li><a href="#services" className="hover:text-gold">Szolgáltatások</a></li>
            <li><a href="#events" className="hover:text-gold">Események</a></li>
            <li><a href="#blog" className="hover:text-gold">Blog</a></li>
            <li><a href="#contact" className="hover:text-gold">Kapcsolat</a></li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-16 flex max-w-6xl flex-col items-start justify-between gap-4 border-t border-cream/15 pt-8 text-xs text-cream/50 sm:flex-row sm:items-center">
        <span>© {new Date().getFullYear()} Soul Ritual · Minden jog fenntartva</span>
        <div className="flex gap-6">
          <a href="#" className="hover:text-cream">Adatkezelési tájékoztató</a>
          <a href="#" className="hover:text-cream">ÁSZF</a>
        </div>
      </div>
    </footer>
  );
}

function RevealStyles() {
  return (
    <style>{`
      [data-reveal]{opacity:0;transform:translateY(24px);transition:opacity 1s cubic-bezier(.22,1,.36,1),transform 1s cubic-bezier(.22,1,.36,1);}
      [data-reveal].is-visible{opacity:1;transform:none;}
    `}</style>
  );
}

function Index() {
  useReveal();
  return (
    <div className="bg-cream">
      <RevealStyles />
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Jurta />
        <Why />
        <Events />
        <Testimonials />
        <Blog />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
