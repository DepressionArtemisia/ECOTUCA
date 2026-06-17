import type { Metadata } from "next";
import { PublicShell } from "@/components/layout/public-shell";
import { RichPageHeader } from "@/components/layout/rich-page-header";
import { SiteMapExplorer } from "@/components/navigation/site-map-explorer";

export const metadata: Metadata = {
  title: "Mapa do site | ECOTUCA",
  description: "Mapa visual das principais paginas publicas, cadastros, areas internas e paginas de transparencia da plataforma ECOTUCA."
};

export default function SiteMapPage() {
  return (
    <PublicShell>
      <section className="mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:py-12">
        <RichPageHeader
          eyebrow="Mapa do site"
          title="Todos os caminhos da plataforma em um lugar"
          description="Use esta pagina como guia de navegacao para alunos, professores, coordenacao, equipe tecnica e parceiros."
          badgeTone="mint"
        />
      </section>
      <section className="premium-section pt-2">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <SiteMapExplorer />
        </div>
      </section>
    </PublicShell>
  );
}
