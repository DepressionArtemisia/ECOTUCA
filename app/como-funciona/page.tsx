import type { Metadata } from "next";
import Link from "next/link";
import { EcoButton } from "@/components/brand/eco-button";
import { ImpactBand } from "@/components/content/impact-band";
import { ProcessTimeline } from "@/components/content/process-timeline";
import { PublicShell } from "@/components/layout/public-shell";
import { RichPageHeader } from "@/components/layout/rich-page-header";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Como funciona | ECOTUCA",
  description: "Entenda o fluxo da ECOTUCA: cadastro, formacao, aulas, certificacao, roteiros e acompanhamento de impacto."
};

export default function ComoFuncionaPage() {
  return (
    <PublicShell>
      <section className="mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:py-12">
        <RichPageHeader
          eyebrow="Como funciona"
          title="Da inscricao ao certificado"
          description="A ECOTUCA organiza uma jornada de ensino com cadastro, aprovacao, trilhas, aulas, atividades, certificados e acompanhamento pedagogico."
          badgeTone="yellow"
        />
      </section>

      <section className="premium-section pt-2">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <ProcessTimeline
            steps={[
              { title: "Inscricao", description: "Aluno ou professor envia dados essenciais pelo caminho correto." },
              { title: "Aprovacao", description: "A coordenacao valida perfil, turma, termos e necessidade de acesso." },
              { title: "Aprendizagem", description: "Alunos acompanham videoaulas, atividades, materiais e progresso." },
              { title: "Tutoria", description: "Professores organizam turmas, feedbacks, conteudos e evidencias." },
              { title: "Certificacao", description: "A plataforma consolida conclusoes, indicadores e certificados." }
            ]}
          />
        </div>
      </section>

      <section className="premium-section bg-white/45 dark:bg-white/5">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="desktop-feature-wall">
            {[
              ["Aluno", "Acompanha trilhas, videoaulas, certificados e comunidade."],
              ["Professor", "Organiza turmas, materiais e acompanhamento pedagogico."],
              ["Admin", "Visualiza aprovacoes, indicadores, turmas e prestacao de contas."],
              ["Trilhas", "Estrutura aulas por modulos, atividades, materiais e objetivos."],
              ["Certificados", "Organiza conclusoes, evidencias e liberacao de documentos."],
              ["PWA", "Entrega uso mobile-first, instalabilidade e experiencia de app."]
            ].map(([title, text]) => (
              <article key={title} className="brand-card p-5">
                <Badge tone="mint">{title}</Badge>
                <h2 className="brand-display mt-4 text-4xl">{title}</h2>
                <p className="mt-3 text-sm font-bold text-brand-brown/70 dark:text-brand-cream/70">{text}</p>
              </article>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/cadastro"><EcoButton variant="coral">Comecar cadastro</EcoButton></Link>
            <Link href="/entrar"><EcoButton variant="outline">Entrar na plataforma</EcoButton></Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-6">
        <ImpactBand title="Uma plataforma de ensino pronta para crescer" description="A primeira versao de producao prioriza a experiencia educacional: entrada, paineis, trilhas, acompanhamento e gestao." href="/cadastro" action="Ver cadastros" />
      </section>
    </PublicShell>
  );
}
