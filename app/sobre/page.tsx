import type { Metadata } from "next";
import Link from "next/link";
import { Leaf, LineChart, MapPinned, ShieldCheck, Users } from "lucide-react";
import { EcoButton } from "@/components/brand/eco-button";
import { ImpactBand } from "@/components/content/impact-band";
import { ProcessTimeline } from "@/components/content/process-timeline";
import { PublicShell } from "@/components/layout/public-shell";
import { RichPageHeader } from "@/components/layout/rich-page-header";
import { PerifaCard } from "@/components/brand/perifa-card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Sobre | ECOTUCA / Perifa Ecotour",
  description: "Conheca a missao, direcao territorial, educacional e tecnologica do MVP ECOTUCA / Perifa Ecotour."
};

export default function AboutPage() {
  return (
    <PublicShell>
      <section className="mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:py-12">
        <RichPageHeader
          eyebrow="Sobre o projeto"
          title="ECOTUCA e Perifa Ecotour"
          description="Uma base digital para formar jovens em ecoturismo, valorizar a Serra da Misericordia, conectar guias a visitantes e gerar indicadores claros para prestacao de contas."
          image="/media/territory/complexo-alemao/complexo-alemao-panorama-acediscovery-cc-by-4.jpg"
          imageAlt="Panorama do Complexo do Alemao conectado a missao ECOTUCA"
          badgeTone="mint"
        />
      </section>

      <section className="premium-section pt-2">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="desktop-feature-wall">
            <PerifaCard tone="yellow">
              <Users size={30} />
              <h2 className="brand-display mt-3 text-3xl">Juventude</h2>
              <p className="mt-2 text-sm font-bold text-brand-brown/70 dark:text-brand-cream/70">Formacao com pertencimento, pratica, tecnologia e oportunidade de renda.</p>
            </PerifaCard>
            <PerifaCard tone="mint">
              <Leaf size={30} />
              <h2 className="brand-display mt-3 text-3xl">Natureza</h2>
              <p className="mt-2 text-sm font-bold text-brand-brown/70 dark:text-brand-cream/70">Ecologia urbana, biodiversidade, educacao ambiental e turismo responsavel.</p>
            </PerifaCard>
            <PerifaCard tone="blue">
              <LineChart size={30} />
              <h2 className="brand-display mt-3 text-3xl">Dados</h2>
              <p className="mt-2 text-sm font-bold text-brand-brown/70 dark:text-brand-cream/70">Relatorios para acompanhar engajamento, certificacao, aprovacoes e impacto.</p>
            </PerifaCard>
          </div>
        </div>
      </section>

      <section className="premium-section bg-white/45 dark:bg-white/5">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="desktop-two-column-flow">
            <div>
              <Badge tone="coral">Direcao territorial</Badge>
              <h2 className="brand-display mt-4 text-5xl">Urbano, periferico, ambiental e premium</h2>
              <p className="mt-4 text-base font-bold text-brand-brown/70 dark:text-brand-cream/70">
                A identidade visual foi aplicada para evitar uma plataforma fria: cores oficiais, logos extraidas do manual, imagens territoriais creditadas e linguagem de produto pronta para decisores.
              </p>
            </div>
            <aside className="desktop-sticky-aside premium-context-panel p-5">
              <MapPinned size={28} className="text-brand-mint" />
              <h3 className="brand-display mt-3 text-3xl">Complexo do Alemao</h3>
              <p className="mt-2 text-sm font-bold text-brand-brown/70 dark:text-brand-cream/70">
                A plataforma nasce conectada ao territorio, evitando turismo extrativista e colocando formacao, memoria e cuidado no centro.
              </p>
              <Link href="/roteiros" className="mt-4 inline-flex">
                <EcoButton variant="mint">Ver roteiros</EcoButton>
              </Link>
            </aside>
          </div>
          <div className="mt-8">
            <ProcessTimeline
              steps={[
                { title: "Formar", description: "Trilhas para juventude, guias e educadores." },
                { title: "Cuidar", description: "Regras de imagem, territorio e validacao." },
                { title: "Publicar", description: "Roteiros responsaveis e narrativas locais." },
                { title: "Medir", description: "Indicadores para decisao e prestacao de contas." },
                { title: "Evoluir", description: "Supabase, PWA e operacao real em fases." }
              ]}
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-6">
        <ImpactBand title="Transparencia desde o MVP" description="Creditos, termos, privacidade e mapa do site ja estao organizados para a proxima conversa." href="/sitemap" action="Abrir mapa" />
        <div className="mt-6 brand-card p-5">
          <div className="flex gap-3">
            <ShieldCheck size={24} className="text-brand-mint" />
            <p className="text-sm font-bold text-brand-brown/75 dark:text-brand-cream/75">
              Antes da operacao publica, revisar termos, LGPD, autorizacao de imagem, precificacao, seguros, agenda e governanca local.
            </p>
          </div>
        </div>
      </section>
    </PublicShell>
  );
}
