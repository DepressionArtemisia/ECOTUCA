import type { Metadata } from "next";
import { FaqAccordion } from "@/components/content/faq-accordion";
import { PublicShell } from "@/components/layout/public-shell";
import { RichPageHeader } from "@/components/layout/rich-page-header";

export const metadata: Metadata = {
  title: "FAQ | ECOTUCA",
  description: "Perguntas frequentes sobre cadastros, trilhas, roteiros, aprovacao e uso da plataforma ECOTUCA."
};

const items = [
  { question: "Quem pode se cadastrar como aluno?", answer: "Jovens interessados em educacao ambiental, tecnologia, territorio e turismo comunitario. A liberacao final depende da coordenacao." },
  { question: "O cadastro libera acesso imediatamente?", answer: "Nao. Primeiro ele entra em analise. Depois da aprovacao, a coordenacao libera o acesso do aluno ou professor." },
  { question: "A plataforma tambem fala de territorio?", answer: "Sim. O ensino conecta ecoturismo, Complexo do Alemao, Agenda 2030, tecnologia, comunicacao e geracao de renda." },
  { question: "Como as imagens sao creditadas?", answer: "A pagina de creditos lista fontes, licencas e pendencias. O ideal e substituir por acervo oficial quando disponivel." },
  { question: "Como o professor publica material?", answer: "O painel pedagogico organiza aulas, materiais, atividades, turmas e feedbacks com curadoria da coordenacao." },
  { question: "O app funciona como PWA?", answer: "A interface foi pensada mobile-first e pode evoluir para instalabilidade, notificacoes e cache offline controlado." }
];

export default function FaqPage() {
  return (
    <PublicShell>
      <section className="mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:py-12">
        <RichPageHeader eyebrow="FAQ" title="Perguntas sobre a plataforma" description="Respostas objetivas para alunos, professores, parceiros e equipe tecnica entenderem o fluxo de ensino." badgeTone="blue" />
      </section>
      <section className="premium-section pt-2">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <FaqAccordion items={items} />
        </div>
      </section>
    </PublicShell>
  );
}
