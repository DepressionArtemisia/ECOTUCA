import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  BarChart3,
  BookOpenCheck,
  CheckCircle2,
  ClipboardCheck,
  GraduationCap,
  PlayCircle,
  ShieldCheck,
  Sparkles,
  UsersRound
} from "lucide-react";
import { EcoButton } from "@/components/brand/eco-button";
import { BrandPattern } from "@/components/brand/brand-pattern";
import { ImpactRibbon } from "@/components/brand/impact-ribbon";
import { OfficialLogo } from "@/components/brand/official-logo";
import { PerifaCard } from "@/components/brand/perifa-card";
import { PublicShell } from "@/components/layout/public-shell";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { learningTracks } from "@/lib/mock-data/ecotuca";

const funnelSteps = [
  {
    title: "Inscricao",
    text: "Aluno ou professor envia cadastro com dados, disponibilidade e consentimentos.",
    icon: ClipboardCheck
  },
  {
    title: "Aprovacao",
    text: "A coordenacao valida perfil, turma, responsaveis e regras de acesso.",
    icon: ShieldCheck
  },
  {
    title: "Formacao",
    text: "Trilhas, aulas, materiais, atividades e acompanhamento pedagogico.",
    icon: BookOpenCheck
  },
  {
    title: "Certificacao",
    text: "Conclusao com evidencias, feedback e certificado emitido pela equipe.",
    icon: Award
  }
];

const panelPreviews = [
  {
    title: "Aluno",
    text: "Progresso, proxima aula, atividades, materiais, feedback e certificados.",
    href: "/app/aluno",
    icon: GraduationCap,
    tone: "yellow" as const
  },
  {
    title: "Professor",
    text: "Turmas, conteudos, fila de avaliacoes, devolutivas e comunicados.",
    href: "/app/professor",
    icon: UsersRound,
    tone: "mint" as const
  },
  {
    title: "Admin",
    text: "Aprovacoes, usuarios, trilhas, certificados, relatorios e impacto.",
    href: "/app/admin",
    icon: BarChart3,
    tone: "blue" as const
  }
];

const qualityBars = [
  "Mobile-first real",
  "Aprovacao por status",
  "Progresso salvo",
  "Conteudo revisado",
  "Certificado rastreavel",
  "Relatorios de impacto"
];

