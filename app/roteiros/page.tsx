import type { Metadata } from "next";
import { PublicShell } from "@/components/layout/public-shell";
import { RichPageHeader } from "@/components/layout/rich-page-header";
import { RouteBrowser } from "@/features/routes/route-browser";
import { getMediaAsset } from "@/lib/mock-data/media-assets";

export const metadata: Metadata = {
  title: "Roteiros | Perifa Ecotour",
  description: "Conheça propostas de roteiros comunitários na Serra da Misericórdia e no Complexo do Alemão."
};

const territory = getMediaAsset("panorama-zona-norte-penha");

export default function RoutesPage() {
  return (
    <PublicShell>
      <div className="site-container space-y-6 py-9 sm:py-14">
        <RichPageHeader eyebrow="Perifa Ecotour" title="Roteiros pelo território" description="Conheça propostas de percurso pela Serra da Misericórdia e pelo Complexo do Alemão. A realização das visitas depende de validação local e confirmação da equipe." image={territory.src} imageAlt={territory.alt} />
        <RouteBrowser />
      </div>
    </PublicShell>
  );
}
