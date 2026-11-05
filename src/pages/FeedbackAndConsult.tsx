import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Calendar, Check, Copy, Sparkles, Star } from "lucide-react";

import logoUrl from "@/assets/soul-ritual-logo-transparent.png";
import { GOOGLE_SCRIPT_URL, GOOGLE_SCRIPT_URL_ALT, getSavedLead } from "@/components/ExitIntentModal";

const BOOKING_URL = "https://app.minup.io/book/soulritual";
const EMAILJS_SERVICE_ID = "service_b3x3vph";
const EMAILJS_TEMPLATE_ID = "template_r3jdl0r";
const EMAILJS_PUBLIC_KEY = "0hiWiCqQxp86EdGXi";
const NOTIFY_EMAIL = "info@soulritual.hu";
const COUPON_REWARD = "SOUL2000";

export default function FeedbackAndConsult() {
  const savedLead = getSavedLead();

  const [rating, setRating] = useState<number>(5);
  const [name, setName] = useState(savedLead?.name || "");
  const [email, setEmail] = useState(savedLead?.email || "");
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [copied, setCopied] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Kérlek, add meg a nevedet és az e-mail címedet.");
      return;
    }
    if (feedback.trim().length < 5) {
      setError("Kérlek, írd le pár szóban, hogyan tetszett a betekintő.");
      return;
    }

    setSubmitting(true);
    const stars = "★".repeat(rating) + "☆".repeat(5 - rating);
    const nowStr = new Date().toLocaleString("hu-HU");

    // 1. Küldés a Google Táblázat + Gmail automatának (mindkét telepített végpontra)
    const payload = JSON.stringify({
      type: "feedback",
      name: name.trim(),
      email: email.trim(),
      rating,
      feedback: feedback.trim(),
    });
    for (const url of [GOOGLE_SCRIPT_URL, GOOGLE_SCRIPT_URL_ALT]) {
      fetch(url, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: payload,
      }).catch(() => {});
    }

    // 2. Biztonsági küldés EmailJS / FormSubmit segítségével is
    try {
      const emailjs = await import("@emailjs/browser");
      await emailjs.default.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: name.trim(),
          from_email: email.trim(),
          phone: `${rating}/5 (${stars})`,
          event_title: "MUNKAFÜZET VISSZAJELZÉS",
          event_date: nowStr,
          event_time: `Kupon: ${COUPON_REWARD}`,
          event_location: feedback.trim(),
          submitted_at: nowStr,
          reply_to: email.trim(),
        },
        EMAILJS_PUBLIC_KEY
      );
    } catch {
      try {
        await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(NOTIFY_EMAIL)}`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            _subject: `⭐ Új Munkafüzet Visszajelzés (${rating}/5): ${name.trim()}`,
            Név: name.trim(),
            "E-mail": email.trim(),
            Értékelés: `${rating}/5`,
            Vélemény: feedback.trim(),
          }),
        });
      } catch {}
    } finally {
      setSubmitting(false);
      setDone(true);
    }
  }

  return (
    <div className="min-h-screen bg-cream text-earth">
      <header className="border-b border-earth/10 bg-cream/90">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.18em] uppercase text-earth/75 hover:text-gold"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Főoldal</span>
          </Link>
          <Link to="/">
            <img src={logoUrl} alt="Soul Ritual" className="h-12 w-auto" />
          </Link>
          <Link
            to="/webshop"
            className="rounded-full bg-earth px-4 py-2 text-[11px] font-medium tracking-[0.18em] uppercase text-cream hover:bg-gold"
          >
            Webshop
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-xl px-6 py-14">
        <div className="rounded-3xl border border-gold/35 bg-white/85 p-7 sm:p-10 shadow-sm">
          {!done ? (
            <>
              <p className="eyebrow text-gold text-center">Soul Ritual · Visszajelzés</p>
              <h1 className="mt-2 font-display text-3xl sm:text-4xl text-center text-earth">
                Hogy tetszett a PDF betekintő?
              </h1>
              <p className="mt-2 text-center text-sm leading-relaxed text-earth/75">
                Írd meg pár mondatban a visszajelzésedet, és a beküldés után{" "}
                <strong>azonnal megjelenik</strong> a{" "}
                <strong>2 000 Ft-os ajándék kuponkódod</strong> a teljes munkafüzetekhez!
              </p>

              <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="p-1 transition hover:scale-110 cursor-pointer"
                      >
                        <Star
                          className={`h-7 w-7 ${
                            star <= rating ? "text-gold fill-gold" : "text-earth/20"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setError("");
                    }}
                    placeholder="Keresztneved *"
                    className="w-full rounded-xl border border-earth/20 bg-linen/50 px-4 py-2.5 text-sm text-earth focus:border-gold focus:outline-none"
                  />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError("");
                    }}
                    placeholder="E-mail címed *"
                    className="w-full rounded-xl border border-earth/20 bg-linen/50 px-4 py-2.5 text-sm text-earth focus:border-gold focus:outline-none"
                  />
                </div>

                <textarea
                  rows={4}
                  required
                  value={feedback}
                  onChange={(e) => {
                    setFeedback(e.target.value);
                    setError("");
                  }}
                  placeholder="Írd meg pár mondatban, milyen volt elolvasni a betekintőt, melyik gondolat érintett meg a legjobban... *"
                  className="w-full rounded-xl border border-earth/20 bg-linen/50 p-4 text-sm text-earth focus:border-gold focus:outline-none"
                />

                {error && <p className="text-xs text-destructive text-center">{error}</p>}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full rounded-full bg-earth py-3.5 text-xs font-semibold tracking-[0.2em] uppercase text-cream shadow-md transition hover:bg-gold cursor-pointer"
                >
                  {submitting
                    ? "Küldés..."
                    : "Elküldöm a visszajelzést & Kérem a 2 000 Ft-os kupont"}
                </button>
              </form>

              {/* Közvetlen időpontfoglalás kártya */}
              <div className="mt-7 rounded-2xl border border-gold/35 bg-gold/10 p-5 text-center">
                <p className="font-display text-lg text-earth">
                  Szeretnéd személyesen vagy online átbeszélni?
                </p>
                <p className="mt-1 text-xs leading-relaxed text-earth/75">
                  Ha a munkafüzet mellett szívesen találkoznál velem egyéni konzultáción vagy
                  30 perces online híváson, foglalj közvetlenül időpontot a naptáramban:
                </p>
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3.5 inline-flex items-center gap-2 rounded-full border border-earth/30 bg-white px-6 py-2.5 text-xs font-semibold tracking-[0.18em] uppercase text-earth transition hover:border-gold hover:bg-earth hover:text-cream"
                >
                  <Calendar className="h-3.5 w-3.5 text-gold" />
                  <span>Időpontot foglalok</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </>
          ) : (
            <div className="text-center py-4">
              <div className="mx-auto mb-3 grid h-14 w-14 place-items-center rounded-full bg-gold/20 text-gold">
                <Sparkles className="h-7 w-7" />
              </div>
              <h2 className="font-display text-3xl text-earth">
                Hálásan köszönöm a visszajelzésedet! ✦
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-earth/75 max-w-md mx-auto">
                Íme a <strong>2 000 Ft-os ajándék kuponkódod</strong>, amit a munkafüzet
                megrendelésénél tudsz beváltani:
              </p>

              <div className="mt-5 rounded-2xl bg-earth p-5 text-cream">
                <p className="text-[10px] tracking-[0.2em] uppercase text-gold-soft">
                  2 000 Ft-os ajándék kuponkódod
                </p>
                <div className="mt-1.5 font-display text-3xl tracking-widest">
                  {COUPON_REWARD}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard?.writeText(COUPON_REWARD);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                  className="mt-3 inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2 text-xs font-semibold uppercase tracking-wider text-cream hover:bg-cream hover:text-earth cursor-pointer"
                >
                  {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copied ? "Kimásolva!" : "Kód másolása"}</span>
                </button>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  to="/webshop"
                  className="inline-block rounded-full bg-earth px-7 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-cream hover:bg-gold transition"
                >
                  Irány a Webshop →
                </Link>
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-earth px-7 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-earth hover:bg-earth hover:text-cream transition"
                >
                  <Calendar className="h-3.5 w-3.5 text-gold" />
                  <span>Időpontfoglalás</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
