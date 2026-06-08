import type { Metadata } from "next";
import { EthicalNotice } from "@/components/content/ethical-notice";
import { PublicShell } from "@/components/layout/public-shell";
import { RichPageHeader } from "@/components/layout/rich-page-header";

export const metadata: Metadata = {
  title: "Termos de uso | ECOTUCA",
  description: "Termos de uso preliminares para apresentacao do MVP ECOTUCA."
};

const terms = [
  "O MVP apresenta uma experiencia navegavel para validacao de produto, identidade visual e jornada de usuarios.",
  "Cadastros exibidos nesta rodada nao criam usuarios reais automaticamente.",
  "Roteiros, precos e agendas dependem de validacao operacional, comunitaria e juridica antes de uso publico definitivo.",
  "Conteudos pedagogicos e materiais enviados devem passar por curadoria da coordenacao.",
  "A marca ECOTUCA / Perifa Ecotour deve seguir o manual de identidade visual salvo em docs/brand."
];

export default function TermosPage() {
  return (
    <PublicShell>
      <section className="mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:py-12">
        <RichPageHeader eyebrow="Termos" title="Uso responsavel do MVP" description="Texto preliminar em linguagem clara para orientar apresentacao, navegacao e proximas decisoes." badgeTone="blue" />
      </section>
      <section className="premium-section pt-2">
        <div className="mx-auto max-w-4xl px-5 sm:px-6">
          <div className="brand-card p-5 sm:p-6">
            <ol className="space-y-4 text-sm font-bold text-brand-brown/75 dark:text-brand-cream/75">
              {terms.map((term, index) => (
                <li key={term} className="flex gap-3">
                  <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-yellow text-xs font-black text-brand-brown">{index + 1}</span>
                  <span>{term}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="mt-6">
            <EthicalNotice>
              Este texto e base de apresentacao. A versao juridica final deve ser revisada antes de operacao publica.
            </EthicalNotice>
          </div>
        </div>
      </section>
    </PublicShell>
  );
}
