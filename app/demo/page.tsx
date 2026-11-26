import { notFound } from "next/navigation";
import { shouldEnforceAppAccess } from "@/lib/auth/runtime";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BarChart3, BookOpen, GraduationCap, MapPinned, Smartphone, UserRound } from "lucide-react";
import { PublicShell } from "@/components/layout/public-shell";
import { DemoUserSwitcher } from "@/components/demo/demo-user-switcher";
import { FullscreenButton } from "@/components/demo/fullscreen-button";
import { DataSourceBadge } from "@/components/demo/data-source-badge";
import { ResetDemoDataButton } from "@/components/demo/reset-demo-data-button";
import { EcoLink } from "@/components/brand/eco-button";
import { PerifaCard } from "@/components/brand/perifa-card";
import { ImpactRibbon } from "@/components/brand/impact-ribbon";
import { OfficialLogo } from "@/components/brand/official-logo";
import { Badge } from "@/components/ui/badge";

const demoCards = [
  { title: "Entrar como Visitante", href: "/", icon: UserRound, tone: "yellow" as const, user: "Sem login", show: "Home publica, marca e proposta institucional." },
  { title: "Entrar como Aluno", href: "/app/aluno", icon: GraduationCap, tone: "mint" as const, user: "aluno@ecotuca.local", show: "Dashboard, jornada, trilhas e vídeo retomado." },
  { title: "Entrar como Professor", href: "/app/professor", icon: BookOpen, tone: "blue" as const, user: "professora@ecotuca.local", show: "Turmas, conteúdos e comunidade pedagógica." },
  { title: "Entrar como Guia", href: "/app/guia", icon: MapPinned, tone: "orange" as const, user: "guia@ecotuca.local", show: "Perfil, certificados, roteiros e agenda." },
  { title: "Entrar como Turista", href: "/app/turista", icon: Smartphone, tone: "coral" as const, user: "turista@ecotuca.local", show: "Roteiros favoritos e solicitações de visita." },
  { title: "Entrar como Admin", href: "/app/admin", icon: BarChart3, tone: "blue" as const, user: "admin@ecotuca.local", show: "Aprovações, métricas e relatórios." },
  { title: "Ver Cadastros", href: "/cadastro", icon: UserRound, tone: "yellow" as const, user: "Apresentacao", show: "Escolha de perfil, aluno/professor em etapas e revisão." },
  { title: "Mapa do Site", href: "/sitemap", icon: MapPinned, tone: "mint" as const, user: "Apresentacao", show: "Todos os caminhos do MVP em uma única página." },
  { title: "Ver Demo Mobile", href: "/demo-mobile", icon: Smartphone, tone: "mint" as const, user: "Apresentacao", show: "App em moldura de celular com telas alternaveis." },
  { title: "Ver Roteiro", href: "/roteiros/serra-da-misericordia", icon: MapPinned, tone: "yellow" as const, user: "Visitante/Turista", show: "Detalhe, guia, segurança e interesse." },
  { title: "Ver Impacto", href: "/app/admin/metricas", icon: BarChart3, tone: "coral" as const, user: "admin@ecotuca.local", show: "Indicadores e exportação CSV de demonstração." }
];

