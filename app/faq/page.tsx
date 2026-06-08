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
  { question: "O cadastro cria acesso real imediatamente?", answer: "Nesta rodada, o fluxo apresenta preenchimento, rascunho e confirmacao visual. Usuarios reais entram depois da integracao autorizada com Supabase Auth." },
  { question: "Os roteiros ja podem ser comercializados?", answer: "A vitrine demonstra a experiencia e a narrativa. Precificacao, agenda e operacao final precisam de validacao local." },
  { question: "Como as imagens sao creditadas?", answer: "A pagina de creditos lista fontes, licencas e pendencias. O ideal e substituir por acervo oficial quando disponivel." },
  { question: "Como o professor publica material?", answer: "O painel pedagogico mostra o fluxo de upload e curadoria. O bucket real deve ser ativado depois da validacao tecnica." },
  { question: "O app funciona como PWA?", answer: "A estrutura ja tem manifest, layout mobile-first e moldura navegavel; proximos passos incluem instalabilidade e cache mais robusto." }
];

export default function FaqPage() {
  return (
    <PublicShell>
      <section className="mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:py-12">
        <RichPageHeader eyebrow="FAQ" title="Perguntas antes da reuniao" description="Respostas objetivas para alinhar escopo, demonstracao, identidade visual e proximas decisoes." badgeTone="blue" />
      </section>
      <section className="premium-section pt-2">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <FaqAccordion items={items} />
        </div>
      </section>
    </PublicShell>
  );
}
