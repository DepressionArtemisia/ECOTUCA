import Image from "next/image";
import { AppShell } from "@/components/layout/app-shell";
import { OfficialLogo } from "@/components/brand/official-logo";
import { PerifaCard } from "@/components/brand/perifa-card";
import { GuideCard } from "@/components/cards/guide-card";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { guides } from "@/lib/mock-data/ecotuca";

export default function GuideDashboardPage() {
  return (
    <AppShell title="Área do guia" roleContext="guide">
      <section className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-lg bg-brand-brown p-6 text-brand-cream shadow-glow">
          <Image
            src="/media/territory/complexo-alemao/visao-do-complexo-thirson-cc-by-sa-4.jpg"
            alt="Vista do Complexo do Alemão associada ao perfil de guia local"
            fill
            className="object-cover opacity-[.22]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-brown via-brand-brown/90 to-brand-orange/45" />
          <div className="relative">
            <OfficialLogo brand="perifa" variant="horizontal" tone="negative" size="md" />
          </div>
          <Badge tone="orange" className="relative mt-5">Guia protagonista do território</Badge>
          <h1 className="brand-display relative mt-5 text-5xl text-brand-yellow">Agenda e perfil de guia</h1>
          <p className="relative mt-3 max-w-2xl text-brand-cream/80">
            Organize solicitações, roteiros associados e dados que fortalecem a confianca do visitante.
          </p>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <GuideCard guide={guides[0]} />
          <PerifaCard tone="yellow" className="bg-brand-yellow text-brand-brown">
            <h2 className="brand-display text-4xl">Próximas solicitações</h2>
            <p className="mt-3 font-bold">3 interesses recebidos para Serra da Misericórdia e Vivência Perifa Ecotour.</p>
            <Link href="/app/guia/agenda" className={buttonVariants({ variant: "outline", className: "mt-5" })}>Ver agenda</Link>
          </PerifaCard>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-4">
          {[
            ["Perfil", "82%", "Bio, idiomas e contato"],
            ["Agenda", "3", "datas em análise"],
            ["Roteiros", "2", "experiências vinculadas"],
            ["Cuidados", "ok", "imagem e segurança"]
          ].map(([item, value, text]) => (
            <PerifaCard key={item} tone="orange">
              <p className="text-sm font-black uppercase text-[var(--accent-text)]">{item}</p>
              <p className="brand-display mt-2 text-4xl">{value}</p>
              <p className="mt-1 text-xs font-bold text-brand-brown/70 dark:text-brand-cream/70">{text}</p>
            </PerifaCard>
          ))}
        </div>
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {[
            ["Briefing do roteiro", "Ponto de encontro, duração, narrativa e limites de circulacao."],
            ["Cuidado comunitario", "Combinados de imagem, respeito aos moradores e segurança local."],
            ["Evidencias", "Fotos autorizadas, relatos, presença e retorno do visitante."]
          ].map(([item, text]) => (
            <PerifaCard key={item} tone="mint">
              <h2 className="brand-display text-3xl">{item}</h2>
              <p className="mt-2 text-sm font-bold text-brand-brown/75 dark:text-brand-cream/75">{text}</p>
            </PerifaCard>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
