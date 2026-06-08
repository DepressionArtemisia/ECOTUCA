import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, GraduationCap, MapPinned, ShieldCheck, Sparkles, Trees, UsersRound } from "lucide-react";
import { PublicShell } from "@/components/layout/public-shell";
import { EcoButton } from "@/components/brand/eco-button";
import { PerifaCard } from "@/components/brand/perifa-card";
import { BrandPattern } from "@/components/brand/brand-pattern";
import { ImpactRibbon } from "@/components/brand/impact-ribbon";
import { OfficialLogo } from "@/components/brand/official-logo";
import { TerritoryShapes } from "@/components/brand/territory-shapes";
import { RouteCard } from "@/components/cards/route-card";
import { TrackCard } from "@/components/cards/track-card";
import { GuideCard } from "@/components/cards/guide-card";
import { Badge } from "@/components/ui/badge";
import { adminMetrics, guides, learningTracks, tourRoutes } from "@/lib/mock-data/ecotuca";

export default function HomePage() {
  return (
    <PublicShell>
      <section className="relative min-h-[84vh] overflow-hidden">
        <Image
          src="/media/territory/complexo-alemao/complexo-alemao-panorama-acediscovery-cc-by-4.jpg"
          alt="Vista ampla do Complexo do Alemao com morros e paisagem urbana"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(58,26,22,.88),rgba(58,26,22,.58),rgba(42,204,181,.12))]" />
        <div className="absolute inset-x-0 top-0 h-3 bg-[linear-gradient(90deg,#FCC224,#E9635D,#2ACCB5,#335595,#FE9440)]" />
        <TerritoryShapes className="opacity-70" />
        <div className="relative mx-auto flex min-h-[84vh] max-w-7xl items-center px-5 py-16 sm:px-6">
          <div className="w-full min-w-0 max-w-3xl text-brand-cream">
            <div className="mb-5">
              <OfficialLogo variant="tagline" tone="negative" size="lg" priority />
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge tone="yellow">Complexo do Alemao</Badge>
              <Badge tone="mint">MVP navegavel - apresentacao</Badge>
            </div>
            <h1 className="brand-display mt-5 text-5xl text-brand-yellow sm:text-6xl lg:text-7xl">
              Ecoturismo, formacao e territorio conectando jovens do Complexo do Alemao a novas oportunidades.
            </h1>
            <p className="mt-5 max-w-2xl text-lg font-bold text-brand-cream/90 sm:text-xl">
              Uma escola de ecoturismo integrada a Perifa Ecotour para formar guias locais, valorizar a Serra da Misericordia e transformar experiencias em impacto social.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/demo">
                <EcoButton variant="mint" size="lg">
                  <Sparkles size={18} />
                  Abrir demo
                </EcoButton>
              </Link>
              <Link href="/roteiros">
                <EcoButton variant="outline" size="lg">
                  <MapPinned size={18} />
                  Ver roteiros
                </EcoButton>
              </Link>
              <Link href="/cadastro">
                <EcoButton variant="coral" size="lg">
                  <UsersRound size={18} />
                  Criar cadastro
                </EcoButton>
              </Link>
            </div>
            <ImpactRibbon
              className="mt-8 max-w-2xl"
              items={[
                { label: "jornada do aluno", value: "5 etapas" },
                { label: "trilhas iniciais", value: "3" },
                { label: "roteiros vitrine", value: "6" }
              ]}
            />
          </div>
        </div>
      </section>

      <section className="relative mx-auto grid max-w-7xl gap-4 px-5 py-10 sm:px-6 md:grid-cols-3">
        <BrandPattern className="rounded-lg opacity-25" />
        <PerifaCard tone="yellow">
          <GraduationCap size={28} className="text-brand-orange" />
          <h2 className="brand-display mt-4 text-3xl">Educacao ambiental</h2>
          <p className="mt-2 text-sm text-brand-brown/75 dark:text-brand-cream/75">Trilhas de guia local, biodiversidade, Agenda 2030 e empreendedorismo.</p>
        </PerifaCard>
        <PerifaCard tone="mint">
          <UsersRound size={28} className="text-brand-blue" />
          <h2 className="brand-display mt-4 text-3xl">Turismo comunitario</h2>
          <p className="mt-2 text-sm text-brand-brown/75 dark:text-brand-cream/75">Roteiros com narrativas locais, hospitalidade e protagonismo de moradores.</p>
        </PerifaCard>
        <PerifaCard tone="coral">
          <ShieldCheck size={28} className="text-brand-coral" />
          <h2 className="brand-display mt-4 text-3xl">Prestacao de contas</h2>
          <p className="mt-2 text-sm text-brand-brown/75 dark:text-brand-cream/75">Metricas de formacao, certificados, solicitacoes e prestacao de contas.</p>
        </PerifaCard>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-premium">
            <Image
              src="/media/territory/penha/panorama-zona-norte-igreja-penha-adam-jones-cc-by-sa-2.jpg"
              alt="Panorama da Zona Norte visto a partir da Igreja da Penha"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-brown/55 to-transparent" />
            <Badge tone="yellow" className="absolute bottom-4 left-4">Territorio vivo</Badge>
          </div>
          <div className="min-w-0">
            <p className="inline-flex items-center gap-2 text-sm font-black uppercase text-brand-orange">
              <Trees size={17} />
              Complexo, Serra e Penha
            </p>
            <h2 className="brand-display mt-3 text-5xl text-brand-brown dark:text-brand-yellow">
              A aula sai da tela e volta para o territorio.
            </h2>
            <p className="mt-4 text-brand-brown/75 dark:text-brand-cream/75">
              A ECOTUCA organiza a jornada do jovem: cadastro, formacao, aula pratica, certificacao, perfil de guia, roteiro publicado e impacto acompanhado pela coordenacao.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {["Serra da Misericordia", "Mirantes da Penha", "Cultura local", "Renda responsavel"].map((item) => (
                <div key={item} className="rounded-lg border border-brand-brown/10 bg-white/80 p-3 text-sm font-black shadow-soft dark:bg-white/10">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-black uppercase text-brand-coral">Trilhas E-ECOTUCA</p>
            <h2 className="brand-display text-5xl">Jornada do aluno</h2>
          </div>
          <Link href="/app/aluno" className="inline-flex items-center gap-2 text-sm font-black text-brand-blue dark:text-brand-mint">
            Ver area do aluno
            <ArrowRight size={16} />
          </Link>
        </div>
        <div className="mt-6 grid gap-3 rounded-lg bg-brand-brown p-4 text-brand-cream shadow-card md:grid-cols-4">
          {[
            "Aluno entra na trilha",
            "Conclui formacao",
            "Vira guia local",
            "Atende roteiros"
          ].map((item, index) => (
            <div key={item} className="rounded-lg bg-white/10 p-4">
              <p className="brand-display text-3xl text-brand-yellow">{index + 1}</p>
              <p className="text-sm font-black">{item}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {learningTracks.map((track) => (
            <TrackCard key={track.id} track={track} />
          ))}
        </div>
      </section>

      <section className="bg-brand-brown py-10 text-brand-cream">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-black uppercase text-brand-mint">Mobile e turismo</p>
              <h2 className="brand-display text-5xl text-brand-yellow">Roteiros em destaque</h2>
              <p className="mt-2 max-w-2xl text-sm font-bold text-brand-cream/75">
                Cards com imagens reais/licenciadas e selo de validacao para separar demonstracao de operacao final.
              </p>
            </div>
            <Link href="/demo-mobile">
              <EcoButton variant="mint">
                <BookOpen size={17} />
                Ver demo mobile
              </EcoButton>
            </Link>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {tourRoutes.slice(0, 3).map((route) => (
              <RouteCard key={route.slug} route={route} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-6">
        <div className="mb-6 grid gap-4 lg:grid-cols-3">
          {[
            ["Cadastros completos", "Aluno e professor agora tem etapas, rascunho, revisao e confirmacao visual.", "/cadastro"],
            ["Mapa do MVP", "Sitemap visual organiza paginas publicas, areas internas e transparencia.", "/sitemap"],
            ["Como funciona", "Fluxo claro da formacao ao roteiro publicado e acompanhado.", "/como-funciona"]
          ].map(([item, text, href]) => (
            <Link key={item} href={href} className="focus-ring-brand block rounded-lg">
              <PerifaCard tone="mint" className="h-full">
                <h2 className="brand-display text-3xl">{item}</h2>
                <p className="mt-2 text-sm font-bold text-brand-brown/75 dark:text-brand-cream/75">{text}</p>
              </PerifaCard>
            </Link>
          ))}
        </div>
        <div className="mb-8 grid gap-3 md:grid-cols-4">
          {adminMetrics.slice(0, 4).map((metric) => (
            <div key={metric.label} className="brand-card p-4 dark:bg-brand-dark-soft/90">
              <p className="text-xs font-black uppercase text-brand-coral">{metric.label}</p>
              <p className="brand-display mt-2 text-4xl text-brand-brown dark:text-brand-yellow">{metric.value}</p>
              <p className="text-xs font-bold text-brand-brown/65 dark:text-brand-cream/65">{metric.detail}</p>
            </div>
          ))}
        </div>
        <div className="grid gap-4 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <div className="min-w-0">
            <p className="text-sm font-black uppercase text-brand-orange">Guias e comunidade</p>
            <h2 className="brand-display text-5xl">Jovens protagonistas</h2>
            <p className="mt-4 text-brand-brown/75 dark:text-brand-cream/75">
              O app mostra certificados, especialidades e roteiros associados para transformar formacao em oportunidade.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {guides.map((guide) => (
              <GuideCard key={guide.id} guide={guide} />
            ))}
          </div>
        </div>
      </section>
    </PublicShell>
  );
}
