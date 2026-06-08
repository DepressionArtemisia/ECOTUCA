import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BarChart3, BookOpen, GraduationCap, MapPinned, Smartphone, UserRound } from "lucide-react";
import { PublicShell } from "@/components/layout/public-shell";
import { DemoUserSwitcher } from "@/components/demo/demo-user-switcher";
import { FullscreenButton } from "@/components/demo/fullscreen-button";
import { DataSourceBadge } from "@/components/demo/data-source-badge";
import { ResetDemoDataButton } from "@/components/demo/reset-demo-data-button";
import { EcoButton } from "@/components/brand/eco-button";
import { PerifaCard } from "@/components/brand/perifa-card";
import { ImpactRibbon } from "@/components/brand/impact-ribbon";
import { OfficialLogo } from "@/components/brand/official-logo";
import { Badge } from "@/components/ui/badge";

const demoCards = [
  { title: "Entrar como Visitante", href: "/", icon: UserRound, tone: "yellow" as const, user: "Sem login", show: "Home publica, marca e proposta institucional." },
  { title: "Entrar como Aluno", href: "/app/aluno", icon: GraduationCap, tone: "mint" as const, user: "aluno@ecotuca.local", show: "Dashboard, jornada, trilhas e video retomado." },
  { title: "Entrar como Professor", href: "/app/professor", icon: BookOpen, tone: "blue" as const, user: "professora@ecotuca.local", show: "Turmas, conteudos e comunidade pedagogica." },
  { title: "Entrar como Guia", href: "/app/guia", icon: MapPinned, tone: "orange" as const, user: "guia@ecotuca.local", show: "Perfil, certificados, roteiros e agenda." },
  { title: "Entrar como Turista", href: "/app/turista", icon: Smartphone, tone: "coral" as const, user: "turista@ecotuca.local", show: "Roteiros favoritos e solicitacoes de visita." },
  { title: "Entrar como Admin", href: "/app/admin", icon: BarChart3, tone: "blue" as const, user: "admin@ecotuca.local", show: "Aprovacoes, metricas e relatorios." },
  { title: "Ver Cadastros", href: "/cadastro", icon: UserRound, tone: "yellow" as const, user: "Apresentacao", show: "Escolha de perfil, aluno/professor em etapas e revisao." },
  { title: "Mapa do Site", href: "/sitemap", icon: MapPinned, tone: "mint" as const, user: "Apresentacao", show: "Todos os caminhos do MVP em uma unica pagina." },
  { title: "Ver Demo Mobile", href: "/demo-mobile", icon: Smartphone, tone: "mint" as const, user: "Apresentacao", show: "App em moldura de celular com telas alternaveis." },
  { title: "Ver Roteiro", href: "/roteiros/serra-da-misericordia", icon: MapPinned, tone: "yellow" as const, user: "Visitante/Turista", show: "Detalhe, guia, seguranca e interesse." },
  { title: "Ver Impacto", href: "/app/admin/metricas", icon: BarChart3, tone: "coral" as const, user: "admin@ecotuca.local", show: "Indicadores e exportacao CSV de demonstracao." }
];

export default function DemoPage() {
  return (
    <PublicShell>
      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-6">
        <div className="brand-card relative overflow-hidden p-6 dark:bg-brand-dark-soft/90">
          <Image
            src="/media/territory/complexo-alemao/visao-do-complexo-thirson-cc-by-sa-4.jpg"
            alt="Vista do Complexo do Alemao usada como textura territorial da central de apresentacao"
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
          <h1 className="brand-display relative mt-5 max-w-4xl text-5xl text-brand-brown dark:text-brand-yellow sm:text-6xl">Abra a historia, nao a tecnica</h1>
          <p className="relative mt-4 max-w-3xl text-brand-brown/75 dark:text-brand-cream/75">
            Use estes atalhos para apresentar a historia completa: escola, aluno, turismo, guias, coordenacao e impacto.
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
          <p className="max-w-3xl text-sm font-bold text-brand-brown/70 dark:text-brand-cream/70">Ambiente pronto para apresentacao com dados de demonstracao.</p>
          <div className="flex flex-wrap gap-2">
            <DataSourceBadge />
            <Link href="/demo/status">
              <EcoButton variant="outline">Status do ambiente</EcoButton>
            </Link>
            <Link href="/demo-mobile">
              <EcoButton variant="mint">Abrir mobile</EcoButton>
            </Link>
            <Link href="/sitemap">
              <EcoButton variant="blue">Mapa do site</EcoButton>
            </Link>
            <FullscreenButton />
            <ResetDemoDataButton />
          </div>
        </div>
        <div className="mt-8 grid gap-4 lg:grid-cols-[.8fr_1.2fr]">
          <PerifaCard tone="mint">
            <Badge tone="yellow">Comece por aqui</Badge>
            <h2 className="brand-display mt-4 text-4xl">Visitante, turista, aluno e impacto</h2>
            <p className="mt-3 text-sm font-bold text-brand-brown/75 dark:text-brand-cream/75">
              Comece pela home publica, mostre o app mobile e depois entre nos fluxos de roteiro, aluno, professor, guia e coordenacao.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Link href="/">
                <EcoButton variant="coral">Home publica</EcoButton>
              </Link>
              <Link href="/roteiros/serra-da-misericordia">
                <EcoButton variant="outline">Roteiro exemplo</EcoButton>
              </Link>
              <Link href="/cadastro/aluno">
                <EcoButton variant="mint">Cadastro aluno</EcoButton>
              </Link>
            </div>
          </PerifaCard>
          <PerifaCard tone="yellow">
            <Badge tone="coral">Roteiro recomendado</Badge>
            <p className="mt-4 text-sm font-bold text-brand-brown/75 dark:text-brand-cream/75">
              Home publica, cadastro, demo mobile, roteiro turistico, aluno, aula com progresso, professor, guia, admin e status tecnico discreto.
            </p>
            <Link href="/app/aluno" className="mt-5 inline-block">
              <EcoButton variant="mint">Seguir fluxo do aluno</EcoButton>
            </Link>
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
            <p className="text-sm font-black uppercase text-brand-coral">Sequencia sugerida</p>
            <ol className="mt-4 space-y-3 text-sm font-bold">
              {[
                "Abrir home publica.",
                "Mostrar cadastro de aluno.",
                "Mostrar app mobile.",
                "Mostrar roteiro turistico.",
                "Enviar solicitacao de interesse.",
                "Entrar como aluno.",
                "Mostrar trilha e aula.",
                "Mostrar video retomando progresso.",
                "Entrar como professor.",
                "Mostrar acompanhamento.",
                "Entrar como admin.",
                "Mostrar aprovacoes e metricas.",
                "Fechar com impacto social."
              ].map((item, index) => (
                <li key={item} className="flex gap-3 rounded-lg bg-white/75 p-3 dark:bg-white/10">
                  <span className="font-black text-brand-orange">{index + 1}</span>
                  {item}
                </li>
              ))}
            </ol>
            <Link href="/app/aluno" className="mt-5 inline-block">
              <EcoButton variant="mint">Proximo passo</EcoButton>
            </Link>
          </PerifaCard>
        </div>
      </section>
    </PublicShell>
  );
}
