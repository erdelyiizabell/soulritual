import React, { createElement, useState, useEffect, useRef } from "react";
import {
  X,
  Check,
  Mail,
  Phone,
  Sparkles,
  AlertCircle,
  ArrowRight,
  Users,
  Calendar,
  Clock,
  MapPin,
} from "lucide-react";

// ─── Google Sheets & EmailJS végpontok ────────────────────────────────────────
const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxAYJBGkm6gWNt2UZ8T2wm8_HEV2vuKlcHg7ZQmT2VQ7d2UgqW1Js0rTjGdYXScr5wg/exec";
const GOOGLE_SCRIPT_URL_ALT =
  "https://script.google.com/macros/s/AKfycbwlCkLgtx_vq1xk_ZEHYIKkzbGh0_nN8bhJ9SDW24_bPpNcaCHYecRXKufLSH2hG15W/exec";

const EMAILJS_SERVICE_ID = "service_b3x3vph";
const EMAILJS_TEMPLATE_ID = "template_r3jdl0r";
const EMAILJS_PUBLIC_KEY = "0hiWiCqQxp86EdGXi";
const NOTIFY_EMAIL = "info@soulritual.hu";
const STRIPE_PUBLISHABLE_KEY =
  "pk_live_51TuujmV05iqq8bsGEcHVCXqFKMY0AxcMuwOwl5qe5TvQjDsGHeim19TM3GD0052Ou0iGQVf8ekIiA5Qlue28GEx600agL81W3h";

// ─── Types ────────────────────────────────────────────────────────────────────
export interface EventInfo {
  id: string;
  title: string;
  subtitle?: string;
  date: string;
  time: string;
  location: string;
  capacity?: number; // undefined = no limit shown
  price?: string;
  stripeBuyButtonId?: string;
  stripePaymentUrl?: string;
  color?: "earth" | "gold"; // accent colour for modal header
}

