import { PublicShell } from "@/components/layout/public-shell";
import { Badge } from "@/components/ui/badge";
import { RouteBrowser } from "@/features/routes/route-browser";

export default function RoutesPage() {
  return (
    <PublicShell>
      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-6">
        <Badge tone="orange">Vitrine de roteiros</Badge>
        <h1 className="brand-display mt-5 text-6xl text-brand-brown dark:text-brand-yellow">Roteiros Perifa Ecotour</h1>
        <p className="mt-4 max-w-3xl text-brand-brown/75 dark:text-brand-cream/75">
          Experiencias turisticas territoriais, ambientais e educativas, preparadas para conectar visitantes a guias formados pela ECOTUCA.
        </p>
        <div className="mt-8">
          <RouteBrowser />
        </div>
      </section>
    </PublicShell>
  );
}
