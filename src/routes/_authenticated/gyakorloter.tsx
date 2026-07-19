import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Play, Wind, Flower2, Leaf } from "lucide-react";

export const Route = createFileRoute("/_authenticated/gyakorloter")({
  component: Gyakorloter,
  head: () => ({
    meta: [
      { title: "Ébredés — Soul Ritual" },
      {
        name: "description",
        content: "Meditációk, légzőgyakorlatok és jógaóra videók a Soul Ritual közösségének.",
      },
    ],
  }),
});

type Category = {
  icon: typeof Flower2;
  title: string;
  desc: string;
  count: string;
};

const categories: Category[] = [
  {
    icon: Leaf,
    title: "Meditációk",
    desc: "Vezetett elmélyülések, csendes visszakapcsolódás.",
    count: "Hamarosan",
  },
  {
    icon: Wind,
    title: "Légzőgyakorlatok",
    desc: "Rövid és hosszú légzésmunka, feszültségoldás.",
    count: "Hamarosan",
  },
  {
    icon: Flower2,
    title: "Jógaórák",
    desc: "Reggeli, esti és lassú jóga folyamatok.",
    count: "Hamarosan",
  },
];

function Gyakorloter() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleSignOut = async () => {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-earth/15 bg-cream/40">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 lg:px-10">
          <Link to="/" className="text-xs tracking-[0.28em] uppercase text-earth hover:text-gold">
            Soul Ritual
          </Link>
          <button
            onClick={handleSignOut}
            className="text-xs tracking-[0.24em] uppercase text-earth/70 hover:text-earth"
          >
            Kilépés
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-16 lg:px-10 lg:py-24">
        <p className="eyebrow">Ébredés</p>
        <h1 className="mt-4 text-4xl lg:text-5xl">Üdv újra itt</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Ez a te saját tered — meditációk, légzőgyakorlatok és jógaóra videók.
          Hamarosan feltöltjük az első tartalmakat.
        </p>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <div
              key={cat.title}
              className="group rounded-2xl border border-earth/15 bg-cream/30 p-8 transition hover:border-earth/30 hover:shadow-md"
            >
              <cat.icon className="h-8 w-8 text-earth/70" strokeWidth={1.4} />
              <h3 className="mt-6 text-xl">{cat.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{cat.desc}</p>
              <div className="mt-8 flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-earth/60">
                <Play className="h-3.5 w-3.5" />
                {cat.count}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-2xl border border-dashed border-earth/25 p-10 text-center">
          <p className="text-sm text-muted-foreground">
            A videótár feltöltés alatt áll. Nemsokára itt találod majd az összes gyakorlatot.
          </p>
        </div>

        <div className="mt-10 rounded-2xl border border-earth/15 bg-cream/40 p-10 text-center">
          <p className="eyebrow">Személyes alkalom</p>
          <h2 className="mt-3 text-2xl lg:text-3xl">Foglalj időpontot</h2>
          <p className="mt-3 text-sm text-muted-foreground max-w-xl mx-auto">
            Egyéni ülés, konzultáció vagy jurta látogatás — foglalj magadnak időt.
          </p>
          <a
            href="https://app.minup.io/book/soulritual"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-earth px-8 py-3 text-xs uppercase tracking-[0.24em] text-cream hover:bg-earth/90 transition"
          >
            Időpontot foglalok
          </a>
        </div>
      </main>
    </div>
  );
}