// ─── Következő 4 csütörtöki dátum kiszámítása a jurtás jógához ────────────────
export function getUpcomingThursdays(count = 4): string[] {
  const result: string[] = [];
  const now = new Date();
  const current = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  // 4 = Thursday
  let daysUntilThursday = (4 - current.getDay() + 7) % 7;
  // Ha ma csütörtök van, de már elmúlt 10:30, akkor a jövő hetit mutassa elsőként
  if (daysUntilThursday === 0 && now.getHours() >= 11) {
    daysUntilThursday = 7;
  }

  current.setDate(current.getDate() + daysUntilThursday);

  for (let i = 0; i < count; i++) {
    const formatted = current.toLocaleDateString("hu-HU", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    result.push(`${formatted} (csütörtök)`);
    current.setDate(current.getDate() + 7);
  }
  return result;
}

// ─── Storage helpers (dátum-specifikus létszámkövetés) ────────────────────────
const STORAGE_KEY = "soulritual_event_regs_v3";

interface Reg {
  id: string;
  eventId: string;
  selectedDate: string;
  name: string;
  email: string;
  phone?: string;
  createdAt: string;
}

export function getRegsForDate(eventId: string, selectedDate?: string): Reg[] {
  try {
    const all: Reg[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return all.filter(
      (r) =>
        r.eventId === eventId &&
        (!selectedDate || r.selectedDate === selectedDate)
    );
  } catch {
    return [];
  }
}

function saveReg(r: Reg) {
  try {
    const all: Reg[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    localStorage.setItem(STORAGE_KEY, JSON.stringify([r, ...all]));
  } catch {}
}

function alreadyRegistered(eventId: string, selectedDate: string, email: string): boolean {
  return getRegsForDate(eventId, selectedDate).some(
    (r) => r.email.toLowerCase() === email.toLowerCase()
  );
}

// ─── Props ────────────────────────────────────────────────────────────────────
interface Props {
  isOpen: boolean;
  onClose: () => void;
  event: EventInfo;
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function EventRegistrationModal({ isOpen, onClose, event }: Props) {
  const isWeeklyThursdayYoga = event.id === "jurta-yoga-thursday";
  const upcomingThursdays = getUpcomingThursdays(4);

  const [selectedDate, setSelectedDate] = useState<string>(
    isWeeklyThursdayYoga ? upcomingThursdays[0] : event.date
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gdpr, setGdpr] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [showOnlinePayment, setShowOnlinePayment] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);

  const regs = getRegsForDate(event.id, selectedDate);
  const spotsLeft =
    event.capacity !== undefined
      ? Math.max(0, event.capacity - regs.length)
      : null;
  const isFull = spotsLeft === 0;

  // ESC + body lock
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    setTimeout(() => nameRef.current?.focus(), 80);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && reset();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  if (!isOpen) return null;

  function reset() {
    setName("");
    setEmail("");
    setPhone("");
    setGdpr(false);
    setErrors({});
    setDone(false);
    setShowOnlinePayment(false);
    onClose();
  }

  function validate() {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Kérjük, add meg a nevedet.";
    if (!email.trim()) e.email = "Kérjük, add meg az e-mail címedet.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      e.email = "Érvényes e-mail cím szükséges.";
    else if (alreadyRegistered(event.id, selectedDate, email.trim()))
      e.email = "Erre a dátumra ezzel az e-mail címmel már van jelentkezésed.";
    if (!phone.trim()) e.phone = "Kérjük, add meg a telefonszámodat, hogy elérjünk.";
    if (!gdpr) e.gdpr = "Az adatkezelési hozzájárulás szükséges.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (isFull || !validate()) return;
    setSubmitting(true);

    const rec: Reg = {
      id: crypto.randomUUID?.() ?? String(Date.now()),
      eventId: event.id,
      selectedDate,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim() || undefined,
      createdAt: new Date().toISOString(),
    };

    saveReg(rec);

    // 1. Küldés a Google Sheet táblázatba (és azonnali e-mail értesítés az Apps Scripten keresztül)
    const sheetPayload = JSON.stringify({
      type: "feedback",
      name: rec.name,
      email: rec.email,
      rating: 5,
      feedback: `🧘‍♀️ JELENTKEZÉS: ${event.title} | Dátum: ${selectedDate} (${event.time}) | Tel: ${
        rec.phone || "-"
      }`,
    });

    for (const url of [GOOGLE_SCRIPT_URL, GOOGLE_SCRIPT_URL_ALT]) {
      fetch(url, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: sheetPayload,
      }).catch(() => {});
    }

    // 2. Küldés EmailJS / FormSubmit-on keresztül is
    const templateParams = {
      from_name: rec.name,
      from_email: rec.email,
      phone: rec.phone || "–",
      event_title: event.title,
      event_date: selectedDate,
      event_time: event.time,
      event_location: event.location,
      submitted_at: new Date().toLocaleString("hu-HU"),
      reply_to: rec.email,
    };

    try {
      const emailjs = await import("@emailjs/browser");
      await emailjs.default.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );
    } catch {
      try {
        await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(NOTIFY_EMAIL)}`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            _subject: `🧘‍♀️ Új jelentkezés: ${event.title} (${selectedDate}) — ${rec.name}`,
            _template: "table",
            _captcha: "false",
            Név: rec.name,
            "E-mail": rec.email,
            Telefon: rec.phone || "–",
            Esemény: event.title,
            "Kiválasztott dátum": `${selectedDate} · ${event.time}`,
            Helyszín: event.location,
            Beküldve: new Date().toLocaleString("hu-HU"),
          }),
        });
      } catch {}
    } finally {
      setSubmitting(false);
      setDone(true);
    }
  }

  const accent = event.color === "gold" ? "var(--gold)" : "var(--earth)";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center p-0 sm:p-6"
    >
      {/* Backdrop */}
      <div
        onClick={reset}
        className="fixed inset-0 bg-earth/70 backdrop-blur-md"
        style={{ animation: "fadeIn .25s ease both" }}
      />

      {/* Panel */}
      <div
        className="relative z-10 w-full max-w-lg max-h-[96vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl border border-gold/25 bg-cream shadow-2xl text-earth"
        style={{ animation: "slideUp .3s cubic-bezier(.22,1,.36,1) both" }}
      >
        {/* ── Coloured header strip ── */}
        <div
          className="px-7 pt-8 pb-6 rounded-t-3xl sm:rounded-t-3xl"
          style={{ background: `color-mix(in oklab, ${accent} 10%, var(--cream))` }}
        >
          <button
            onClick={reset}
            aria-label="Bezárás"
            className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full border border-earth/15 text-earth/60 transition hover:border-gold hover:text-earth hover:bg-white/60 cursor-pointer"
          >
            <X className="h-4.5 w-4.5" />
          </button>

          <p className="eyebrow" style={{ color: accent }}>
            Bejelentkezés · Helyfoglalás
          </p>
          <h2
            id="modal-title"
            className="mt-2 font-display text-2xl sm:text-3xl leading-tight text-earth"
          >
            {event.title}
          </h2>

          {/* Meta pills */}
          <div className="mt-4 flex flex-wrap gap-2 text-[11px]">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/60 border border-earth/10 px-3 py-1 text-earth/80">
              <Calendar className="h-3 w-3" style={{ color: accent }} />
              {selectedDate}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/60 border border-earth/10 px-3 py-1 text-earth/80">
              <Clock className="h-3 w-3" style={{ color: accent }} />
              {event.time}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/60 border border-earth/10 px-3 py-1 text-earth/80">
              <MapPin className="h-3 w-3" style={{ color: accent }} />
              {event.location}
            </span>
            {spotsLeft !== null && (
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-medium border ${
                  isFull
                    ? "bg-destructive/10 border-destructive/30 text-destructive"
                    : spotsLeft <= 3
                    ? "bg-gold/15 border-gold/30 text-earth"
                    : "bg-white/60 border-earth/10 text-earth/80"
                }`}
              >
                <Users className="h-3 w-3" />
                {isFull ? "Megtelt" : `${spotsLeft} / ${event.capacity} szabad hely`}
              </span>
            )}
            {event.price && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/15 border border-gold/30 px-3 py-1 font-semibold text-earth">
                {event.price}
              </span>
            )}
          </div>
        </div>

        <div className="px-7 pb-8">
          {!done ? (
            /* ── Form ── */
            <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
              {/* Ha csütörtöki jóga, dátumválasztó a következő 4 csütörtökre */}
              {isWeeklyThursdayYoga && (
                <div>
                  <label
                    htmlFor="er-date"
                    className="block text-[11px] font-semibold tracking-wider uppercase text-earth/70 mb-1.5"
                  >
                    Melyik csütörtöki alkalomra érkezel? <span className="text-destructive">*</span>
                  </label>
                  <select
                    id="er-date"
                    value={selectedDate}
                    onChange={(e) => {
                      setSelectedDate(e.target.value);
                      setErrors((p) => ({ ...p, email: "" }));
                    }}
                    className="w-full rounded-xl border border-earth/20 bg-linen/70 px-4 py-3 text-sm font-medium text-earth focus:border-gold focus:outline-none transition"
                  >
                    {upcomingThursdays.map((th) => {
                      const count = getRegsForDate(event.id, th).length;
                      const rem =
                        event.capacity !== undefined
                          ? Math.max(0, event.capacity - count)
                          : null;
                      return (
                        <option key={th} value={th} disabled={rem === 0}>
                          {th} · 10:00–11:15{" "}
                          {rem !== null
                            ? rem === 0
                              ? "(MEGTELT)"
                              : `(${rem} szabad hely)`
                            : ""}
                        </option>
                      );
                    })}
                  </select>
                </div>
              )}

              {isFull ? (
                <p className="rounded-2xl bg-linen border border-gold/30 p-5 text-center text-sm text-earth/80">
                  Ez az alkalom sajnos már megtelt (max. {event.capacity} fő).
                  <br />
                  Válassz másik csütörtöki időpontot fent, vagy érdeklődj a{" "}
                  <a
                    href="mailto:info@soulritual.hu"
                    className="font-medium text-gold underline-offset-2 underline"
                  >
                    várólistára
                  </a>{" "}
                  kerülésről!
                </p>
              ) : (
                <>
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="er-name"
                      className="block text-[11px] font-semibold tracking-wider uppercase text-earth/70 mb-1.5"
                    >
                      Teljes név <span className="text-destructive">*</span>
                    </label>
                    <input
                      ref={nameRef}
                      id="er-name"
                      type="text"
                      value={name}
                      autoComplete="name"
                      placeholder="pl. Nagy Kata"
                      onChange={(e) => {
                        setName(e.target.value);
                        setErrors((p) => ({ ...p, name: "" }));
                      }}
                      className={`w-full rounded-xl border bg-linen/60 px-4 py-3 text-sm text-earth placeholder:text-earth/35 focus:border-gold focus:outline-none transition ${
                        errors.name
                          ? "border-destructive ring-1 ring-destructive"
                          : "border-earth/20"
                      }`}
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-destructive flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" /> {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="er-email"
                      className="block text-[11px] font-semibold tracking-wider uppercase text-earth/70 mb-1.5"
                    >
                      E-mail cím <span className="text-destructive">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-earth/35" />
                      <input
                        id="er-email"
                        type="email"
                        value={email}
                        autoComplete="email"
                        placeholder="pl. kata@pelda.hu"
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setErrors((p) => ({ ...p, email: "" }));
                        }}
                        className={`w-full rounded-xl border bg-linen/60 pl-10 pr-4 py-3 text-sm text-earth placeholder:text-earth/35 focus:border-gold focus:outline-none transition ${
                          errors.email
                            ? "border-destructive ring-1 ring-destructive"
                            : "border-earth/20"
                        }`}
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-xs text-destructive flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" /> {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label
                      htmlFor="er-phone"
                      className="block text-[11px] font-semibold tracking-wider uppercase text-earth/70 mb-1.5"
                    >
                      Telefonszám <span className="text-destructive">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-earth/35" />
                      <input
                        id="er-phone"
                        type="tel"
                        value={phone}
                        autoComplete="tel"
                        placeholder="+36 30 123 4567"
                        onChange={(e) => {
                          setPhone(e.target.value);
                          setErrors((p) => ({ ...p, phone: "" }));
                        }}
                        className={`w-full rounded-xl border bg-linen/60 pl-10 pr-4 py-3 text-sm text-earth placeholder:text-earth/35 focus:border-gold focus:outline-none transition ${
                          errors.phone
                            ? "border-destructive ring-1 ring-destructive"
                            : "border-earth/20"
                        }`}
                      />
                    </div>
                    {errors.phone && (
                      <p className="mt-1 text-xs text-destructive flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" /> {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* GDPR checkbox */}
                  <label
                    className={`flex items-start gap-3 cursor-pointer select-none rounded-2xl p-4 border transition ${
                      errors.gdpr
                        ? "border-destructive/40 bg-destructive/5"
                        : "border-earth/10 bg-linen/50"
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">
                      <input
                        type="checkbox"
                        checked={gdpr}
                        onChange={(e) => {
                          setGdpr(e.target.checked);
                          setErrors((p) => ({ ...p, gdpr: "" }));
                        }}
                        className="sr-only"
                      />
                      <div
                        className={`h-5 w-5 rounded-md border flex items-center justify-center transition ${
                          gdpr
                            ? "bg-earth border-earth text-cream"
                            : "border-earth/30 bg-cream"
                        }`}
                      >
                        {gdpr && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                      </div>
                    </div>
                    <span className="text-xs leading-relaxed text-earth/80">
                      Hozzájárulok, hogy az adataimat a Soul Ritual a jelentkezésem
                      visszaigazolásához felhasználja. Adataimat harmadik félnek nem adják át.
                    </span>
                  </label>
                  {errors.gdpr && (
                    <p className="text-xs text-destructive flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" /> {errors.gdpr}
                    </p>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="mt-2 w-full inline-flex items-center justify-center gap-2.5 rounded-full px-8 py-4 text-xs font-semibold tracking-[0.22em] uppercase text-cream transition shadow-md disabled:opacity-60 cursor-pointer"
                    style={{ background: accent }}
                  >
                    {submitting ? (
                      <span>Jelentkezés rögzítése...</span>
                    ) : (
                      <>
                        <Check className="h-4 w-4" />
                        <span>Lefoglalom a helyem</span>
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                  <p className="text-center text-[11px] text-earth/55">
                    Max. {event.capacity || 8} fő · A pontos címet a visszaigazolásban küldöm
                  </p>
                </>
              )}
            </form>
          ) : (
            /* ── Success ── */
            <div className="mt-6 text-center py-4">
              <div
                className="mx-auto grid h-16 w-16 place-items-center rounded-full mb-5"
                style={{ background: `color-mix(in oklab, ${accent} 15%, transparent)` }}
              >
                <Sparkles className="h-8 w-8 animate-pulse" style={{ color: accent }} />
              </div>
              <p className="eyebrow" style={{ color: accent }}>
                Sikeres jelentkezés
              </p>
              <h3 className="mt-2 font-display text-2xl text-earth">
                Helyedet lefoglaltuk! ✦
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-earth/75 max-w-sm mx-auto">
                Kedves <strong>{name}</strong>, szeretettel várlak! A jelentkezésed bekerült a
                nyilvántartásba, és visszaigazolást is küldtünk a <strong>{email}</strong> címre.
              </p>

              <div className="mt-6 rounded-2xl bg-linen border border-gold/25 p-5 text-left text-sm space-y-2">
                <div className="flex items-center gap-3 text-earth/80">
                  <Calendar className="h-4 w-4 shrink-0 text-gold" />
                  <span>
                    <strong>{selectedDate}</strong> · {event.time}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-earth/80">
                  <MapPin className="h-4 w-4 shrink-0 text-gold" />
                  <span>{event.location}</span>
                </div>
              </div>

              {/* Opcionális online kártyás fizetés a regisztráció után — sötétbarna gombbal */}
              {(event.stripePaymentUrl || event.stripeBuyButtonId) && (
                <div className="mt-6 rounded-2xl border border-gold/35 bg-linen/60 p-5 space-y-3">
                  <p className="text-xs leading-relaxed text-earth/80">
                    A részvételi díjat (<strong>{event.price}</strong>) rendezheted személyesen a
                    helyszínen, vagy kifizetheted most online bankkártyával:
                  </p>
                  {event.stripePaymentUrl ? (
                    <a
                      href={event.stripePaymentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-earth py-3.5 px-6 text-xs font-semibold tracking-[0.18em] uppercase text-cream shadow-md transition hover:bg-gold"
                    >
                      <span>Online bankkártyás fizetés ({event.price})</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </a>
                  ) : !showOnlinePayment ? (
                    <button
                      type="button"
                      onClick={() => setShowOnlinePayment(true)}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-earth py-3.5 px-6 text-xs font-semibold tracking-[0.18em] uppercase text-cream shadow-md transition hover:bg-gold cursor-pointer"
                    >
                      <span>Online bankkártyás fizetés ({event.price})</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  ) : (
                    <div className="flex justify-center pt-2">
                      {createElement("stripe-buy-button", {
                        "buy-button-id": event.stripeBuyButtonId,
                        "publishable-key": STRIPE_PUBLISHABLE_KEY,
                      })}
                    </div>
                  )}
                </div>
              )}

              <button
                type="button"
                onClick={reset}
                className="mt-7 inline-flex items-center justify-center rounded-full border border-earth/20 px-8 py-3 text-xs tracking-[0.22em] uppercase text-earth/70 transition hover:border-gold hover:text-earth cursor-pointer"
              >
                Bezárom
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity:0 } to { opacity:1 } }
        @keyframes slideUp { from { opacity:0; transform:translateY(24px) } to { opacity:1; transform:none } }
      `}</style>
    </div>
  );
}
