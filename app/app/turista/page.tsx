import { AppShell } from "@/components/layout/app-shell";
import { OfficialLogo } from "@/components/brand/official-logo";
import { RouteCard } from "@/components/cards/route-card";
import { tourRoutes } from "@/lib/mock-data/ecotuca";

export default function TouristPage() {
  return (
    <AppShell title="Area do turista">
      <section className="mx-auto max-w-7xl">
        <div className="rounded-lg bg-brand-brown p-6 text-brand-cream shadow-glow">
          <OfficialLogo brand="perifa" variant="horizontal" tone="negative" size="md" />
          <h1 className="brand-display mt-5 text-5xl text-brand-yellow">Roteiros favoritos</h1>
          <p className="mt-3 max-w-2xl text-brand-cream/80">
            Escolha experiencias territoriais com guias formados, narrativas locais e orientacoes de seguranca.
          </p>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {tourRoutes.slice(0, 3).map((route) => <RouteCard key={route.slug} route={route} />)}
        </div>
      </section>
    </AppShell>
  );
}
