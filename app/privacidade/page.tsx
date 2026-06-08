import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { EthicalNotice } from "@/components/content/ethical-notice";
import { PublicShell } from "@/components/layout/public-shell";
import { RichPageHeader } from "@/components/layout/rich-page-header";

export const metadata: Metadata = {
  title: "Privacidade | ECOTUCA",
  description: "Politica preliminar de privacidade para o MVP ECOTUCA, com foco em LGPD, consentimento e minimizacao de dados."
};

const privacyItems = [
  ["Minimizacao", "Coletar apenas dados necessarios para cadastro, contato, aprovacao e acompanhamento."],
  ["Consentimento", "Separar aceite de dados, contato, imagem e publicacao de materiais."],
  ["Seguranca", "Nao expor chaves sensiveis no cliente e manter service role fora do frontend."],
  ["Aprovacao", "Liberar perfis sensiveis somente depois de validacao da coordenacao."],
  ["Proxima fase", "Conectar Supabase Auth, RLS e politicas de storage depois da revisao aprovada."]
];

export default function PrivacidadePage() {
  return (
    <PublicShell>
      <section className="mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:py-12">
        <RichPageHeader eyebrow="Privacidade" title="Dados com cuidado e finalidade clara" description="Diretrizes preliminares para apresentar o MVP sem confundir prototipo navegavel com operacao definitiva." badgeTone="mint" />
      </section>
      <section className="premium-section pt-2">
        <div className="mx-auto max-w-5xl px-5 sm:px-6">
          <div className="desktop-editorial-grid">
            {privacyItems.map(([title, text]) => (
              <article key={title} className="brand-card p-5">
                <ShieldCheck className="text-brand-mint" size={26} />
                <h2 className="brand-display mt-3 text-3xl">{title}</h2>
                <p className="mt-2 text-sm font-bold text-brand-brown/70 dark:text-brand-cream/70">{text}</p>
              </article>
            ))}
          </div>
          <div className="mt-6">
            <EthicalNotice>
              A versao final deve incluir base legal, direitos do titular, encarregado, retencao, revogacao e canais formais.
            </EthicalNotice>
          </div>
        </div>
      </section>
    </PublicShell>
  );
}
