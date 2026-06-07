import Link from "next/link";
import { ArrowRight, BarChart3, BookOpen, GraduationCap, MapPinned, Smartphone, UserRound } from "lucide-react";
import { PublicShell } from "@/components/layout/public-shell";
import { DemoUserSwitcher } from "@/components/demo/demo-user-switcher";
import { FullscreenButton } from "@/components/demo/fullscreen-button";
import { DataSourceBadge } from "@/components/demo/data-source-badge";
import { EcoButton } from "@/components/brand/eco-button";
import { PerifaCard } from "@/components/brand/perifa-card";
import { Badge } from "@/components/ui/badge";

const demoCards = [
  { title: "Entrar como Visitante", href: "/", icon: UserRound, tone: "yellow" as const, user: "Sem login", show: "Home publica, marca e proposta institucional." },
  { title: "Entrar como Aluno", href: "/app/aluno", icon: GraduationCap, tone: "mint" as const, user: "aluno@ecotuca.local", show: "Dashboard, jornada, trilhas e video retomado." },
  { title: "Entrar como Professor", href: "/app/professor", icon: BookOpen, tone: "blue" as const, user: "professora@ecotuca.local", show: "Turmas, conteudos e comunidade pedagogica." },
  { title: "Entrar como Guia", href: "/app/guia", icon: MapPinned, tone: "orange" as const, user: "guia@ecotuca.local", show: "Perfil, certificados, roteiros e agenda." },
  { title: "Entrar como Turista", href: "/app/turista", icon: Smartphone, tone: "coral" as const, user: "turista@ecotuca.local", show: "Roteiros favoritos e reservas simuladas." },
  { title: "Entrar como Admin", href: "/app/admin", icon: BarChart3, tone: "blue" as const, user: "admin@ecotuca.local", show: "Aprovacoes, metricas e relatorios." },
  { title: "Ver Demo Mobile", href: "/demo-mobile", icon: Smartphone, tone: "mint" as const, user: "Apresentacao", show: "App em moldura de celular com telas alternaveis." },
  { title: "Ver Roteiro", href: "/roteiros/serra-da-misericordia", icon: MapPinned, tone: "yellow" as const, user: "Visitante/Turista", show: "Detalhe, guia, seguranca e interesse." },
  { title: "Ver Impacto", href: "/app/admin/metricas", icon: BarChart3, tone: "coral" as const, user: "admin@ecotuca.local", show: "Indicadores e exportacao CSV mock." }
];

export default function DemoPage() {
  return (
    <PublicShell>
      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-6">
        <Badge tone="coral">Modo apresentacao</Badge>
        <h1 className="brand-display mt-5 max-w-4xl text-6xl text-brand-brown dark:text-brand-yellow">Roteiro guiado para a reuniao</h1>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-3xl text-brand-brown/75 dark:text-brand-cream/75">
            Use estes atalhos para apresentar a historia completa: escola, aluno, turismo, guias, admin e impacto.
          </p>
          <div className="flex flex-wrap gap-2">
            <DataSourceBadge />
            <Link href="/demo/status">
              <EcoButton variant="outline">Status tecnico</EcoButton>
            </Link>
            <FullscreenButton />
          </div>
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
                  <p className="mt-3 rounded-lg bg-brand-warm p-2 text-xs font-black text-brand-brown">Usuario: {card.user}</p>
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
          <PerifaCard tone="yellow">
            <p className="text-sm font-black uppercase text-brand-coral">Sequencia sugerida</p>
            <ol className="mt-4 space-y-3 text-sm font-bold">
              {[
                "Abrir home publica.",
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
