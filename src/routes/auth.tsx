import { createFileRoute, Link, useNavigate, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";

export const Route = createFileRoute("/auth")({
  component: AuthPage,
  head: () => ({
    meta: [
      { title: "Belépés — Soul Ritual" },
      { name: "description", content: "Jelentkezz be a Soul Ritual videótárba." },
    ],
  }),
});

function AuthPage() {
  const navigate = useNavigate();
  const router = useRouter();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{ type: "error" | "info"; text: string } | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/gyakorloter", replace: true });
    });
  }, [navigate]);

  const handleEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/gyakorloter` },
        });
        if (error) throw error;
        setMsg({
          type: "info",
          text: "Küldtünk egy megerősítő e-mailt. Kattints a linkre a fiók aktiválásához.",
        });
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        await router.invalidate();
        navigate({ to: "/gyakorloter", replace: true });
      }
    } catch (err) {
      setMsg({ type: "error", text: (err as Error).message });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    setMsg(null);
    try {
      const result = await lovable.auth.signInWithOAuth("google", {
        redirect_uri: window.location.origin,
      });
      if (result.error) throw new Error(result.error.message ?? "Google bejelentkezési hiba");
      if (result.redirected) return;
      await router.invalidate();
      navigate({ to: "/gyakorloter", replace: true });
    } catch (err) {
      setMsg({ type: "error", text: (err as Error).message });
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-16">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link to="/" className="inline-block text-xs tracking-[0.28em] uppercase text-muted-foreground hover:text-earth">
            ← Vissza a főoldalra
          </Link>
          <h1 className="mt-6 text-3xl">
            {mode === "signin" ? "Belépés" : "Regisztráció"}
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Meditációk, légzőgyakorlatok és jógaóra videók egy helyen.
          </p>
        </div>

        <div className="rounded-2xl border border-earth/15 bg-cream/40 p-8 shadow-sm">
          <button
            onClick={handleGoogle}
            disabled={loading}
            className="flex w-full items-center justify-center gap-3 rounded-full border border-earth/25 bg-white px-6 py-3 text-sm text-earth transition hover:bg-earth hover:text-cream disabled:opacity-50"
          >
            <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden>
              <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.3-.4-3.5z" />
              <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.9 1.2 8 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.4 6.3 14.7z" />
              <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
              <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.1 5.6l6.2 5.2C41 34.5 44 29.7 44 24c0-1.3-.1-2.3-.4-3.5z" />
            </svg>
            Belépés Google-fiókkal
          </button>

          <div className="my-6 flex items-center gap-3 text-xs uppercase tracking-widest text-muted-foreground">
            <div className="h-px flex-1 bg-earth/20" />
            vagy
            <div className="h-px flex-1 bg-earth/20" />
          </div>

          <form onSubmit={handleEmail} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs tracking-widest uppercase text-earth/70">E-mail</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-earth/25 bg-white px-4 py-2.5 text-sm outline-none focus:border-earth"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs tracking-widest uppercase text-earth/70">Jelszó</label>
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-earth/25 bg-white px-4 py-2.5 text-sm outline-none focus:border-earth"
              />
            </div>

            {msg && (
              <div
                className={`rounded-lg px-4 py-3 text-sm ${
                  msg.type === "error"
                    ? "bg-red-50 text-red-700"
                    : "bg-green-50 text-green-800"
                }`}
              >
                {msg.text}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-earth px-6 py-3 text-xs tracking-[0.28em] uppercase text-cream transition hover:opacity-90 disabled:opacity-50"
            >
              {loading ? "Kérlek várj…" : mode === "signin" ? "Belépés" : "Regisztráció"}
            </button>
          </form>

          <button
            type="button"
            onClick={() => {
              setMode(mode === "signin" ? "signup" : "signin");
              setMsg(null);
            }}
            className="mt-5 w-full text-center text-sm text-muted-foreground hover:text-earth"
          >
            {mode === "signin"
              ? "Nincs még fiókod? Regisztrálj"
              : "Van már fiókod? Jelentkezz be"}
          </button>
        </div>
      </div>
    </div>
  );
}
