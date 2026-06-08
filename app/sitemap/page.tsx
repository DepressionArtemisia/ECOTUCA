import type { Metadata } from "next";
import { PublicShell } from "@/components/layout/public-shell";
import { RichPageHeader } from "@/components/layout/rich-page-header";
import { SiteMapSection } from "@/components/navigation/site-map-section";
import { siteMapSections } from "@/lib/navigation/site-map";

export const metadata: Metadata = {
  title: "Mapa do site | ECOTUCA",
  description: "Mapa visual das principais paginas publicas, cadastros, areas internas e paginas de transparencia do MVP ECOTUCA."
};

export default function SiteMapPage() {
  return (
    <PublicShell>
      <section className="mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:py-12">
        <RichPageHeader
          eyebrow="Mapa do site"
          title="Todos os caminhos do MVP em um lugar"
          description="Use esta pagina como guia de apresentacao, QA e navegacao para decisores, equipe tecnica e parceiros."
          badgeTone="mint"
        />
      </section>
      <section className="premium-section pt-2">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="desktop-sitemap-grid">
            {siteMapSections.map((section) => (
              <SiteMapSection key={section.title} section={section} />
            ))}
          </div>
        </div>
      </section>
    </PublicShell>
  );
}
