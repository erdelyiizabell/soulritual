import React, { useState, useEffect, useRef } from "react";
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

// ─── EmailJS (used if configured) ────────────────────────────────────────────
const EMAILJS_SERVICE_ID = "service_b3x3vph";
const EMAILJS_TEMPLATE_ID = "template_r3jdl0r";
const EMAILJS_PUBLIC_KEY = "0hiWiCqQxp86EdGXi";
const NOTIFY_EMAIL = "info@soulritual.hu";

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
  color?: "earth" | "gold"; // accent colour for modal header
}

// ─── Storage helpers ──────────────────────────────────────────────────────────
const STORAGE_KEY = "soulritual_event_regs_v2";

interface Reg {
  id: string;
  eventId: string;
  name: string;
  email: string;
  phone?: string;
  createdAt: string;
}

function getRegs(eventId: string): Reg[] {
  try {
    const all: Reg[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return all.filter((r) => r.eventId === eventId);
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

function alreadyRegistered(eventId: string, email: string): boolean {
  return getRegs(eventId).some(
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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gdpr, setGdpr] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);

  const regs = getRegs(event.id);
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
    onClose();
  }

  function validate() {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Kérjük, add meg a nevedet.";
    if (!email.trim()) e.email = "Kérjük, add meg az e-mail címedet.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      e.email = "Érvényes e-mail cím szükséges.";
    else if (alreadyRegistered(event.id, email.trim()))
      e.email = "Ezzel az e-mail címmel már van jelentkezés.";
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
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim() || undefined,
      createdAt: new Date().toISOString(),
    };

    saveReg(rec);

    const templateParams = {
      from_name: rec.name,
      from_email: rec.email,
      phone: rec.phone || "–",
      event_title: event.title,
      event_date: event.date,
      event_time: event.time,
      event_location: event.location,
      submitted_at: new Date().toLocaleString("hu-HU"),
      reply_to: rec.email,
    };

    try {
      // Dynamic import so bundle stays lean when emailjs is unused
      const emailjs = await import("@emailjs/browser");
      await emailjs.default.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );
    } catch {
      // Fallback: formsubmit.co (no account needed)
      try {
        await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(NOTIFY_EMAIL)}`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            _subject: `Új jelentkezés: ${event.title} — ${rec.name}`,
            _template: "table",
            _captcha: "false",
            Név: rec.name,
            "E-mail": rec.email,
            Telefon: rec.phone || "–",
            Esemény: event.title,
            Időpont: `${event.date} ${event.time}`,
            Helyszín: event.location,
            Beküldve: new Date().toLocaleString("hu-HU"),
          }),
        });
      } catch {
        // Last resort: open mailto
        const sub = encodeURIComponent(`Új jelentkezés: ${event.title} — ${rec.name}`);
        const body = encodeURIComponent(
          `Név: ${rec.name}\nE-mail: ${rec.email}\nTelefon: ${rec.phone || "–"}\nEsemény: ${event.title}\nIdőpont: ${event.date} ${event.time}`
        );
        window.open(`mailto:${NOTIFY_EMAIL}?subject=${sub}&body=${body}`, "_blank");
      }
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
            className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full border border-earth/15 text-earth/60 transition hover:border-gold hover:text-earth hover:bg-white/60"
          >
            <X className="h-4.5 w-4.5" />
          </button>

          <p className="eyebrow" style={{ color: accent }}>
            Jelentkezés
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
              {event.date}
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
                {isFull ? "Megtelt" : `${spotsLeft} szabad hely`}
              </span>
            )}
            {event.price && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/60 border border-earth/10 px-3 py-1 text-earth/80">
                {event.price}
              </span>
            )}
          </div>
        </div>

        <div className="px-7 pb-8">
          {!done ? (
            /* ── Form ── */
            <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
              {isFull ? (
                <p className="rounded-2xl bg-linen border border-gold/30 p-5 text-center text-sm text-earth/80">
                  Ez az alkalom sajnos már megtelt.<br />
                  Érdeklődj a <a href="mailto:info@soulritual.hu" className="font-medium text-gold underline-offset-2 underline">várólistára</a> kerülésről!
                </p>
              ) : (
                <>
                  {/* Name */}
                  <div>
                    <label htmlFor="er-name" className="block text-[11px] font-semibold tracking-wider uppercase text-earth/70 mb-1.5">
                      Teljes név <span className="text-destructive">*</span>
                    </label>
                    <input
                      ref={nameRef}
                      id="er-name"
                      type="text"
                      value={name}
                      autoComplete="name"
                      placeholder="pl. Nagy Kata"
                      onChange={(e) => { setName(e.target.value); setErrors((p) => ({ ...p, name: "" })); }}
                      className={`w-full rounded-xl border bg-linen/60 px-4 py-3 text-sm text-earth placeholder:text-earth/35 focus:border-gold focus:outline-none transition ${
                        errors.name ? "border-destructive ring-1 ring-destructive" : "border-earth/20"
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
                    <label htmlFor="er-email" className="block text-[11px] font-semibold tracking-wider uppercase text-earth/70 mb-1.5">
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
                        onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: "" })); }}
                        className={`w-full rounded-xl border bg-linen/60 pl-10 pr-4 py-3 text-sm text-earth placeholder:text-earth/35 focus:border-gold focus:outline-none transition ${
                          errors.email ? "border-destructive ring-1 ring-destructive" : "border-earth/20"
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
                    <label htmlFor="er-phone" className="block text-[11px] font-semibold tracking-wider uppercase text-earth/70 mb-1.5">
                      Telefonszám <span className="text-earth/35 font-normal normal-case text-[10px]">(nem kötelező)</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-earth/35" />
                      <input
                        id="er-phone"
                        type="tel"
                        value={phone}
                        autoComplete="tel"
                        placeholder="+36 30 123 4567"
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full rounded-xl border border-earth/20 bg-linen/60 pl-10 pr-4 py-3 text-sm text-earth placeholder:text-earth/35 focus:border-gold focus:outline-none transition"
                      />
                    </div>
                  </div>

                  {/* GDPR checkbox */}
                  <label className={`flex items-start gap-3 cursor-pointer select-none rounded-2xl p-4 border transition ${errors.gdpr ? "border-destructive/40 bg-destructive/5" : "border-earth/10 bg-linen/50"}`}>
                    <div className="mt-0.5 shrink-0">
                      <input
                        type="checkbox"
                        checked={gdpr}
                        onChange={(e) => { setGdpr(e.target.checked); setErrors((p) => ({ ...p, gdpr: "" })); }}
                        className="sr-only"
                      />
                      <div className={`h-5 w-5 rounded-md border flex items-center justify-center transition ${gdpr ? "bg-earth border-earth text-cream" : "border-earth/30 bg-cream"}`}>
                        {gdpr && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                      </div>
                    </div>
                    <span className="text-xs leading-relaxed text-earth/80">
                      Hozzájárulok, hogy az adataimat a Soul Ritual a jelentkezésem visszaigazolásához felhasználja. Adataimat harmadik félnek nem adják át, és bármikor kérhetem törlésüket.
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
                      <span>Küldés...</span>
                    ) : (
                      <>
                        <Check className="h-4 w-4" />
                        <span>Jelentkezem</span>
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                  <p className="text-center text-[11px] text-earth/40">
                    Ingyenes · Visszaigazolás e-mailben · Adataid védve
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
              <p className="eyebrow" style={{ color: accent }}>Sikeresen elküldve</p>
              <h3 className="mt-2 font-display text-2xl text-earth">Jelentkezésed rögzítettük! ✦</h3>
              <p className="mt-3 text-sm leading-relaxed text-earth/70 max-w-sm mx-auto">
                Kedves <strong>{name}</strong>, hamarosan visszaigazolót küldünk a{" "}
                <strong>{email}</strong> e-mail címre.
              </p>

              <div className="mt-6 rounded-2xl bg-linen border border-gold/25 p-5 text-left text-sm space-y-2">
                <div className="flex items-center gap-3 text-earth/75">
                  <Calendar className="h-4 w-4 shrink-0 text-gold" />
                  <span><strong>{event.date}</strong> · {event.time}</span>
                </div>
                <div className="flex items-center gap-3 text-earth/75">
                  <MapPin className="h-4 w-4 shrink-0 text-gold" />
                  <span>{event.location}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={reset}
                className="mt-8 inline-flex items-center justify-center rounded-full border border-earth/20 px-8 py-3 text-xs tracking-[0.22em] uppercase text-earth/70 transition hover:border-gold hover:text-earth cursor-pointer"
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
