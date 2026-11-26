import { AdminShell } from "@/components/layout/admin-shell";
import { RouteCard } from "@/components/cards/route-card";
import { tourRoutes } from "@/lib/mock-data/ecotuca";

export default function AdminRoutesPage() {
  return (
    <AdminShell>
      <header className="mb-5">
        <h1 className="text-section-title">Roteiros da Perifa Ecotour</h1>
        <p className="mt-2 text-[var(--muted)]">Consulte as propostas de percurso e a situação de cada roteiro.</p>
      </header>
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {tourRoutes.map((route) => <RouteCard key={route.slug} route={route} />)}
      </section>
    </AdminShell>
  );
}
