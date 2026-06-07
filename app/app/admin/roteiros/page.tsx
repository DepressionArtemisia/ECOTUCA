import { AdminShell } from "@/components/layout/admin-shell";
import { RouteCard } from "@/components/cards/route-card";
import { tourRoutes } from "@/lib/mock-data/ecotuca";

export default function AdminRoutesPage() {
  return (
    <AdminShell>
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {tourRoutes.map((route) => <RouteCard key={route.slug} route={route} />)}
      </section>
    </AdminShell>
  );
}
