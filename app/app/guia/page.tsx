import Image from "next/image";
import { AppShell } from "@/components/layout/app-shell";
import { OfficialLogo } from "@/components/brand/official-logo";
import { PerifaCard } from "@/components/brand/perifa-card";
import { GuideCard } from "@/components/cards/guide-card";
import { EcoButton } from "@/components/brand/eco-button";
import { Badge } from "@/components/ui/badge";
import { guides } from "@/lib/mock-data/ecotuca";

export default function GuideDashboardPage() {
  return (
    <AppShell title="Area do guia">
      <section className="mx-auto max-w-5xl">
        <div className="relative overflow-hidden rounded-lg bg-brand-brown p-6 text-brand-cream shadow-glow">
          <Image
            src="/media/territory/complexo-alemao/visao-do-complexo-thirson-cc-by-sa-4.jpg"
            alt="Vista do Complexo do Alemao associada ao perfil de guia local"
            fill
            className="object-cover opacity-[.22]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-brown via-brand-brown/90 to-brand-orange/45" />
          <div className="relative">
            <OfficialLogo brand="perifa" variant="horizontal" tone="negative" size="md" />
          </div>
          <Badge tone="orange" className="relative mt-5">Guia protagonista do territorio</Badge>
          <h1 className="brand-display relative mt-5 text-5xl text-brand-yellow">Agenda e perfil de guia</h1>
          <p className="relative mt-3 max-w-2xl text-brand-cream/80">
            Organize solicitacoes, roteiros associados e dados que fortalecem a confianca do visitante.
          </p>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <GuideCard guide={guides[0]} />
          <PerifaCard tone="yellow" className="bg-brand-yellow text-brand-brown">
            <h2 className="brand-display text-4xl">Proximas solicitacoes</h2>
            <p className="mt-3 font-bold">3 interesses recebidos para Serra da Misericordia e Vivencia Perifa Ecotour.</p>
            <EcoButton variant="coral" className="mt-5">Atualizar disponibilidade</EcoButton>
          </PerifaCard>
        </div>
      </section>
    </AppShell>
  );
}
