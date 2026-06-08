import type { Metadata } from "next";
import Link from "next/link";
import { ClipboardCheck, HelpCircle, LockKeyhole, ShieldCheck, Sparkles, UserCheck, UsersRound } from "lucide-react";
import { EcoButton } from "@/components/brand/eco-button";
import { ProcessTimeline } from "@/components/content/process-timeline";
import { RoleSignupCard } from "@/components/forms/role-signup-card";
import { PublicShell } from "@/components/layout/public-shell";
import { RichPageHeader } from "@/components/layout/rich-page-header";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Cadastro ECOTUCA | Escolha seu perfil",
  description: "Cadastro segmentado para alunos, professores, guias e turistas da plataforma ECOTUCA / Perifa Ecotour."
};

const roles = [
  {
    label: "Aluno",
    href: "/cadastro/aluno",
    tone: "yellow" as const,
    description: "Para jovens que querem aprender, participar de trilhas, assistir aulas e evoluir ate uma certificacao.",
    bullets: ["Rascunho salvo no navegador", "Aprovacao da coordenacao", "Jornada de aprendizagem clara"]
  },
  {
    label: "Professor",
    href: "/cadastro/professor",
    tone: "blue" as const,
    description: "Para educadores e facilitadores que apoiam turmas, materiais, aulas e acompanhamento pedagogico.",
    bullets: ["Portfolio e mini bio", "Temas de aula", "Curadoria pedagogica"]
  },
  {
    label: "Guia",
    href: "/cadastro/guia",
    tone: "mint" as const,
    description: "Para condutores territoriais que querem organizar perfil, agenda, especialidades e roteiros.",
    bullets: ["Perfil publico", "Agenda e idiomas", "Especialidades territoriais"]
  },
  {
    label: "Turista",
    href: "/cadastro/turista",
    tone: "orange" as const,
    description: "Para visitantes interessados em roteiros comunitarios, ambientais e culturalmente responsaveis.",
    bullets: ["Preferencias de visita", "Contato responsavel", "Interesse por roteiro"]
  }
];

const infoBlocks = [
  {
    icon: UserCheck,
    title: "Como funciona a aprovacao",
    text: "Aluno, professor e guia passam por leitura da coordenacao antes de receber acesso completo. Turista entra como interesse de visita e recebe retorno da equipe."
  },
  {
    icon: ClipboardCheck,
    title: "Quais dados pedimos",
    text: "Contato, vinculo territorial, disponibilidade, interesses, autorizacoes e necessidades de acolhimento. Cada perfil pede somente o que faz sentido para sua jornada."
  },
  {
    icon: LockKeyhole,
    title: "Privacidade e autorizacao",
    text: "Nesta fase os formularios sao demos locais. Em producao, os dados precisam seguir LGPD, RLS no Supabase e termos claros para menores, imagem e comunicacao."
  },
  {
    icon: HelpCircle,
    title: "Duvidas frequentes",
    text: "O envio visual nao cria usuario real. A proxima etapa tecnica e conectar Auth, aprovacao admin, notificacao e armazenamento seguro quando autorizado."
  }
];

export default function RegisterPage() {
  return (
    <PublicShell>
      <section className="mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:py-12">
        <RichPageHeader
          eyebrow="Cadastro segmentado"
          title="Escolha como voce quer participar da ECOTUCA"
          description="Cada perfil tem uma entrada propria para preservar contexto, autorizacoes, aprovacao e uma experiencia mais humana desde o primeiro contato."
          badgeTone="coral"
        >
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { icon: ClipboardCheck, label: "Rascunho local", text: "Preencha em etapas e revise antes de confirmar." },
              { icon: ShieldCheck, label: "Aprovacao", text: "Perfis sensiveis passam pela coordenacao." },
              { icon: Sparkles, label: "Identidade", text: "Visual conectado ao manual ECOTUCA / Perifa." }
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="rounded-lg bg-white/75 p-4 dark:bg-white/10">
                  <Icon size={22} />
                  <p className="mt-3 text-sm font-black">{item.label}</p>
                  <p className="mt-1 text-xs font-bold text-brand-brown/65 dark:text-brand-cream/70">{item.text}</p>
                </div>
              );
            })}
          </div>
        </RichPageHeader>
      </section>

      <section className="premium-section pt-2">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="desktop-editorial-grid">
            {roles.map((role) => (
              <RoleSignupCard key={role.href} {...role} />
            ))}
          </div>
        </div>
      </section>

      <section className="premium-section bg-white/45 dark:bg-white/5">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="desktop-two-column-flow">
            <div>
              <Badge tone="mint">Como o cadastro evolui</Badge>
              <h2 className="brand-display mt-4 text-5xl">Entrada simples, decisao organizada</h2>
              <p className="mt-4 max-w-3xl text-base font-bold text-brand-brown/70 dark:text-brand-cream/70">
                A proposta e apresentar uma experiencia madura para a reuniao: formularios ricos, rascunho seguro no navegador e clareza sobre o que ainda depende de validacao real.
              </p>
            </div>
            <aside className="desktop-sticky-aside premium-context-panel p-5">
              <UsersRound size={28} className="text-brand-coral" />
              <h3 className="brand-display mt-3 text-3xl">Perfis e governanca</h3>
              <p className="mt-2 text-sm font-bold text-brand-brown/70 dark:text-brand-cream/70">
                Aluno, professor e guia pedem aprovacao. Turista entra como interesse de visita, com linguagem acolhedora e responsavel.
              </p>
              <Link href="/app/admin/aprovacoes" className="mt-4 inline-flex">
                <EcoButton variant="outline">Ver fila admin</EcoButton>
              </Link>
            </aside>
          </div>
          <div className="mt-8">
            <ProcessTimeline
              steps={[
                { title: "Escolha do perfil", description: "A pessoa entra pelo caminho correto." },
                { title: "Preenchimento", description: "Campos organizados por identidade, experiencia e termos." },
                { title: "Rascunho", description: "Dados permanecem no navegador durante a apresentacao." },
                { title: "Revisao", description: "Informacoes aparecem em resumo antes da confirmacao." },
                { title: "Validacao", description: "Acesso real depende da coordenacao e Supabase." }
              ]}
            />
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {infoBlocks.map((block) => {
              const Icon = block.icon;
              return (
                <article key={block.title} className="brand-card p-5 dark:bg-brand-dark-soft/90">
                  <Icon size={26} className="text-brand-coral" />
                  <h3 className="brand-display mt-4 text-3xl">{block.title}</h3>
                  <p className="mt-3 text-sm font-bold text-brand-brown/70 dark:text-brand-cream/70">{block.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </PublicShell>
  );
}
