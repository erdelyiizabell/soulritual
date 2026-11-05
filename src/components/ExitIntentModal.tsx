import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { X, Sparkles, Download, Mail, ArrowRight, Star, BookOpen } from "lucide-react";

import hatarokCover from "@/assets/munkafuzet-hatarok.jpg";
import kapcsolatCover from "@/assets/munkafuzet-kapcsolati-mintaim.jpg";

export const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwlCkLgtx_vq1xk_ZEHYIKkzbGh0_nN8bhJ9SDW24_bPpNcaCHYecRXKufLSH2hG15W/exec";

const EMAILJS_SERVICE_ID = "service_b3x3vph";
const EMAILJS_TEMPLATE_ID = "template_r3jdl0r";
const EMAILJS_PUBLIC_KEY = "0hiWiCqQxp86EdGXi";
const NOTIFY_EMAIL = "info@soulritual.hu";

const LEAD_STORAGE_KEY = "soulritual_lead_magnet_v2";
const DISMISSED_SESSION_KEY = "soulritual_exit_dismissed_v2";
const FREE_PDF_URL = "/downloads/Soul_Ritual_Onreflexios_Izelito.pdf";

export interface LeadRecord {
  name: string;
  email: string;
  subscribedAt: string;
}

export function getSavedLead(): LeadRecord | null {
  try {
    const raw = localStorage.getItem(LEAD_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as LeadRecord) : null;
  } catch {
    return null;
  }
}

