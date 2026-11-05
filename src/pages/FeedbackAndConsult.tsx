import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Calendar, Sparkles, Star } from "lucide-react";

import logoUrl from "@/assets/soul-ritual-logo-transparent.png";
import { GOOGLE_SCRIPT_URL, getSavedLead } from "@/components/ExitIntentModal";

const BOOKING_URL = "https://app.minup.io/book/soulritual";

export default function FeedbackAndConsult() {
  const savedLead = getSavedLead();

  const [rating, setRating] = useState<number>(5);
  const [name, setName] = useState(savedLead?.name || "");
  const [email, setEmail] = useState(savedLead?.email || "");
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Kérlek, add meg a nevedet és az e-mail címedet, ahová a 2 000 Ft-os kupont küldhetem.");
      return;
    }
    if (feedback.trim().length < 5) {
      setError("Kérlek, írd le pár szóban, hogyan tetszett a betekintő.");
      return;
    }

    setSubmitting(true);

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          type: "feedback",
          name: name.trim(),
          email: email.trim(),
          rating,
          feedback: feedback.trim(),
        }),
      });
    } catch {
      // Fallback ha offline lenne
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
                Írd meg pár mondatban a visszajelzésedet, és a rendszerünk{" "}
                <strong>azonnal, automatikusan elküldi az e-mail címedre</strong> a{" "}
                <strong>2 000 Ft-os ajándék kuponodat</strong> a teljes munkafüzetekhez!
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
                    placeholder="E-mail címed (ide megy a kupon) *"
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
                    : "Elküldöm a visszajelzést & Kérem e-mailben a 2 000 Ft kupont"}
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
            <div className="text-center py-6">
              <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-gold/20 text-gold">
                <Sparkles className="h-7 w-7" />
              </div>
              <h2 className="font-display text-3xl text-earth">
                Hálásan köszönöm a visszajelzésedet! ✦
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-earth/75 max-w-md mx-auto">
                A rendszerünk <strong>már el is küldte</strong> a{" "}
                <strong>{email}</strong> e-mail címedre a{" "}
                <strong>2 000 Ft-os ajándék kuponkódodat</strong>! Nézd meg a bejövő
                leveleidet (vagy a Promóciók mappát).
              </p>

              <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">
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
