import type { Metadata } from "next";
import { PublicShell } from "@/components/layout/public-shell";
import { BrandPattern } from "@/components/brand/brand-pattern";
import { PhoneMockup } from "@/components/mobile/phone-mockup";
import { PerifaCard } from "@/components/brand/perifa-card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Demo mobile | ECOTUCA PWA",
  description: "Mockup navegavel mobile-first da experiencia PWA ECOTUCA / Perifa Ecotour."
};

export default function DemoMobilePage() {
  return (
    <PublicShell>
      <section className="brand-surface relative overflow-hidden">
        <BrandPattern intensity="soft" />
        <div className="relative mx-auto max-w-7xl px-5 py-10 sm:px-6">
          <div className="mb-8 max-w-3xl">
            <Badge tone="mint">PWA mobile-first</Badge>
            <h1 className="brand-display mt-4 text-5xl">App com cara de uso real</h1>
            <p className="mt-3 text-sm font-bold text-brand-brown/70 dark:text-brand-cream/70">
              A demo mostra como aluno, roteiro, guia e solicitacao aparecem em uma experiencia compacta, colorida e conectada ao territorio.
            </p>
          </div>
          <PhoneMockup />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              ["Aluno", "Progresso, trilhas e continuacao de aula."],
              ["Roteiro", "Card territorial com imagem, tags e chamada clara."],
              ["Turismo", "Detalhe com guia, cuidado local e solicitacao."]
            ].map(([title, text]) => (
              <PerifaCard key={title} tone="mint">
                <h2 className="brand-display text-3xl">{title}</h2>
                <p className="mt-2 text-sm font-bold text-brand-brown/75 dark:text-brand-cream/75">{text}</p>
              </PerifaCard>
            ))}
          </div>
        </div>
      </section>
    </PublicShell>
  );
}
