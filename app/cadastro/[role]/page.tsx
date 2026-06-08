import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, Languages, MapPinned, Send, UserCheck } from "lucide-react";
import { EcoButton } from "@/components/brand/eco-button";
import { ImpactBand } from "@/components/content/impact-band";
import { EthicalNotice } from "@/components/content/ethical-notice";
import { PublicShell } from "@/components/layout/public-shell";
import { Badge } from "@/components/ui/badge";
import { StudentSignupFlow } from "@/features/signup/student-signup-flow";
import { TeacherSignupFlow } from "@/features/signup/teacher-signup-flow";

const roles = {
  aluno: {
    label: "Aluno",
    description: "Cadastro para jovens que entram na trilha formativa ECOTUCA."
  },
  professor: {
    label: "Professor",
    description: "Cadastro para educadores, facilitadores e parceiros pedagogicos."
  },
  guia: {
    label: "Guia",
    description: "Cadastro para guias territoriais, condutores e especialistas locais."
  },
  turista: {
    label: "Turista",
    description: "Cadastro para visitantes interessados em roteiros responsaveis."
  }
};

const simpleFields = {
  guia: [
    "Nome completo",
    "E-mail",
    "Telefone",
    "Mini bio territorial",
    "Especialidades",
    "Idiomas",
    "Certificados",
    "Disponibilidade"
  ],
  turista: [
    "Nome completo",
    "E-mail",
    "Telefone",
    "Cidade ou pais de origem",
    "Roteiro de interesse",
    "Data desejada",
    "Quantidade de pessoas",
    "Permissao para receber contato"
  ]
};

export async function generateMetadata({ params }: { params: Promise<{ role: string }> }): Promise<Metadata> {
  const { role } = await params;
  const roleData = roles[role as keyof typeof roles];
  return {
    title: roleData ? `Cadastro ${roleData.label} | ECOTUCA` : "Cadastro | ECOTUCA",
    description: roleData?.description ?? "Cadastro segmentado ECOTUCA."
  };
}

function GuideTouristForm({ role }: { role: "guia" | "turista" }) {
  const guide = role === "guia";
  const fields = simpleFields[role];

  return (
    <div className="desktop-form-shell">
      <div>
        <div className="premium-page-header p-5 sm:p-8">
          <Badge tone={guide ? "mint" : "orange"}>Cadastro {guide ? "de guia" : "de turista"}</Badge>
          <h1 className="brand-display mt-5 text-5xl sm:text-6xl">{guide ? "Guia territorial" : "Visitante responsavel"}</h1>
          <p className="mt-4 max-w-3xl text-base font-bold text-brand-brown/72 dark:text-brand-cream/74">
            {guide
              ? "Organize especialidades, idiomas, disponibilidade e narrativa territorial para entrar no ecossistema Perifa Ecotour."
              : "Informe preferencia de roteiro, grupo e contato para aproximar a experiencia de visita das regras do territorio."}
          </p>
        </div>
        <div className="mt-6 brand-card p-5">
          <div className="grid gap-4 md:grid-cols-2">
            {fields.map((field, index) => (
              <label key={field} className={index === 3 || field.includes("Permissao") ? "md:col-span-2" : undefined}>
                <span className="text-sm font-black">{field}</span>
                {index === 3 || field.includes("Permissao") ? (
                  <textarea className="mt-2 min-h-24 w-full rounded-lg border border-brand-brown/15 bg-white px-4 py-3 text-sm font-bold outline-none focus:border-brand-mint dark:border-brand-yellow/20 dark:bg-white/10" placeholder={field} />
                ) : (
                  <input className="mt-2 min-h-12 w-full rounded-lg border border-brand-brown/15 bg-white px-4 py-3 text-sm font-bold outline-none focus:border-brand-mint dark:border-brand-yellow/20 dark:bg-white/10" placeholder={field} />
                )}
              </label>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <EcoButton variant={guide ? "mint" : "coral"}>
              <Send size={17} />
              Registrar interesse
            </EcoButton>
            <Link href="/login"><EcoButton variant="outline">Ja tenho acesso</EcoButton></Link>
          </div>
        </div>
      </div>
      <aside className="desktop-form-aside space-y-4">
        <section className="premium-context-panel p-5">
          {guide ? <MapPinned size={28} className="text-brand-mint" /> : <CalendarDays size={28} className="text-brand-orange" />}
          <h2 className="brand-display mt-3 text-3xl">{guide ? "Perfil publico" : "Agenda de visita"}</h2>
          <p className="mt-2 text-sm font-bold text-brand-brown/70 dark:text-brand-cream/70">
            {guide
              ? "A versao final vai conectar certificados, agenda e roteiros aprovados pela coordenacao."
              : "O interesse de visita vira uma solicitacao organizada para retorno da equipe."}
          </p>
        </section>
        <section className="premium-context-panel p-5">
          <div className="flex gap-3">
            <Languages size={24} className="text-brand-blue" />
            <UserCheck size={24} className="text-brand-coral" />
          </div>
          <h2 className="brand-display mt-3 text-3xl">Cuidado territorial</h2>
          <p className="mt-2 text-sm font-bold text-brand-brown/70 dark:text-brand-cream/70">
            Roteiros, imagens e visitas devem respeitar moradores, memoria local, seguranca comunitaria e combinados do projeto.
          </p>
        </section>
      </aside>
    </div>
  );
}

export default async function RegisterRolePage({ params }: { params: Promise<{ role: string }> }) {
  const { role } = await params;
  if (!(role in roles)) notFound();

  return (
    <PublicShell>
      <section className="mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:py-12">
        {role === "aluno" ? <StudentSignupFlow /> : null}
        {role === "professor" ? <TeacherSignupFlow /> : null}
        {role === "guia" || role === "turista" ? <GuideTouristForm role={role} /> : null}
        <div className="mt-8">
          <EthicalNotice>
            A confirmacao visual deste cadastro nao cria usuario real. A proxima etapa e conectar Auth, RLS e aprovacao quando o banco for autorizado.
          </EthicalNotice>
        </div>
        <div className="mt-6">
          <ImpactBand title="Precisa mostrar o fluxo completo?" description="A central de apresentacao organiza o caminho de cadastro, login, areas internas, roteiro e painel admin." href="/demo" action="Abrir demo" />
        </div>
      </section>
    </PublicShell>
  );
}
