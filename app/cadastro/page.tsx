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
  description: "Cadastro de aluno e professor para a plataforma de ensino ECOTUCA."
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
  }
];

const infoBlocks = [
  {
    icon: UserCheck,
    title: "Como funciona a aprovacao",
    text: "Aluno e professor passam por leitura da coordenacao antes de receber acesso completo."
  },
  {
    icon: ClipboardCheck,
    title: "Quais dados pedimos",
    text: "Contato, vinculo territorial, disponibilidade, interesses, autorizacoes e necessidades de acolhimento. Cada perfil pede somente o que faz sentido para sua jornada."
  },
  {
    icon: LockKeyhole,
    title: "Privacidade e autorizacao",
    text: "A producao deve seguir LGPD, RLS no Supabase e termos claros para menores, imagem e comunicacao."
  },
  {
    icon: HelpCircle,
    title: "Duvidas frequentes",
    text: "O acesso so e liberado depois da validacao. A equipe pode pedir ajustes ou informacoes complementares."
  }
];

export default function RegisterPage() {
  return (
    <PublicShell>
      <section className="mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:py-12">
        <RichPageHeader
          eyebrow="Cadastro segmentado"
          title="Escolha como voce quer participar da ECOTUCA"
          description="A plataforma de ensino comeca com dois caminhos principais: aluno em formacao ou professor/facilitador da rede pedagogica."
          badgeTone="coral"
        >
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { icon: ClipboardCheck, label: "Inscricao", text: "Preencha em etapas e revise antes de enviar." },
              { icon: ShieldCheck, label: "Aprovacao", text: "A coordenacao valida perfil, turma e autorizacoes." },
              { icon: Sparkles, label: "Entrada", text: "Depois da aprovacao, o acesso e liberado." }
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
                O funil real organiza dados, consentimentos, disponibilidade e contexto pedagogico para que a coordenacao aprove acessos com seguranca.
              </p>
            </div>
            <aside className="desktop-sticky-aside premium-context-panel p-5">
              <UsersRound size={28} className="text-brand-coral" />
              <h3 className="brand-display mt-3 text-3xl">Perfis e governanca</h3>
              <p className="mt-2 text-sm font-bold text-brand-brown/70 dark:text-brand-cream/70">
                Aluno e professor entram por fluxos diferentes porque a jornada, os consentimentos e a operacao de cada perfil sao diferentes.
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
                { title: "Rascunho", description: "A pessoa pode revisar os dados antes de enviar." },
                { title: "Revisao", description: "Informacoes aparecem em resumo antes da confirmacao." },
                { title: "Validacao", description: "Acesso completo depende da coordenacao." }
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