export default function DemoPage() {
  if (shouldEnforceAppAccess()) notFound();
  return (
    <PublicShell>
      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-6">
        <div className="brand-card relative overflow-hidden p-6 dark:bg-brand-dark-soft/90">
          <Image
            src="/media/territory/complexo-alemao/visao-do-complexo-thirson-cc-by-sa-4.jpg"
            alt="Vista do Complexo do Alemão usada como textura territorial da central de apresentacao"
            fill
            priority
            className="object-cover opacity-[.15]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-paper/95 via-brand-paper/88 to-brand-yellow/40 dark:from-brand-brown/95 dark:via-brand-brown/85 dark:to-brand-blue/40" />
          <div className="absolute inset-x-0 top-0 h-2 bg-[linear-gradient(90deg,#FCC224,#E9635D,#2ACCB5,#335595,#FE9440)]" />
          <div className="relative mb-5">
            <OfficialLogo variant="tagline" size="lg" />
          </div>
          <div className="relative">
            <Badge tone="coral">Central executiva da apresentacao</Badge>
          </div>
          <h1 className="brand-display relative mt-5 max-w-4xl text-5xl text-brand-brown dark:text-brand-yellow sm:text-6xl">Abra a história, não a técnica</h1>
          <p className="relative mt-4 max-w-3xl text-brand-brown/75 dark:text-brand-cream/75">
            Use estes atalhos para apresentar a história completa: escola, aluno, turismo, guias, coordenação e impacto.
          </p>
          <ImpactRibbon
            className="relative mt-5 max-w-3xl"
            items={[
              { label: "perfis navegaveis", value: "6" },
              { label: "fluxo sugerido", value: "13 passos" },
              { label: "modo seguro", value: "ativo" }
            ]}
          />
        </div>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-3xl text-sm font-bold text-brand-brown/70 dark:text-brand-cream/70">Ambiente pronto para apresentacao com dados de demonstração.</p>
          <div className="flex flex-wrap gap-2">
            <DataSourceBadge />
            <EcoLink href="/demo/status" variant="outline">Status do ambiente</EcoLink>
            <EcoLink href="/demo-mobile" variant="mint">Abrir mobile</EcoLink>
            <EcoLink href="/sitemap" variant="blue">Mapa do site</EcoLink>
            <FullscreenButton />
            <ResetDemoDataButton />
          </div>
        </div>
        <div className="mt-8 grid gap-4 lg:grid-cols-[.8fr_1.2fr]">
          <PerifaCard tone="mint">
            <Badge tone="yellow">Comece por aqui</Badge>
            <h2 className="brand-display mt-4 text-4xl">Visitante, turista, aluno e impacto</h2>
            <p className="mt-3 text-sm font-bold text-brand-brown/75 dark:text-brand-cream/75">
              Comece pela home publica, mostre o app mobile e depois entre nos fluxos de roteiro, aluno, professor, guia e coordenação.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <EcoLink href="/" variant="coral">Home publica</EcoLink>
              <EcoLink href="/roteiros/serra-da-misericordia" variant="outline">Roteiro exemplo</EcoLink>
              <EcoLink href="/cadastro/aluno" variant="mint">Cadastro aluno</EcoLink>
            </div>
          </PerifaCard>
          <PerifaCard tone="yellow">
            <Badge tone="coral">Roteiro recomendado</Badge>
            <p className="mt-4 text-sm font-bold text-brand-brown/75 dark:text-brand-cream/75">
              Home publica, cadastro, demo mobile, roteiro turístico, aluno, aula com progresso, professor, guia, admin e status técnico discreto.
            </p>
            <EcoLink href="/app/aluno" variant="mint" className="mt-5 inline-block">Seguir fluxo do aluno</EcoLink>
          </PerifaCard>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {demoCards.map((card) => {
            const Icon = card.icon;
            return (
              <Link key={card.href} href={card.href}>
                <PerifaCard tone={card.tone} className="h-full">
                  <Icon size={30} />
                  <h2 className="brand-display mt-4 text-3xl">{card.title}</h2>
                  <p className="mt-2 text-sm font-bold text-brand-brown/75 dark:text-brand-cream/75">{card.show}</p>
                  <p className="mt-3 rounded-lg bg-brand-warm p-2 text-xs font-black text-brand-brown">Acesso: {card.user}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-brand-blue dark:text-brand-mint">
                    Clique para abrir
                    <ArrowRight size={16} />
                  </span>
                </PerifaCard>
              </Link>
            );
          })}
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_.8fr]">
          <DemoUserSwitcher />
          <PerifaCard tone="yellow" className="min-w-0">
            <p className="text-sm font-black uppercase text-[var(--accent-text)]">Sequencia sugerida</p>
            <ol className="mt-4 space-y-3 text-sm font-bold">
              {[
                "Abrir home publica.",
                "Mostrar cadastro de aluno.",
                "Mostrar app mobile.",
                "Mostrar roteiro turístico.",
                "Enviar solicitação de interesse.",
                "Entrar como aluno.",
                "Mostrar trilha e aula.",
                "Mostrar vídeo retomando progresso.",
                "Entrar como professor.",
                "Mostrar acompanhamento.",
                "Entrar como admin.",
                "Mostrar aprovações e métricas.",
                "Fechar com impacto social."
              ].map((item, index) => (
                <li key={item} className="flex gap-3 rounded-lg bg-white/75 p-3 dark:bg-white/10">
                  <span className="font-black text-[var(--accent-text)]">{index + 1}</span>
                  {item}
                </li>
              ))}
            </ol>
            <EcoLink href="/app/aluno" variant="mint" className="mt-5 inline-block">Próximo passo</EcoLink>
          </PerifaCard>
        </div>
      </section>
    </PublicShell>
  );
}
