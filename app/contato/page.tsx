import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MapPinned, MessageSquare, Phone } from "lucide-react";
import { EcoButton } from "@/components/brand/eco-button";
import { PublicShell } from "@/components/layout/public-shell";
import { RichPageHeader } from "@/components/layout/rich-page-header";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Contato | ECOTUCA",
  description: "Canais de contato para parceria, escolas, imprensa, educacao ambiental e continuidade da plataforma ECOTUCA."
};

export default function ContatoPage() {
  return (
    <PublicShell>
      <section className="mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:py-12">
        <RichPageHeader eyebrow="Contato" title="Vamos organizar a proxima etapa" description="Pagina institucional preparada para centralizar interesse de alunos, professores, parceiros, escolas, comunidade e equipe tecnica." badgeTone="coral" />
      </section>
      <section className="premium-section pt-2">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="desktop-two-column-flow">
            <div className="brand-card p-5 sm:p-6">
              <Badge tone="yellow">Formulario institucional</Badge>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {["Nome", "E-mail", "Organizacao", "Assunto"].map((field) => (
                  <label key={field}>
                    <span className="text-sm font-black">{field}</span>
                    <input className="mt-2 min-h-12 w-full rounded-lg border border-brand-brown/15 bg-white px-4 py-3 text-sm font-bold outline-none focus:border-brand-mint dark:border-brand-yellow/20 dark:bg-white/10" placeholder={field} />
                  </label>
                ))}
                <label className="md:col-span-2">
                  <span className="text-sm font-black">Mensagem</span>
                  <textarea className="mt-2 min-h-32 w-full rounded-lg border border-brand-brown/15 bg-white px-4 py-3 text-sm font-bold outline-none focus:border-brand-mint dark:border-brand-yellow/20 dark:bg-white/10" placeholder="Conte rapidamente como voce quer se conectar ao projeto." />
                </label>
              </div>
              <div className="mt-6">
                <EcoButton variant="coral">Preparar envio</EcoButton>
              </div>
            </div>
            <aside className="desktop-sticky-aside space-y-4">
              {[
                { icon: Mail, title: "Parcerias", text: "Escolas, coletivos, universidades, editais e empresas." },
                { icon: MapPinned, title: "Territorio", text: "Demandas ligadas ao Complexo do Alemao e roteiros locais." },
                { icon: MessageSquare, title: "Imprensa", text: "Pedidos de material institucional, agenda e conversa com a equipe." },
                { icon: Phone, title: "Ensino", text: "Interesse em turmas, trilhas, certificacao e acompanhamento." }
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="premium-context-panel p-5">
                    <Icon size={24} className="text-brand-mint" />
                    <h2 className="brand-display mt-3 text-3xl">{item.title}</h2>
                    <p className="mt-2 text-sm font-bold text-brand-brown/70 dark:text-brand-cream/70">{item.text}</p>
                  </div>
                );
              })}
              <Link href="/cadastro"><EcoButton variant="outline">Comecar cadastro</EcoButton></Link>
            </aside>
          </div>
        </div>
      </section>
    </PublicShell>
  );
}
