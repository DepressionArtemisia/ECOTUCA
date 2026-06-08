import Image from "next/image";
import { AppShell } from "@/components/layout/app-shell";
import { OfficialLogo } from "@/components/brand/official-logo";
import { RouteCard } from "@/components/cards/route-card";
import { PerifaCard } from "@/components/brand/perifa-card";
import { Badge } from "@/components/ui/badge";
import { tourRoutes } from "@/lib/mock-data/ecotuca";

export default function TouristPage() {
  return (
    <AppShell title="Area do turista">
      <section className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-lg bg-brand-brown p-6 text-brand-cream shadow-glow">
          <Image
            src="/media/territory/penha/igreja-da-penha-wilfredor-cc0.jpg"
            alt="Igreja da Penha como referencia visual da experiencia turistica na Zona Norte"
            fill
            className="object-cover opacity-20"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-brown via-brand-brown/90 to-brand-coral/45" />
          <div className="relative">
            <OfficialLogo brand="perifa" variant="horizontal" tone="negative" size="md" />
          </div>
          <Badge tone="yellow" className="relative mt-5">Visitante respeitoso</Badge>
          <h1 className="brand-display relative mt-5 text-5xl text-brand-yellow">Roteiros favoritos</h1>
          <p className="relative mt-3 max-w-2xl text-brand-cream/80">
            Escolha experiencias territoriais com guias formados, narrativas locais e orientacoes de preparo confirmadas pela equipe.
          </p>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {["Solicitacoes recentes", "Orientacoes de preparo", "Proximos passos"].map((item) => (
            <PerifaCard key={item} tone="orange">
              <h2 className="brand-display text-3xl">{item}</h2>
              <p className="mt-2 text-sm font-bold text-brand-brown/75 dark:text-brand-cream/75">
                Agenda, guia, ponto de encontro e cuidados sao confirmados antes da visita.
              </p>
            </PerifaCard>
          ))}
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {tourRoutes.slice(0, 3).map((route) => <RouteCard key={route.slug} route={route} />)}
        </div>
      </section>
    </AppShell>
  );
}
