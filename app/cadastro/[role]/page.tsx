import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ImpactBand } from "@/components/content/impact-band";
import { EthicalNotice } from "@/components/content/ethical-notice";
import { PublicShell } from "@/components/layout/public-shell";
import { GuideSignupFlow } from "@/features/signup/guide-signup-flow";
import { StudentSignupFlow } from "@/features/signup/student-signup-flow";
import { TeacherSignupFlow } from "@/features/signup/teacher-signup-flow";
import { TouristSignupFlow } from "@/features/signup/tourist-signup-flow";

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

export async function generateMetadata({ params }: { params: Promise<{ role: string }> }): Promise<Metadata> {
  const { role } = await params;
  const roleData = roles[role as keyof typeof roles];
  return {
    title: roleData ? `Cadastro ${roleData.label} | ECOTUCA` : "Cadastro | ECOTUCA",
    description: roleData?.description ?? "Cadastro segmentado ECOTUCA."
  };
}

export default async function RegisterRolePage({ params }: { params: Promise<{ role: string }> }) {
  const { role } = await params;
  if (!(role in roles)) notFound();

  return (
    <PublicShell>
      <section className="mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:py-12">
        {role === "aluno" ? <StudentSignupFlow /> : null}
        {role === "professor" ? <TeacherSignupFlow /> : null}
        {role === "guia" ? <GuideSignupFlow /> : null}
        {role === "turista" ? <TouristSignupFlow /> : null}
        <div className="mt-8">
          <EthicalNotice>
            O cadastro entra em analise da coordenacao. A liberacao de acesso acontece apenas depois da aprovacao do perfil e validacao dos termos.
          </EthicalNotice>
        </div>
        <div className="mt-6">
          <ImpactBand title="Depois do envio, acompanhe sua entrada" description="Aluno e professor acessam a plataforma pelo login quando a coordenacao aprovar o cadastro." href="/entrar" action="Ir para login" />
        </div>
      </section>
    </PublicShell>
  );
}