export default function HomePage() {
  return (
    <PublicShell>
      <section className="relative min-h-[84vh] overflow-hidden bg-brand-brown text-brand-cream">
        <Image
          src="/media/territory/complexo-alemao/complexo-alemao-panorama-acediscovery-cc-by-4.jpg"
          alt="Vista ampla do Complexo do Alemao usada como contexto territorial da plataforma ECOTUCA"
          fill
          priority
          className="object-cover opacity-[.32]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(58,26,22,.96),rgba(58,26,22,.84),rgba(51,85,149,.42))]" />
        <div className="absolute inset-x-0 top-0 h-3 bg-[linear-gradient(90deg,#FCC224,#E9635D,#2ACCB5,#335595,#FE9440)]" />
        <BrandPattern intensity="soft" className="opacity-20" />
        <div className="relative mx-auto grid min-h-[84vh] max-w-7xl gap-8 px-5 py-14 sm:px-6 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
          <div className="min-w-0">
            <OfficialLogo variant="tagline" tone="negative" size="lg" priority />
            <div className="mt-6 flex flex-wrap gap-2">
              <Badge tone="yellow">Plataforma de ensino</Badge>
              <Badge tone="mint">ECOTUCA producao</Badge>
            </div>
            <h1 className="text-display-xl mt-5 text-brand-yellow">
              A escola digital de ecoturismo do territorio.
            </h1>
            <p className="mt-5 max-w-2xl text-lg font-bold leading-8 text-brand-cream/88 sm:text-xl">
              Uma plataforma responsiva para formar jovens, acompanhar aulas, revisar atividades, emitir certificados e organizar impacto com a identidade ECOTUCA.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/cadastro/aluno">
                <EcoButton variant="mint" size="lg">
                  <GraduationCap size={18} />
                  Quero estudar
                </EcoButton>
              </Link>
              <Link href="/cadastro/professor">
                <EcoButton variant="coral" size="lg">
                  <UsersRound size={18} />
                  Quero ensinar
                </EcoButton>
              </Link>
              <Link href="/entrar">
                <EcoButton variant="outline" size="lg">
                  <ArrowRight size={18} />
                  Entrar
                </EcoButton>
              </Link>
            </div>
            <ImpactRibbon
              className="mt-8 max-w-2xl"
              items={[
                { label: "trilhas iniciais", value: "3" },
                { label: "jornada guiada", value: "4 etapas" },
                { label: "paineis", value: "aluno/prof/admin" }
              ]}
            />
          </div>

          <div className="brand-card relative overflow-hidden bg-brand-paper p-4 text-brand-brown shadow-premium dark:bg-brand-dark-soft dark:text-brand-cream sm:p-5">
            <div className="absolute inset-x-0 top-0 h-3 bg-[linear-gradient(90deg,#FCC224,#2ACCB5,#E9635D)]" />
            <div className="mt-3 flex items-center justify-between gap-3">
              <div>
                <Badge tone="mint">Aula em andamento</Badge>
                <h2 className="brand-display mt-4 text-4xl">Guia Local</h2>
              </div>
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-lg bg-brand-yellow text-brand-brown">
                <PlayCircle size={28} />
              </span>
            </div>
            <div className="relative mt-5 aspect-[16/10] overflow-hidden rounded-lg">
              <Image
                src="/media/territory/complexo-alemao/visao-do-complexo-thirson-cc-by-sa-4.jpg"
                alt="Vista do Complexo do Alemao como referencia de aula territorial"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-brown/70 to-transparent" />
              <p className="absolute bottom-4 left-4 right-4 text-sm font-black text-brand-cream">
                Como contar o territorio com seguranca
              </p>
            </div>
            <div className="mt-5">
              <div className="mb-2 flex justify-between text-sm font-black">
                <span>Progresso do aluno</span>
                <span>64%</span>
              </div>
              <Progress value={64} tone="mint" />
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {["Aula", "Atividade", "Feedback"].map((item, index) => (
                <div key={item} className="rounded-lg bg-brand-warm p-3 text-sm font-black text-brand-brown dark:bg-white/10 dark:text-brand-cream">
                  <CheckCircle2 size={17} className={index < 2 ? "text-brand-mint" : "text-brand-coral"} />
                  <p className="mt-2">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="premium-section">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="grid gap-6 lg:grid-cols-[.82fr_1.18fr] lg:items-end">
            <div>
              <Badge tone="coral">Funil real</Badge>
              <h2 className="text-display-lg mt-4">Da inscricao ao certificado.</h2>
              <p className="mt-4 max-w-2xl text-body-readable text-brand-brown/72 dark:text-brand-cream/72">
                O produto de producao comeca pelo ensino: cadastro, aprovacao, trilhas, aulas, atividades, feedback e certificado. Tudo preparado para Supabase, RLS e operacao real.
              </p>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {funnelSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <article key={step.title} className="brand-card p-5 dark:bg-brand-dark-soft/90">
                    <div className="flex items-center justify-between gap-3">
                      <Icon size={26} className="text-brand-coral" />
                      <span className="brand-display text-3xl text-brand-yellow">{index + 1}</span>
                    </div>
                    <h3 className="text-card-title mt-4">{step.title}</h3>
                    <p className="mt-2 text-sm font-bold text-brand-brown/70 dark:text-brand-cream/70">{step.text}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="trilhas" className="premium-section bg-white/55 dark:bg-white/5">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <Badge tone="yellow">Trilhas ECOTUCA</Badge>
              <h2 className="text-section-title mt-4">Conteudo com territorio e pratica.</h2>
            </div>
            <Link href="/cadastro/aluno" className="focus-ring-brand inline-flex items-center gap-2 rounded-lg text-sm font-black text-brand-blue dark:text-brand-mint">
              Entrar na trilha
              <ArrowRight size={16} />
            </Link>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {learningTracks.map((track) => (
              <PerifaCard key={track.id} tone={track.accent}>
                <div className="flex items-start justify-between gap-3">
                  <Badge tone={track.accent}>{track.category}</Badge>
                  <BookOpenCheck size={25} />
                </div>
                <h3 className="text-card-title mt-4">{track.title}</h3>
                <p className="mt-3 text-sm font-bold text-brand-brown/70 dark:text-brand-cream/70">{track.description}</p>
                <div className="mt-5 flex items-center justify-between text-sm font-black">
                  <span>{track.estimatedHours}h</span>
                  <span>{track.lessons.length} aulas</span>
                </div>
              </PerifaCard>
            ))}
          </div>
        </div>
      </section>

      <section className="premium-section">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_.72fr] lg:items-start">
            <div>
              <Badge tone="mint">Paineis responsivos</Badge>
              <h2 className="text-section-title mt-4">Cada perfil com uma area de trabalho de verdade.</h2>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {panelPreviews.map((panel) => {
                  const Icon = panel.icon;
                  return (
                    <Link key={panel.title} href={panel.href} className="focus-ring-brand block rounded-lg">
                      <PerifaCard tone={panel.tone} className="h-full">
                        <Icon size={28} />
                        <h3 className="text-card-title mt-4">{panel.title}</h3>
                        <p className="mt-2 text-sm font-bold text-brand-brown/70 dark:text-brand-cream/70">{panel.text}</p>
                      </PerifaCard>
                    </Link>
                  );
                })}
              </div>
            </div>
            <aside className="premium-context-panel p-5">
              <Sparkles size={28} className="text-brand-coral" />
              <h3 className="text-card-title mt-4">Padrao de producao</h3>
              <div className="mt-4 grid gap-2">
                {qualityBars.map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-lg bg-white/75 p-3 text-sm font-black dark:bg-white/10">
                    <span className="h-2 w-2 rounded-full bg-brand-mint" />
                    {item}
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-brand-brown py-14 text-brand-cream">
        <BrandPattern intensity="soft" className="opacity-20" />
        <div className="relative mx-auto grid max-w-7xl gap-6 px-5 sm:px-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <OfficialLogo tone="negative" variant="horizontal" size="md" />
            <h2 className="text-display-lg mt-6 text-brand-yellow">Vamos construir a plataforma real.</h2>
            <p className="mt-4 max-w-2xl text-base font-bold text-brand-cream/78">
              A proxima etapa e conectar esse funil ao Supabase real: cadastro, aprovacao, conteudos, progresso, atividades e certificados.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <Link href="/cadastro/aluno">
              <EcoButton variant="mint" size="lg">Cadastrar aluno</EcoButton>
            </Link>
            <Link href="/entrar">
              <EcoButton variant="outline" size="lg">Entrar na plataforma</EcoButton>
            </Link>
          </div>
        </div>
      </section>
    </PublicShell>
  );
}
