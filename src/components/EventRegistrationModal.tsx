import React, { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import {
  X,
  Check,
  Calendar,
  Clock,
  MapPin,
  Users,
  Mail,
  Phone,
  Sparkles,
  AlertCircle,
  CalendarCheck,
  ArrowRight,
  ShieldCheck,
  Download,
  Trash2,
} from "lucide-react";

const EMAILJS_SERVICE_ID = "service_b3x3vph";
const EMAILJS_TEMPLATE_ID = "template_r3jdl0r";
const EMAILJS_PUBLIC_KEY = "0hiWiCqQxp86EdGXi";

export interface EventDetails {
  id: string;
  title: string;
  date: string;
  time?: string;
  location?: string;
  desc?: string;
  price?: string;
  capacity?: string;
  facilitator?: string;
  email?: string;
}

export interface RegistrationRecord {
  id: string;
  eventId: string;
  eventTitle: string;
  eventDate: string;
  name: string;
  email: string;
  phone?: string;
  note?: string;
  committed: boolean;
  cancellationAccepted: boolean;
  createdAt: string;
}

interface EventRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: EventDetails;
}

const STORAGE_KEY = "soulritual_event_registrations";

function getSavedRegistrations(): RegistrationRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveRegistration(record: RegistrationRecord) {
  try {
    const current = getSavedRegistrations();
    const updated = [record, ...current];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error("Hiba a mentéskor:", err);
  }
}

