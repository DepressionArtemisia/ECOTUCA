import type { Metadata } from "next";
import Link from "next/link";
import { PublicShell } from "@/components/layout/public-shell";
import { RichPageHeader } from "@/components/layout/rich-page-header";
import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = { title: "Como funciona | ECOTUCA", description: "Veja como entrar e participar da formação em ecoturismo da ECOTUCA." };

const steps = [
  { title: "Inscreva-se", description: "Escolha o perfil de aluno ou professor. Preencha as etapas com seu contato e sua disponibilidade e revise as respostas antes de enviar." },
  { title: "Aguarde a análise", description: "A coordenação confere as informações e entra em contato para explicar a próxima etapa. Tenha em mãos o protocolo da inscrição." },
  { title: "Comece a formação", description: "Quando receber acesso, entre para acompanhar as trilhas e realizar as atividades. Professores acompanham as turmas e orientam as entregas." },
  { title: "Conclua as etapas do curso", description: "A coordenação e os professores acompanham a conclusão das atividades e orientam sobre a certificação de cada turma." }
];

export default function ComoFuncionaPage() {
  return (
    <PublicShell>
      <div className="site-container space-y-5 py-9 sm:py-14">
        <RichPageHeader eyebrow="A formação" title="Da inscrição ao certificado" description="A formação aproxima o aprendizado digital das práticas de turismo comunitário e educação ambiental no Complexo do Alemão." />
        <ol className="grid gap-4 md:grid-cols-2">
          {steps.map(({ title, description }, index) => (
            <li key={title} className="brand-card p-5 sm:p-7">
              <span className="workspace-icon font-bold" aria-hidden="true">{index + 1}</span>
              <h2 className="text-card-title mt-3">{title}</h2>
              <p className="mt-2 max-w-[62ch] text-[var(--muted)]">{description}</p>
            </li>
          ))}
        </ol>
        <div className="flex flex-wrap gap-2">
          <Link className={buttonVariants()} href="/cadastro">Escolher meu perfil</Link>
          <Link className={buttonVariants({ variant: "outline" })} href="/faq">Ver perguntas frequentes</Link>
        </div>
      </div>
    </PublicShell>
  );
}
