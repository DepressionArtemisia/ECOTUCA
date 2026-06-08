import Image from "next/image";
import type { Metadata } from "next";
import { PublicShell } from "@/components/layout/public-shell";
import { BrandPattern } from "@/components/brand/brand-pattern";
import { OfficialLogo } from "@/components/brand/official-logo";
import { Badge } from "@/components/ui/badge";
import { PerifaCard } from "@/components/brand/perifa-card";
import { RouteBrowser } from "@/features/routes/route-browser";

export const metadata: Metadata = {
  title: "Roteiros | ECOTUCA / Perifa Ecotour",
  description: "Roteiros territoriais, ambientais e educativos conectados ao Complexo do Alemao, Serra da Misericordia e Perifa Ecotour."
};

export default function RoutesPage() {
  return (
    <PublicShell>
      <section className="brand-surface relative overflow-hidden">
        <Image
          src="/media/territory/penha/panorama-zona-norte-igreja-penha-adam-jones-cc-by-sa-2.jpg"
          alt="Panorama da Zona Norte visto da Igreja da Penha"
          fill
          priority
          className="object-cover opacity-20 mix-blend-multiply dark:opacity-25"
          sizes="100vw"
        />
        <BrandPattern intensity="soft" />
        <div className="relative mx-auto max-w-7xl px-5 py-12 sm:px-6">
          <div className="mb-5">
            <OfficialLogo brand="perifa" variant="horizontal" size="md" />
          </div>
          <Badge tone="orange">Roteiros demonstrativos em validacao</Badge>
          <h1 className="brand-display mt-5 max-w-4xl text-5xl text-brand-brown dark:text-brand-yellow sm:text-6xl">
            Roteiros de territorio, natureza e pertencimento
          </h1>
          <p className="mt-4 max-w-3xl text-brand-brown/75 dark:text-brand-cream/75">
            Experiencias turisticas territoriais, ambientais e educativas, preparadas para conectar visitantes a guias formados pela ECOTUCA com validacao comunitaria e cuidado etico.
          </p>
          <div className="mt-8">
            <RouteBrowser />
          </div>
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {[
              ["Cuidado territorial", "Roteiros precisam de validacao local, respeito a moradores e orientacao de imagem."],
              ["Experiencia educativa", "Cada visita carrega leitura ambiental, memoria, cultura e Agenda 2030."],
              ["Guia formado", "A vitrine aproxima o visitante de jovens e guias preparados pela ECOTUCA."]
            ].map(([title, text]) => (
              <PerifaCard key={title} tone="orange">
                <h2 className="brand-display text-3xl">{title}</h2>
                <p className="mt-2 text-sm font-bold text-brand-brown/75 dark:text-brand-cream/75">{text}</p>
              </PerifaCard>
            ))}
          </div>
        </div>
      </section>
    </PublicShell>
  );
}
