import type { Metadata } from "next";
import { CreditList } from "@/components/content/credit-list";
import { PublicShell } from "@/components/layout/public-shell";
import { RichPageHeader } from "@/components/layout/rich-page-header";
import { mediaAssets } from "@/lib/mock-data/media-assets";

export const metadata: Metadata = {
  title: "Créditos de imagens | ECOTUCA",
  description: "Créditos, licenças e status das imagens utilizadas no MVP ECOTUCA / Perifa Ecotour."
};

export default function CreditosImagensPage() {
  return (
    <PublicShell>
      <section className="mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:py-12">
        <RichPageHeader eyebrow="Créditos de imagens" title="Transparência visual do MVP" description="Registro de autoria, licença e status para manter a apresentacao responsável e facilitar a troca por acervo oficial." badgeTone="orange" />
      </section>
      <section className="premium-section pt-2">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <CreditList assets={mediaAssets} />
        </div>
      </section>
    </PublicShell>
  );
}
