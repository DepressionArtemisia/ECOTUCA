import { AppShell } from "@/components/layout/app-shell";
import { RouteCard } from "@/components/cards/route-card";
import { tourRoutes } from "@/lib/mock-data/ecotuca";

export default function TouristPage() {
  return (
    <AppShell title="Area do turista">
      <section className="mx-auto max-w-7xl">
        <h1 className="brand-display text-5xl">Roteiros favoritos</h1>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {tourRoutes.slice(0, 3).map((route) => <RouteCard key={route.slug} route={route} />)}
        </div>
      </section>
    </AppShell>
  );
}
