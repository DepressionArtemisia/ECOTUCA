import { AppShell } from "@/components/layout/app-shell";
import { RouteCard } from "@/components/cards/route-card";
import { tourRoutes } from "@/lib/mock-data/ecotuca";

export default function GuideRoutesPage() {
  return (
    <AppShell title="Roteiros do guia" roleContext="guide">
      <header className="mb-5">
        <h1 className="text-section-title">Meus roteiros</h1>
        <p className="mt-2 text-[var(--muted)]">Veja exemplos de roteiros e as orientações registradas para cada percurso.</p>
      </header>
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {tourRoutes.slice(0, 3).map((route) => <RouteCard key={route.slug} route={route} />)}
      </section>
    </AppShell>
  );
}
