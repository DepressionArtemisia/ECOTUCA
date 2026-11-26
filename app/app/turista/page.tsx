import Image from "next/image";
import { AppShell } from "@/components/layout/app-shell";
import { OfficialLogo } from "@/components/brand/official-logo";
import { RouteCard } from "@/components/cards/route-card";
import { PerifaCard } from "@/components/brand/perifa-card";
import { Badge } from "@/components/ui/badge";
import { tourRoutes } from "@/lib/mock-data/ecotuca";

export default function TouristPage() {
  return (
    <AppShell title="Área do turista" roleContext="tourist">
      <section className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-lg bg-brand-brown p-6 text-brand-cream shadow-glow">
          <Image
            src="/media/territory/penha/igreja-da-penha-wilfredor-cc0.jpg"
            alt="Igreja da Penha como referência visual da experiência turística na Zona Norte"
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
            Escolha experiências territoriais com guias formados, narrativas locais e orientações de preparo confirmadas pela equipe.
          </p>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {["Solicitações recentes", "Orientações de preparo", "Próximos passos"].map((item) => (
            <PerifaCard key={item} tone="orange">
              <h2 className="brand-display text-3xl">{item}</h2>
              <p className="mt-2 text-sm font-bold text-brand-brown/75 dark:text-brand-cream/75">
                Agenda, guia, ponto de encontro e cuidados são confirmados antes da visita.
              </p>
            </PerifaCard>
          ))}
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-4">
          {[
            ["Interesse", "recebido", "aguardando retorno"],
            ["Grupo", "4 pessoas", "perfil familiar"],
            ["Preparo", "pendente", "orientações antes da visita"],
            ["Conduta", "confirmar", "imagem e respeito local"]
          ].map(([item, value, text]) => (
            <PerifaCard key={item} tone="mint">
              <p className="text-sm font-black uppercase text-brand-blue">{item}</p>
              <p className="brand-display mt-2 text-3xl">{value}</p>
              <p className="mt-1 text-xs font-bold text-brand-brown/70 dark:text-brand-cream/70">{text}</p>
            </PerifaCard>
          ))}
        </div>
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {[
            ["Antes da visita", "Leia orientações, combine horário e entenda a proposta comunitaria."],
            ["Durante o roteiro", "Siga o guia, respeite moradores, imagens e áreas sensíveis."],
            ["Depois", "Registre retorno, avalie a experiência e apoie a continuidade do projeto."]
          ].map(([item, text]) => (
            <PerifaCard key={item} tone="yellow">
              <h2 className="brand-display text-3xl">{item}</h2>
              <p className="mt-2 text-sm font-bold text-brand-brown/75 dark:text-brand-cream/75">{text}</p>
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
