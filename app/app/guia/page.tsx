import { AppShell } from "@/components/layout/app-shell";
import { GuideCard } from "@/components/cards/guide-card";
import { guides } from "@/lib/mock-data/ecotuca";

export default function GuideDashboardPage() {
  return (
    <AppShell title="Area do guia">
      <section className="mx-auto max-w-5xl">
        <h1 className="brand-display text-5xl">Agenda e perfil de guia</h1>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <GuideCard guide={guides[0]} />
          <div className="rounded-lg bg-brand-yellow p-5 text-brand-brown shadow-brand">
            <h2 className="brand-display text-4xl">Proximas solicitacoes</h2>
            <p className="mt-3 font-bold">3 interesses simulados para Serra da Misericordia e Vivencia Perifa Ecotour.</p>
          </div>
        </div>
      </section>
    </AppShell>
  );
}
