import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="eyebrow">404</p>
        <h1 className="mt-4 text-4xl">Az oldal nem található</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          A keresett oldal már nem elérhető, vagy soha nem is létezett.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full border border-earth px-6 py-3 text-xs tracking-[0.28em] uppercase text-earth transition hover:bg-earth hover:text-cream"
          >
            Vissza a főoldalra
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-2xl">Valami félresiklott</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Próbáld újratölteni az oldalt, vagy térj vissza a főoldalra.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="rounded-full bg-earth px-6 py-3 text-xs tracking-[0.28em] uppercase text-cream"
          >
            Újrapróbálás
          </button>
          <a
            href="/"
            className="rounded-full border border-earth px-6 py-3 text-xs tracking-[0.28em] uppercase text-earth"
          >
            Főoldal
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Soul Ritual — Találj vissza önmagadhoz" },
      {
        name: "description",
        content:
          "Soul Ritual — természetközeli elvonulóhely egy mongol jurtában. Jóga, meditáció, Access Bars, ThetaHealing és kakaó szertartás elegáns, biztonságos térben.",
      },
      { name: "author", content: "Soul Ritual" },
      { property: "og:title", content: "Soul Ritual — Találj vissza önmagadhoz" },
      {
        property: "og:description",
        content:
          "Egy hely, ahol lelassulhatsz, feltöltődhetsz és újra kapcsolódhatsz önmagadhoz.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@300;400;500;600&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="hu">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
