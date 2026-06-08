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
          title="Da formacao ao roteiro publicado"
          description="A ECOTUCA organiza uma jornada que combina educacao ambiental, tecnologia, cultura local, turismo comunitario e gestao transparente."
          badgeTone="yellow"
        />
      </section>

      <section className="premium-section pt-2">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <ProcessTimeline
            steps={[
              { title: "Cadastro", description: "Aluno, professor, guia ou turista entra pelo perfil correto." },
              { title: "Aprovacao", description: "A coordenacao valida acessos, termos e contexto." },
              { title: "Trilhas", description: "Jovens acompanham aulas, progresso e atividades." },
              { title: "Territorio", description: "Conteudos se conectam com historia, ambiente e economia local." },
              { title: "Roteiros", description: "Experiencias aprovadas viram vitrine de turismo responsavel." }
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
              ["Guia", "Mostra perfil, certificados, agenda e roteiros territoriais."],
              ["Turista", "Escolhe experiencias com contexto, cuidado e retorno da equipe."],
              ["Admin", "Visualiza indicadores, aprovacoes e prestacao de contas."],
              ["PWA", "Demonstra uso mobile-first, offline progressivo e experiencia de app."]
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
            <Link href="/demo"><EcoButton variant="outline">Ver apresentacao</EcoButton></Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-6">
        <ImpactBand title="O produto ja esta navegavel para reuniao" description="As telas principais conectam storytelling, formacao, rotas, mobile e administracao em uma narrativa unica." href="/sitemap" action="Abrir mapa" />
      </section>
    </PublicShell>
  );
}