export default function EventRegistrationModal({
  isOpen,
  onClose,
  event,
}: EventRegistrationModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [committed, setCommitted] = useState(false);
  const [cancellationAccepted, setCancellationAccepted] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [showAdminList, setShowAdminList] = useState(false);
  const [savedList, setSavedList] = useState<RegistrationRecord[]>([]);

  // ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
      setSavedList(getSavedRegistrations());
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!name.trim()) {
      errs.name = "Kérjük, add meg a teljes nevedet.";
    }
    if (!email.trim()) {
      errs.email = "Kérjük, add meg az e-mail címedet.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errs.email = "Kérjük, érvényes e-mail címet adj meg.";
    }
    if (!committed) {
      errs.committed = "Kérjük, jelöld be a részvételi szándékot.";
    }
    if (!cancellationAccepted) {
      errs.cancellationAccepted =
        "Kérjük, fogadd el a lemondási feltételt (legkésőbb 2 nappal előtte).";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const record: RegistrationRecord = {
      id: window.crypto && crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
      eventId: event.id,
      eventTitle: event.title,
      eventDate: event.date,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim() || undefined,
      note: note.trim() || undefined,
      committed,
      cancellationAccepted,
      createdAt: new Date().toISOString(),
    };

    // 1. Mentés a böngésző helyi tárhelyébe
    saveRegistration(record);
    setSavedList(getSavedRegistrations());

    // 2. Automatikus e-mail küldés a workshop@soulritual.hu címre (Formsubmit AJAX)
    try {
      const targetEmail = event.email || "workshop@soulritual.hu";
      await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(targetEmail)}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          _subject: `Új workshop jelentkezés: ${event.title} (${event.date})`,
          _template: "table",
          _captcha: "false",
          "Jelentkező neve": name.trim(),
          "E-mail címe": email.trim(),
          Telefonszáma: phone.trim() || "Nem adott meg",
          Esemény: event.title,
          Időpont: event.date,
          Helyszín: event.location || "Soul Ritual Jurta (Tök)",
          "Üzenet / Szándék": note.trim() || "Nincs külön megjegyzés",
          "Részvételi nyilatkozat": "Ott szeretnék lenni a workshopon!",
          "Lemondási feltétel": "Elfogadva (lemondás max. 2 nappal az esemény előtt)",
          "Jelentkezés időpontja": new Date().toLocaleString("hu-HU"),
        }),
      });
    } catch (err) {
      console.warn("Értesítő e-mail küldési hiba (helyi mentés sikeres):", err);
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    setName("");
    setEmail("");
    setPhone("");
    setNote("");
    setCommitted(false);
    setCancellationAccepted(false);
    setErrors({});
    setShowAdminList(false);
    onClose();
  };

  // Google Calendar Link generator
  const getGoogleCalendarUrl = () => {
    // 2026-10-24 10:00 to 17:00 CEST (UTC+2) -> 08:00Z to 15:00Z
    const startDate = "20261024T080000Z";
    const endDate = "20261024T150000Z";
    const title = encodeURIComponent(`${event.title} — Soul Ritual`);
    const details = encodeURIComponent(
      `Soul Ritual workshop Izabellával.\n\nHelyszín: Soul Ritual Jurta\nIdőpont: ${event.date} (${event.time || "10:00 - 17:00"})\n\nFontos tudnivaló: Ha mégsem tudsz eljönni, kérünk, legkésőbb 2 nappal az esemény előtt jelezd az info@soulritual.hu címen vagy a +36 30 407 85 83 telefonszámon!`,
    );
    const location = encodeURIComponent("Soul Ritual Jurta, természetközeli helyszín");
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=${details}&location=${location}`;
  };

  const handleExportCsv = () => {
    const list = getSavedRegistrations();
    if (list.length === 0) return;
    const header = "Név,E-mail,Telefon,Esemény,Dátum,Megjegyzés,Regisztráció ideje\n";
    const rows = list
      .map(
        (r) =>
          `"${r.name.replace(/"/g, '""')}","${r.email}","${r.phone || ""}","${r.eventTitle}","${r.eventDate}","${(r.note || "").replace(/"/g, '""')}","${r.createdAt}"`,
      )
      .join("\n");
    const blob = new Blob([header + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `soulritual-jelentkezesek-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClearList = () => {
    if (
      window.confirm(
        "Biztosan törölni szeretnéd a mentett jelentkezési előzményeket a böngészőből?",
      )
    ) {
      localStorage.removeItem(STORAGE_KEY);
      setSavedList([]);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop */}
      <div
        onClick={handleResetAndClose}
        className="fixed inset-0 bg-earth/75 backdrop-blur-md transition-opacity animate-in fade-in duration-300"
      />

      {/* Modal Dialog Container */}
      <div className="relative z-10 w-full max-w-xl max-h-[92vh] overflow-y-auto rounded-3xl border border-gold/30 bg-cream shadow-2xl text-earth p-6 sm:p-8 animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          aria-label="Ablak bezárása"
          className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full border border-earth/15 text-earth/70 transition hover:border-gold hover:text-earth hover:bg-linen"
        >
          <X className="h-5 w-5" />
        </button>

        {!isSubmitted ? (
          <div>
            {/* Header */}
            <div className="pr-8">
              <span className="eyebrow block">Jelentkezés a workshopra</span>
              <h2
                id="modal-title"
                className="mt-2 font-display text-2xl sm:text-3xl text-earth leading-tight"
              >
                {event.title}
              </h2>

              {/* Event Meta Badges */}
              <div className="mt-4 flex flex-wrap items-center gap-2.5 text-xs text-earth/80">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-sand/60 px-3 py-1 font-medium text-earth">
                  <Calendar className="h-3.5 w-3.5 text-gold" />
                  {event.date}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-sand/60 px-3 py-1 font-medium text-earth">
                  <Clock className="h-3.5 w-3.5 text-gold" />
                  {event.time || "10:00 – 17:00"}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-sand/60 px-3 py-1 font-medium text-earth">
                  <MapPin className="h-3.5 w-3.5 text-gold" />
                  {event.location || "Soul Ritual Jurta · Tök"}
                </span>
                {event.price && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-olive/15 px-3 py-1 font-medium text-olive">
                    <Sparkles className="h-3.5 w-3.5" />
                    {event.price} (helyszínen)
                  </span>
                )}
                <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/15 px-3 py-1 font-medium text-earth">
                  Online fizetés nélkül · Csak jelentkezés
                </span>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-earth/75 border-b border-earth/10 pb-4">
                A jelentkezéshez nem szükséges bankkártya vagy online fizetés — a helyedet az űrlap
                beküldésével foglalod le. A jurta meghitt mérete miatt a férőhelyek száma
                korlátozott (3–15 fő).
              </p>
            </div>

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="mt-6 space-y-5" noValidate>
              {/* Name field */}
              <div>
                <label
                  htmlFor="reg-name"
                  className="block text-xs font-semibold tracking-wider uppercase text-earth/90 mb-1.5"
                >
                  Teljes név <span className="text-destructive">*</span>
                </label>
                <input
                  id="reg-name"
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors({ ...errors, name: "" });
                  }}
                  placeholder="pl. Horváth Eszter"
                  className={`w-full rounded-xl border bg-linen/70 px-4 py-3 text-sm text-earth placeholder:text-earth/40 focus:border-gold focus:bg-cream focus:outline-none transition ${
                    errors.name ? "border-destructive ring-1 ring-destructive" : "border-earth/20"
                  }`}
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-destructive flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" /> {errors.name}
                  </p>
                )}
              </div>

              {/* Email field */}
              <div>
                <label
                  htmlFor="reg-email"
                  className="block text-xs font-semibold tracking-wider uppercase text-earth/90 mb-1.5"
                >
                  E-mail cím <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-earth/40" />
                  <input
                    id="reg-email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors({ ...errors, email: "" });
                    }}
                    placeholder="pl. eszter@pelda.hu"
                    className={`w-full rounded-xl border bg-linen/70 pl-10 pr-4 py-3 text-sm text-earth placeholder:text-earth/40 focus:border-gold focus:bg-cream focus:outline-none transition ${
                      errors.email
                        ? "border-destructive ring-1 ring-destructive"
                        : "border-earth/20"
                    }`}
                  />
                </div>
                {errors.email ? (
                  <p className="mt-1 text-xs text-destructive flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" /> {errors.email}
                  </p>
                ) : (
                  <p className="mt-1 text-[11px] text-earth/55">
                    Ide küldjük a megerősítést, a tudnivalókat és a jurta pontos megközelítését.
                  </p>
                )}
              </div>

              {/* Phone field */}
              <div>
                <label
                  htmlFor="reg-phone"
                  className="block text-xs font-semibold tracking-wider uppercase text-earth/90 mb-1.5"
                >
                  Telefonszám{" "}
                  <span className="text-earth/40 text-[10px] font-normal lowercase">
                    (opcionális)
                  </span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-earth/40" />
                  <input
                    id="reg-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+36 30 123 4567"
                    className="w-full rounded-xl border border-earth/20 bg-linen/70 pl-10 pr-4 py-3 text-sm text-earth placeholder:text-earth/40 focus:border-gold focus:bg-cream focus:outline-none transition"
                  />
                </div>
                <p className="mt-1 text-[11px] text-earth/55">
                  Kizárólag sürgős értesítés (pl. helyszíni eligazítás) esetén hívunk.
                </p>
              </div>

              {/* Optional Note / Intention */}
              <div>
                <label
                  htmlFor="reg-note"
                  className="block text-xs font-semibold tracking-wider uppercase text-earth/90 mb-1.5"
                >
                  Üzenet vagy szándék Izabellának{" "}
                  <span className="text-earth/40 text-[10px] font-normal lowercase">
                    (opcionális)
                  </span>
                </label>
                <textarea
                  id="reg-note"
                  rows={2}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Van-e bármilyen gondolatod, kérdésed vagy érzésed, amit szívesen megosztanál az érkezés előtt?..."
                  className="w-full rounded-xl border border-earth/20 bg-linen/70 px-4 py-2.5 text-sm text-earth placeholder:text-earth/40 focus:border-gold focus:bg-cream focus:outline-none transition resize-none"
                />
              </div>

              {/* Checkboxes container */}
              <div className="space-y-3 rounded-2xl bg-sand/35 p-4 border border-gold/25">
                {/* Frappáns Checkbox 1: Ott szeretnék lenni a workshopon */}
                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <div className="relative flex items-center pt-0.5">
                    <input
                      type="checkbox"
                      checked={committed}
                      onChange={(e) => {
                        setCommitted(e.target.checked);
                        if (errors.committed) setErrors({ ...errors, committed: "" });
                      }}
                      className="sr-only"
                    />
                    <div
                      className={`h-5 w-5 rounded-md border flex items-center justify-center transition ${
                        committed ? "bg-earth border-earth text-cream" : "border-earth/40 bg-cream"
                      }`}
                    >
                      {committed && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                    </div>
                  </div>
                  <span className="text-xs sm:text-sm font-medium leading-relaxed text-earth">
                    <span className="text-gold font-serif mr-1">✦</span>
                    <strong>Ott szeretnék lenni a workshopon!</strong> — Elfogadom a jelentkezést,
                    és elköteleződöm a jelenlétem mellett a Jurtában.
                  </span>
                </label>
                {errors.committed && (
                  <p className="ml-8 text-xs text-destructive flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" /> {errors.committed}
                  </p>
                )}

                {/* Lemondási szabályzat Checkbox 2: 2 nappal előtte */}
                <label className="flex items-start gap-3 cursor-pointer select-none pt-2 border-t border-earth/10">
                  <div className="relative flex items-center pt-0.5">
                    <input
                      type="checkbox"
                      checked={cancellationAccepted}
                      onChange={(e) => {
                        setCancellationAccepted(e.target.checked);
                        if (errors.cancellationAccepted)
                          setErrors({ ...errors, cancellationAccepted: "" });
                      }}
                      className="sr-only"
                    />
                    <div
                      className={`h-5 w-5 rounded-md border flex items-center justify-center transition ${
                        cancellationAccepted
                          ? "bg-earth border-earth text-cream"
                          : "border-earth/40 bg-cream"
                      }`}
                    >
                      {cancellationAccepted && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                    </div>
                  </div>
                  <span className="text-xs sm:text-sm leading-relaxed text-earth/85">
                    Tudomásul veszem a feltételeket:{" "}
                    <strong>
                      a lemondás legkésőbb 2 nappal (48 órával) a workshop előtt lehetséges
                    </strong>{" "}
                    az {event.email ? `${event.email}` : "info@soulritual.hu"} címen, hogy
                    megüresedés esetén átadhassuk a helyet valaki másnak.
                  </span>
                </label>
                {errors.cancellationAccepted && (
                  <p className="ml-8 text-xs text-destructive flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" /> {errors.cancellationAccepted}
                  </p>
                )}
              </div>

              {/* Submit CTA Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full group inline-flex items-center justify-center gap-3 rounded-full bg-earth px-8 py-4 text-xs font-semibold tracking-[0.25em] uppercase text-cream transition hover:bg-gold hover:text-earth disabled:opacity-60 cursor-pointer shadow-md"
                >
                  {isSubmitting ? (
                    <span>Jelentkezés rögzítése...</span>
                  ) : (
                    <>
                      <span>Jelentkezem a workshopra</span>
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                    </>
                  )}
                </button>
                <p className="mt-2 text-center text-[11px] text-earth/50">
                  Fizetés nélkül, azonnali regisztráció · Biztonságos adatkezelés
                </p>
              </div>
            </form>
          </div>
        ) : (
          /* Success Screen */
          <div className="py-4 text-center">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gold/20 text-gold mb-5">
              <Sparkles className="h-8 w-8 animate-pulse" />
            </div>

            <span className="eyebrow block">Sikeres jelentkezés</span>
            <h2 className="mt-2 font-display text-3xl text-earth">
              Szeretettel várunk a Jurtában!
            </h2>
            <p className="mt-3 text-base text-earth/80">
              Kedves <strong>{name}</strong>, a jelentkezésedet rögzítettük az{" "}
              <strong>{event.title}</strong> eseményre!
            </p>

            {/* Event Summary Card */}
            <div className="mt-6 rounded-2xl bg-linen p-5 text-left border border-gold/30 space-y-2.5 text-sm">
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-gold shrink-0" />
                <span>
                  <strong>Időpont:</strong> {event.date} ({event.time || "10:00 – 17:00"})
                </span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-gold shrink-0" />
                <span>
                  <strong>Helyszín:</strong> Soul Ritual Jurta (természetközeli helyszín)
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-gold shrink-0" />
                <span>
                  <strong>Visszaigazolás:</strong> Értesítés elküldve (workshop@soulritual.hu), és
                  rögzítve a(z) <u>{email}</u> címre
                </span>
              </div>
            </div>

            {/* Cancellation reminder alert */}
            <div className="mt-4 rounded-xl bg-sand/40 p-4 text-left border border-earth/15 flex items-start gap-3">
              <ShieldCheck className="h-5 w-5 text-gold shrink-0 mt-0.5" />
              <div className="text-xs leading-relaxed text-earth/80">
                <strong className="block text-earth font-medium mb-0.5">
                  Emlékeztető a lemondási feltételről:
                </strong>
                Amennyiben mégsem tudnál jelen lenni, kérünk, legkésőbb{" "}
                <strong>2 nappal (48 órával) az esemény előtt</strong> jelezd felénk a{" "}
                <a
                  href={`mailto:${event.email || "workshop@soulritual.hu"}`}
                  className="underline font-medium hover:text-gold"
                >
                  {event.email || "workshop@soulritual.hu"}
                </a>{" "}
                címen, hogy a helyet átadhassuk valaki másnak.
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={getGoogleCalendarUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-earth/30 bg-cream px-6 py-3 text-xs tracking-wider uppercase font-medium text-earth transition hover:border-gold hover:text-gold"
              >
                <CalendarCheck className="h-4 w-4 text-gold" />
                Naptárhoz adás (Google)
              </a>
              <button
                type="button"
                onClick={handleResetAndClose}
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-earth px-8 py-3 text-xs tracking-wider uppercase font-semibold text-cream transition hover:bg-gold hover:text-earth cursor-pointer"
              >
                Rendben, köszönöm!
              </button>
            </div>
          </div>
        )}

        {/* Small admin helper link at bottom for Izabella / Testing */}
        <div className="mt-6 pt-4 border-t border-earth/10 flex items-center justify-between text-[11px] text-earth/45">
          <span>Soul Ritual · Jurta események</span>
          <button
            type="button"
            onClick={() => setShowAdminList(!showAdminList)}
            className="hover:text-gold underline cursor-pointer"
          >
            {showAdminList ? "Elrejtés" : `Regisztrációk megtekintése (${savedList.length})`}
          </button>
        </div>

        {/* Admin drawer for viewing saved submissions */}
        {showAdminList && (
          <div className="mt-4 rounded-xl bg-linen p-4 text-left border border-earth/20 text-xs">
            <div className="flex items-center justify-between mb-3">
              <span className="font-semibold text-earth flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5 text-gold" />
                Helyi regisztrációk ({savedList.length} db)
              </span>
              <div className="flex items-center gap-2">
                {savedList.length > 0 && (
                  <>
                    <button
                      type="button"
                      onClick={handleExportCsv}
                      title="Letöltés CSV formátumban"
                      className="p-1 hover:text-gold flex items-center gap-1 text-[11px] cursor-pointer"
                    >
                      <Download className="h-3.5 w-3.5" /> CSV letöltés
                    </button>
                    <button
                      type="button"
                      onClick={handleClearList}
                      title="Lista törlése"
                      className="p-1 hover:text-destructive text-[11px] cursor-pointer"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </>
                )}
              </div>
            </div>

            {savedList.length === 0 ? (
              <p className="text-earth/60 italic">
                Még nem érkezett jelentkezés ezen a készüléken.
              </p>
            ) : (
              <div className="max-h-48 overflow-y-auto space-y-2 pr-1">
                {savedList.map((item) => (
                  <div key={item.id} className="rounded-lg bg-cream p-2.5 border border-earth/10">
                    <div className="flex justify-between items-start">
                      <strong className="text-earth">{item.name}</strong>
                      <span className="text-[10px] text-earth/50">
                        {new Date(item.createdAt).toLocaleDateString("hu-HU")}
                      </span>
                    </div>
                    <div className="text-earth/70 text-[11px] mt-0.5">
                      {item.email} {item.phone ? `· ${item.phone}` : ""}
                    </div>
                    <div className="text-[10px] text-gold mt-0.5 font-medium">
                      {item.eventTitle} ({item.eventDate})
                    </div>
                    {item.note && (
                      <p className="text-[11px] text-earth/60 italic mt-1 border-t border-earth/10 pt-1">
                        „{item.note}”
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
