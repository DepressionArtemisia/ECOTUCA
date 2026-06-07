import { Leaf, LineChart, Users } from "lucide-react";
import { PublicShell } from "@/components/layout/public-shell";
import { PerifaCard } from "@/components/brand/perifa-card";
import { Badge } from "@/components/ui/badge";

export default function AboutPage() {
  return (
    <PublicShell>
      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-6">
        <Badge tone="mint">Sobre o projeto</Badge>
        <h1 className="brand-display mt-5 max-w-4xl text-6xl text-brand-brown dark:text-brand-yellow">ECOTUCA e Perifa Ecotour</h1>
        <p className="mt-5 max-w-3xl text-lg text-brand-brown/75 dark:text-brand-cream/75">
          Uma base digital para formar jovens em ecoturismo, valorizar a Serra da Misericordia, conectar guias a turistas e gerar indicadores claros para prestacao de contas.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <PerifaCard tone="yellow">
            <Users size={30} />
            <h2 className="brand-display mt-3 text-3xl">Juventude</h2>
            <p className="mt-2 text-sm">Formacao com pertencimento, pratica e oportunidade de renda.</p>
          </PerifaCard>
          <PerifaCard tone="mint">
            <Leaf size={30} />
            <h2 className="brand-display mt-3 text-3xl">Natureza</h2>
            <p className="mt-2 text-sm">Ecologia urbana, biodiversidade e turismo responsavel.</p>
          </PerifaCard>
          <PerifaCard tone="blue">
            <LineChart size={30} />
            <h2 className="brand-display mt-3 text-3xl">Dados</h2>
            <p className="mt-2 text-sm">Relatorios para acompanhar engajamento, certificacao e impacto.</p>
          </PerifaCard>
        </div>
      </section>
    </PublicShell>
  );
}
