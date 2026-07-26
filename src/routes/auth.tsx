import { createFileRoute, Link, useNavigate, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";


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