export default function ExitIntentModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (getSavedLead() || sessionStorage.getItem(DISMISSED_SESSION_KEY)) return;

    let triggered = false;
    const triggerPopup = () => {
      if (triggered || getSavedLead() || sessionStorage.getItem(DISMISSED_SESSION_KEY)) return;
      triggered = true;
      setIsOpen(true);
    };

    const handleMouseOut = (e: MouseEvent) => {
      if (!e.relatedTarget && e.clientY <= 40) {
        triggerPopup();
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 40) {
        triggerPopup();
      }
    };

    const armTimer = window.setTimeout(() => {
      window.addEventListener("mouseout", handleMouseOut);
      document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    }, 1000);

    const autoTimer = window.setTimeout(() => {
      triggerPopup();
    }, 18000);

    return () => {
      window.clearTimeout(armTimer);
      window.clearTimeout(autoTimer);
      window.removeEventListener("mouseout", handleMouseOut);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  function handleClose() {
    sessionStorage.setItem(DISMISSED_SESSION_KEY, "1");
    setIsOpen(false);
  }

  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (!name.trim() || !email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Kérlek, add meg a keresztnevedet és az e-mail címedet.");
      return;
    }

    setSubmitting(true);
    const now = new Date();
    const due = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString("hu-HU");

    const record: LeadRecord = {
      name: name.trim(),
      email: email.trim(),
      subscribedAt: now.toISOString(),
    };

    try {
      localStorage.setItem(LEAD_STORAGE_KEY, JSON.stringify(record));
    } catch {}

    // 1. Küldés a Google Táblázat + Gmail automatának
    fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({
        type: "lead",
        name: record.name,
        email: record.email,
      }),
    }).catch(() => {});

    // 2. Biztonsági küldés EmailJS / FormSubmit segítségével is
    try {
      const emailjs = await import("@emailjs/browser");
      await emailjs.default.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: record.name,
          from_email: record.email,
          phone: `1 hét múlva (${due}) emlékeztető esedékes`,
          event_title: "Ajándék PDF betekintő letöltés",
          event_date: due,
          event_time: "Visszajelzésért 2 000 Ft kupon",
          event_location: "https://soulritual.hu/visszajelzes",
          submitted_at: now.toLocaleString("hu-HU"),
          reply_to: record.email,
        },
        EMAILJS_PUBLIC_KEY
      );
    } catch {
      try {
        await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(NOTIFY_EMAIL)}`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            _subject: `🎁 Ajándék PDF betekintő letöltés: ${record.name}`,
            Név: record.name,
            "E-mail": record.email,
            "1 hét múlva emlékeztető": due,
          }),
        });
      } catch {}
    } finally {
      setSubmitting(false);
      setDone(true);
    }
  }

  return (
    <>
      {!isOpen && (
        <div className="fixed bottom-5 left-5 z-40">
          {!getSavedLead() ? (
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="inline-flex items-center gap-2 rounded-full border border-gold/50 bg-earth/95 px-4 py-2.5 text-xs font-medium text-cream shadow-lg backdrop-blur-md transition hover:bg-gold cursor-pointer"
            >
              <BookOpen className="h-4 w-4 text-gold-soft" />
              <span>Ingyenes PDF betekintő</span>
            </button>
          ) : (
            <Link
              to="/visszajelzes"
              className="inline-flex items-center gap-2 rounded-full border border-gold/50 bg-earth/95 px-4 py-2.5 text-xs font-medium text-cream shadow-lg backdrop-blur-md transition hover:bg-gold"
            >
              <Star className="h-4 w-4 text-gold-soft" />
              <span>Vélemény írása → 2 000 Ft kupon</span>
            </Link>
          )}
        </div>
      )}

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div
            onClick={handleClose}
            className="fixed inset-0 bg-earth/70 backdrop-blur-sm"
          />

          <div className="relative z-10 w-full max-w-md rounded-3xl border border-gold/35 bg-cream p-7 sm:p-8 text-center text-earth shadow-2xl">
            <button
              type="button"
              onClick={handleClose}
              aria-label="Bezárás"
              className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full text-earth/50 transition hover:bg-earth/5 hover:text-earth cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>

            {!done ? (
              <>
                <div className="flex justify-center gap-3 mb-4">
                  <img
                    src={hatarokCover}
                    alt="Határok"
                    className="h-24 w-auto rounded-lg shadow-md -rotate-3 border border-gold/30"
                  />
                  <img
                    src={kapcsolatCover}
                    alt="A kapcsolati mintáim nyomában"
                    className="h-24 w-auto rounded-lg shadow-md rotate-3 border border-gold/30"
                  />
                </div>

                <p className="eyebrow text-gold">Mielőtt továbbindulnál</p>
                <h2 className="mt-1.5 font-display text-2xl sm:text-3xl text-earth">
                  Ingyenes PDF betekintés a munkafüzetbe
                </h2>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-earth/75">
                  Add meg az e-mail címedet, és máris letöltheted a{" "}
                  <strong>3 oldalas ingyenes betekintőt</strong> (részletek a fejezetekből). Ha
                  pedig elolvastad és megírod, hogy tetszett, ajándékba kapsz egy{" "}
                  <strong>2 000 Ft-os kupont</strong> a teljes munkafüzetekhez!
                </p>

                <form onSubmit={handleSubmit} noValidate className="mt-5 space-y-3 text-left">
                  <input
                    type="text"
                    value={name}
                    placeholder="Keresztneved (pl. Anna)"
                    onChange={(e) => {
                      setName(e.target.value);
                      setError("");
                    }}
                    className="w-full rounded-xl border border-earth/20 bg-white px-4 py-3 text-sm text-earth placeholder:text-earth/40 focus:border-gold focus:outline-none"
                  />

                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-earth/40" />
                    <input
                      type="email"
                      value={email}
                      placeholder="E-mail címed"
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError("");
                      }}
                      className="w-full rounded-xl border border-earth/20 bg-white pl-10 pr-4 py-3 text-sm text-earth placeholder:text-earth/40 focus:border-gold focus:outline-none"
                    />
                  </div>

                  {error && <p className="text-xs text-destructive text-center">{error}</p>}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-earth px-6 py-3.5 text-xs font-semibold tracking-[0.2em] uppercase text-cream shadow-md transition hover:bg-gold cursor-pointer"
                  >
                    <span>{submitting ? "Küldés..." : "Kérem az ingyenes PDF betekintőt"}</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>

                  <div className="pt-2 text-center">
                    <Link
                      to="/visszajelzes"
                      onClick={handleClose}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-gold hover:underline"
                    >
                      <Star className="h-3.5 w-3.5" />
                      <span>
                        Már elolvastad a betekintőt? Írd meg a véleményed a 2 000 Ft kuponért →
                      </span>
                    </Link>
                  </div>
                </form>
              </>
            ) : (
              <div className="py-3">
                <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-gold/20 text-gold">
                  <Sparkles className="h-6 w-6" />
                </div>
                <h3 className="font-display text-2xl text-earth">
                  Kedves {name}, itt a betekintőd! ✦
                </h3>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-earth/75">
                  Kattints a gombra a letöltéshez! Ha elolvastad és megírod a visszajelzésedet,
                  megkapod a <strong>2 000 Ft-os ajándék kuponodat</strong>.
                </p>

                <a
                  href={FREE_PDF_URL}
                  download="Soul_Ritual_Onreflexios_Izelito.pdf"
                  className="mt-5 inline-flex items-center gap-2 rounded-full bg-earth px-7 py-3.5 text-xs font-semibold tracking-[0.2em] uppercase text-cream shadow-md transition hover:bg-gold"
                >
                  <Download className="h-4 w-4" />
                  <span>PDF betekintő letöltése</span>
                </a>

                <div className="mt-4">
                  <Link
                    to="/visszajelzes"
                    onClick={handleClose}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-gold hover:underline"
                  >
                    <Star className="h-3.5 w-3.5" />
                    <span>Már elolvastad? Írd meg a visszajelzésedet itt →</span>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
