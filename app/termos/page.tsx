import type { Metadata } from "next";
import { PublicShell } from "@/components/layout/public-shell";
import { RichPageHeader } from "@/components/layout/rich-page-header";

export const metadata: Metadata = { title: "Termos de uso | ECOTUCA" };
const rules = [
  "Use seus próprios dados na inscrição. A coordenação avalia o pedido antes de liberar o acesso.",
  "Mantenha sua senha em segurança e saia da conta ao terminar de usar um aparelho compartilhado.",
  "Respeite alunos, professores e moradores. Compartilhe fotos, vídeos e materiais somente quando houver autorização.",
  "Siga as orientações da turma para entregas, avaliações e certificação. Confirme com a equipe as condições de cada visita."
];

export default function TermosPage() {
  return (
    <PublicShell>
      <div className="site-container space-y-5 py-9 sm:py-14">
        <RichPageHeader eyebrow="Informações" title="Termos de uso" description="Combinados para participar da formação e usar a plataforma." />
        <section className="brand-card max-w-4xl p-5 sm:p-7" aria-label="Combinados da plataforma">
          <ol className="list-decimal space-y-3 ps-6 leading-relaxed">
            {rules.map((text) => <li key={text}>{text}</li>)}
          </ol>
        </section>
        <p className="text-sm text-[var(--muted)]">Orientações preliminares. A versão completa dos termos está em revisão pela coordenação.</p>
      </div>
    </PublicShell>
  );
}
