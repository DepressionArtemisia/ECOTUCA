import { AppShell } from "@/components/layout/app-shell";
import { RouteCard } from "@/components/cards/route-card";
import { tourRoutes } from "@/lib/mock-data/ecotuca";

export default function GuideRoutesPage() {
  return (
    <AppShell title="Roteiros do guia">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {tourRoutes.slice(0, 3).map((route) => <RouteCard key={route.slug} route={route} />)}
      </section>
    </AppShell>
  );
}
