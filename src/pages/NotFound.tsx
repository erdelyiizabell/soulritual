import { Link } from "react-router-dom";

export default function NotFound() {
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
