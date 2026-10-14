import React, { useState, useEffect } from "react";
import {
  Check,
  Mail,
  Users,
  AlertCircle,
  Sparkles,
  Download,
  Trash2,
  ChevronDown,
} from "lucide-react";

// ─── Constants ────────────────────────────────────────────────────────────────
const STORAGE_KEY = "soulritual_yoga_registrations";
const MAX_CAPACITY = 10;
const TARGET_EMAIL = "info@soulritual.hu";
const FIRST_CLASS_DATE = "2026. október 22. (csütörtök)";

// ─── Types ────────────────────────────────────────────────────────────────────
export interface YogaRegistration {
  id: string;
  name: string;
  email: string;
  registeredAt: string;
}

// ─── Storage helpers ──────────────────────────────────────────────────────────
function getRegistrations(): YogaRegistration[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function addRegistration(r: YogaRegistration): YogaRegistration[] {
  try {
    const current = getRegistrations();
    const updated = [r, ...current];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return getRegistrations();
  }
}

function isAlreadyRegistered(email: string): boolean {
  return getRegistrations().some(
    (r) => r.email.toLowerCase() === email.toLowerCase()
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function YogaSignup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submittedName, setSubmittedName] = useState("");
  const [registrations, setRegistrations] = useState<YogaRegistration[]>([]);
  const [showAdmin, setShowAdmin] = useState(false);

  useEffect(() => {
    setRegistrations(getRegistrations());
  }, []);

  const spotsLeft = Math.max(0, MAX_CAPACITY - registrations.length);
  const isFull = spotsLeft === 0;

  const validate = (): boolean => {
    const errs: { name?: string; email?: string } = {};
    if (!name.trim()) errs.name = "Kérjük, add meg a nevedet.";
    if (!email.trim()) {
      errs.email = "Kérjük, add meg az e-mail címedet.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errs.email = "Érvényes e-mail cím szükséges.";
    } else if (isAlreadyRegistered(email.trim())) {
      errs.email = "Ez az e-mail cím már be van jelentkezve.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isFull || !validate()) return;

    setIsSubmitting(true);

    const record: YogaRegistration = {
      id: crypto.randomUUID?.() ?? String(Date.now()),
      name: name.trim(),
      email: email.trim(),
      registeredAt: new Date().toISOString(),
    };

    // Send notification email via Formsubmit
    try {
      await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(TARGET_EMAIL)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `Új jóga bejelentkezés: ${record.name} (${FIRST_CLASS_DATE})`,
          _template: "table",
          _captcha: "false",
          "Név": record.name,
          "E-mail": record.email,
          "Esemény": "Női jóga — csütörtöki óra",
          "Első óra": FIRST_CLASS_DATE,
          "Bejelentkezés időpontja": new Date().toLocaleString("hu-HU"),
        }),
      });
    } catch (err) {
      console.warn("E-mail küldési hiba:", err);
    } finally {
      const updated = addRegistration(record);
      setRegistrations(updated);
      setSubmittedName(record.name);
      setIsSubmitting(false);
      setSubmitted(true);
    }
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setErrors({});
    setSubmitted(false);
    setSubmittedName("");
  };

  const handleExportCsv = () => {
    const list = getRegistrations();
    if (!list.length) return;
    const header = "Név,E-mail,Bejelentkezés ideje\n";
    const rows = list
      .map((r) => `"${r.name.replace(/"/g, '""')}","${r.email}","${r.registeredAt}"`)
      .join("\n");
    const blob = new Blob([header + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `yoga-bejelentkezesek-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    if (window.confirm("Biztosan törölni szeretnéd az összes bejelentkezést a böngészőből?")) {
      localStorage.removeItem(STORAGE_KEY);
      setRegistrations([]);
    }
  };

  return (
    <section id="yoga-signup" className="relative bg-earth px-6 py-28 lg:py-40 overflow-hidden">
      {/* Decorative background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 70% 40%, color-mix(in oklab, var(--gold) 12%, transparent), transparent)",
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        {/* ── Section header ───────────────────────────────── */}
        <div className="max-w-2xl" data-reveal>
          <p className="eyebrow text-gold-soft">Heti rendszerességű óra</p>
          <h2 className="mt-6 text-4xl leading-tight text-cream sm:text-5xl lg:text-6xl">
            Női jóga —{" "}
            <em className="italic text-gold-soft">csütörtökönként</em>.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-cream/75 sm:text-lg">
            Csatlakozz a heti jóga körünkhöz! Az első alkalom{" "}
            <strong className="text-gold-soft">{FIRST_CLASS_DATE}</strong> lesz.
            A csoport intim, biztonságos és kis létszámú — maximum{" "}
            <strong className="text-gold-soft">{MAX_CAPACITY} fő</strong> számára.
          </p>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-20 items-start" data-reveal>
          {/* ── Info card ─────────────────────────────────── */}
          <div className="space-y-6">
            {[
              { label: "Első alkalom", value: FIRST_CLASS_DATE },
              { label: "Helyszín", value: "Soul Ritual Jurta · Tök" },
              { label: "Létszám", value: `Maximum ${MAX_CAPACITY} fő` },
              { label: "Bejelentkezés", value: "Csak Név + E-mail szükséges" },
            ].map(({ label, value }) => (
              <div key={label} className="flex gap-5 border-t border-cream/10 pt-5">
                <span className="font-display text-xl italic text-gold-soft w-2 shrink-0 mt-1">✦</span>
                <div>
                  <p className="text-[10px] tracking-[0.24em] uppercase text-cream/45">{label}</p>
                  <p className="mt-1 text-lg text-cream/90">{value}</p>
                </div>
              </div>
            ))}

            {/* Capacity bar */}
            <div className="pt-2">
              <div className="flex items-center justify-between text-[11px] tracking-wider uppercase text-cream/55 mb-2">
                <span className="flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5 text-gold-soft" />
                  Szabad helyek
                </span>
                <span className={spotsLeft <= 3 ? "text-gold-soft font-semibold" : ""}>
                  {spotsLeft} / {MAX_CAPACITY}
                </span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-cream/10 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-gold-soft to-gold transition-all duration-700"
                  style={{ width: `${((MAX_CAPACITY - spotsLeft) / MAX_CAPACITY) * 100}%` }}
                />
              </div>
              {spotsLeft <= 3 && spotsLeft > 0 && (
                <p className="mt-2 text-xs text-gold-soft animate-pulse">
                  ⚡ Csak {spotsLeft} hely maradt!
                </p>
              )}
              {isFull && (
                <p className="mt-2 text-xs text-destructive font-medium">
                  Sajnos a csoport megtelt. Írj nekünk e-mailt a várólistára kerüléshez!
                </p>
              )}
            </div>
          </div>

          {/* ── Sign-up form / success ─────────────────────── */}
          <div className="rounded-3xl border border-gold/20 bg-cream/5 backdrop-blur-sm p-8 sm:p-10">
            {submitted ? (
              /* Success state */
              <div className="text-center py-4">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-gold/20 text-gold mb-5">
                  <Sparkles className="h-7 w-7 animate-pulse" />
                </div>
                <h3 className="font-display text-2xl text-cream">Bejelentkezve! ✦</h3>
                <p className="mt-3 text-sm text-cream/70">
                  Kedves <strong className="text-gold-soft">{submittedName}</strong>,
                  sikeresen feliratkoztál a csütörtöki jóga csoportba. Hamarosan
                  küldünk egy visszaigazolót!
                </p>
                <button
                  type="button"
                  onClick={handleReset}
                  className="mt-8 inline-flex items-center justify-center rounded-full border border-cream/30 px-8 py-3 text-xs tracking-[0.22em] uppercase text-cream/80 transition hover:border-gold hover:text-gold cursor-pointer"
                >
                  Újabb bejelentkezés
                </button>
              </div>
            ) : (
              /* Form */
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div>
                  <h3 className="font-display text-xl text-cream">
                    Foglald le a helyed
                  </h3>
                  <p className="mt-1 text-xs text-cream/50">
                    Név és e-mail cím elegendő — ingyenes, online fizetés nélkül.
                  </p>
                </div>

                {/* Name */}
                <div>
                  <label
                    htmlFor="yoga-name"
                    className="block text-[11px] font-semibold tracking-wider uppercase text-cream/70 mb-1.5"
                  >
                    Teljes név <span className="text-gold-soft">*</span>
                  </label>
                  <input
                    id="yoga-name"
                    type="text"
                    value={name}
                    autoComplete="name"
                    placeholder="pl. Nagy Kata"
                    disabled={isFull}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) setErrors({ ...errors, name: undefined });
                    }}
                    className={`w-full rounded-xl border bg-white/8 px-4 py-3 text-sm text-cream placeholder:text-cream/30 focus:border-gold focus:outline-none transition disabled:opacity-40 ${
                      errors.name
                        ? "border-destructive ring-1 ring-destructive"
                        : "border-cream/20"
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
                    htmlFor="yoga-email"
                    className="block text-[11px] font-semibold tracking-wider uppercase text-cream/70 mb-1.5"
                  >
                    E-mail cím <span className="text-gold-soft">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-cream/30" />
                    <input
                      id="yoga-email"
                      type="email"
                      value={email}
                      autoComplete="email"
                      placeholder="pl. kata@pelda.hu"
                      disabled={isFull}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors({ ...errors, email: undefined });
                      }}
                      className={`w-full rounded-xl border bg-white/8 pl-10 pr-4 py-3 text-sm text-cream placeholder:text-cream/30 focus:border-gold focus:outline-none transition disabled:opacity-40 ${
                        errors.email
                          ? "border-destructive ring-1 ring-destructive"
                          : "border-cream/20"
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-xs text-destructive flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" /> {errors.email}
                    </p>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isFull || isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2.5 rounded-full bg-gold px-8 py-4 text-xs font-semibold tracking-[0.22em] uppercase text-earth transition hover:bg-cream disabled:opacity-50 cursor-pointer shadow-md mt-2"
                >
                  {isSubmitting ? (
                    <span>Bejelentkezés...</span>
                  ) : isFull ? (
                    <span>Sajnos megtelt</span>
                  ) : (
                    <>
                      <Check className="h-4 w-4" />
                      <span>Bejelentkezem a jógára</span>
                    </>
                  )}
                </button>
                <p className="text-center text-[11px] text-cream/40">
                  Ingyenes · Visszaigazolás e-mailben · Adataid védve
                </p>
              </form>
            )}

            {/* ── Admin helper ─────────────────────────── */}
            <div className="mt-6 pt-4 border-t border-cream/10 flex items-center justify-between text-[11px] text-cream/30">
              <span>Soul Ritual · Jóga bejelentkezések</span>
              <button
                type="button"
                onClick={() => setShowAdmin(!showAdmin)}
                className="flex items-center gap-1 hover:text-gold-soft underline cursor-pointer"
              >
                {showAdmin ? "Elrejtés" : `Lista (${registrations.length} fő)`}
                <ChevronDown
                  className={`h-3 w-3 transition-transform ${showAdmin ? "rotate-180" : ""}`}
                />
              </button>
            </div>

            {showAdmin && (
              <div className="mt-3 rounded-xl bg-earth/40 border border-cream/10 p-4 text-xs text-cream/80">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold flex items-center gap-1.5">
                    <Users className="h-3.5 w-3.5 text-gold-soft" />
                    Bejelentkezők ({registrations.length} / {MAX_CAPACITY})
                  </span>
                  <div className="flex items-center gap-2">
                    {registrations.length > 0 && (
                      <>
                        <button
                          type="button"
                          onClick={handleExportCsv}
                          className="flex items-center gap-1 hover:text-gold-soft cursor-pointer"
                          title="CSV letöltés"
                        >
                          <Download className="h-3.5 w-3.5" /> CSV
                        </button>
                        <button
                          type="button"
                          onClick={handleClear}
                          className="hover:text-destructive cursor-pointer"
                          title="Lista törlése"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
                {registrations.length === 0 ? (
                  <p className="italic text-cream/40">Még nincs bejelentkezés.</p>
                ) : (
                  <div className="max-h-48 overflow-y-auto space-y-2 pr-1">
                    {registrations.map((r, idx) => (
                      <div
                        key={r.id}
                        className="rounded-lg bg-earth/60 border border-cream/10 px-3 py-2 flex items-center justify-between gap-3"
                      >
                        <div>
                          <span className="font-medium text-cream/90">{idx + 1}. {r.name}</span>
                          <span className="block text-[10px] text-cream/50">{r.email}</span>
                        </div>
                        <span className="text-[10px] text-cream/35 shrink-0">
                          {new Date(r.registeredAt).toLocaleDateString("hu-HU")}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
