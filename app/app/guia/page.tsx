import { AppShell } from "@/components/layout/app-shell";
import { OfficialLogo } from "@/components/brand/official-logo";
import { PerifaCard } from "@/components/brand/perifa-card";
import { GuideCard } from "@/components/cards/guide-card";
import { guides } from "@/lib/mock-data/ecotuca";

export default function GuideDashboardPage() {
  return (
    <AppShell title="Area do guia">
      <section className="mx-auto max-w-5xl">
        <div className="rounded-lg bg-brand-brown p-6 text-brand-cream shadow-glow">
          <OfficialLogo brand="perifa" variant="horizontal" tone="negative" size="md" />
          <h1 className="brand-display mt-5 text-5xl text-brand-yellow">Agenda e perfil de guia</h1>
          <p className="mt-3 max-w-2xl text-brand-cream/80">
            Organize solicitacoes, roteiros associados e dados que fortalecem a confianca do visitante.
          </p>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <GuideCard guide={guides[0]} />
          <PerifaCard tone="yellow" className="bg-brand-yellow text-brand-brown">
            <h2 className="brand-display text-4xl">Proximas solicitacoes</h2>
            <p className="mt-3 font-bold">3 interesses recebidos para Serra da Misericordia e Vivencia Perifa Ecotour.</p>
          </PerifaCard>
        </div>
      </section>
    </AppShell>
  );
}
