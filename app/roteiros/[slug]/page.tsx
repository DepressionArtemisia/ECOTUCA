import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, MapPin, Share2, ShieldCheck, Users } from "lucide-react";
import { PublicShell } from "@/components/layout/public-shell";
import { EcoButton } from "@/components/brand/eco-button";
import { GuideCard } from "@/components/cards/guide-card";
import { Badge } from "@/components/ui/badge";
import { RouteInterestForm } from "@/features/routes/route-interest-form";
import { minutesToLabel } from "@/lib/utils";
import { guides, tourRoutes } from "@/lib/mock-data/ecotuca";

export default async function RouteDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const route = tourRoutes.find((item) => item.slug === slug);
  if (!route) notFound();
  const guide = guides.find((item) => item.id === route.guideId) ?? guides[0];

  return (
    <PublicShell>
      <section className="relative min-h-[58vh] overflow-hidden">
        <Image src={route.coverUrl} alt="" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-brand-brown/65" />
        <div className="relative mx-auto flex min-h-[58vh] max-w-7xl items-end px-5 py-10 sm:px-6">
          <div className="max-w-4xl text-brand-cream">
            <Badge tone="yellow">{route.difficulty}</Badge>
            <h1 className="brand-display mt-4 text-6xl text-brand-yellow">{route.title}</h1>
            <p className="mt-4 max-w-2xl text-lg font-bold text-brand-cream/90">{route.description}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-10 sm:px-6 lg:grid-cols-[1fr_380px]">
        <div className="space-y-6">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Info icon={<Clock size={18} />} label="Duracao" value={minutesToLabel(route.durationMinutes)} />
            <Info icon={<Users size={18} />} label="Grupo" value={`Ate ${route.maxPeople} pessoas`} />
            <Info icon={<MapPin size={18} />} label="Ponto" value={route.meetingPoint} />
            <Info icon={<ShieldCheck size={18} />} label="Valor" value={`R$ ${route.price}`} />
          </div>
          <div className="rounded-lg bg-white p-5 shadow-brand dark:bg-white/10">
            <h2 className="brand-display text-4xl">Galeria e territorio</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {route.galleryUrls.concat(route.coverUrl).slice(0, 3).map((image, index) => (
                <div key={`${image}-${index}`} className="relative aspect-[4/3] overflow-hidden rounded-lg">
                  <Image src={image} alt="" fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-lg bg-white p-5 shadow-brand dark:bg-white/10">
            <h2 className="brand-display text-4xl">O que esta incluido</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {route.includedItems.map((item) => (
                <div key={item} className="rounded-lg bg-brand-warm p-3 text-sm font-bold text-brand-brown">{item}</div>
              ))}
            </div>
          </div>
          <div className="rounded-lg bg-white p-5 shadow-brand dark:bg-white/10">
            <h2 className="brand-display text-4xl">Recomendacoes e seguranca</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {route.recommendations.map((item) => (
                <li key={item} className="rounded-lg border border-brand-brown/10 p-3 text-sm font-bold">{item}</li>
              ))}
            </ul>
            <p className="mt-4 text-sm font-bold text-brand-brown/75 dark:text-brand-cream/75">{route.safetyNotes}</p>
          </div>
        </div>

        <aside className="space-y-4">
          <RouteInterestForm routeSlug={route.slug} />
          <EcoButton variant="outline" className="w-full"><Share2 size={16} />Compartilhar roteiro</EcoButton>
          <GuideCard guide={guide} />
          <Link href="/demo-mobile">
            <EcoButton variant="mint" className="w-full">Ver no app mobile</EcoButton>
          </Link>
        </aside>
      </section>
    </PublicShell>
  );
}

function Info({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-lg bg-white p-4 shadow-brand dark:bg-white/10">
      <p className="flex items-center gap-2 text-xs font-black uppercase text-brand-coral">{icon}{label}</p>
      <p className="mt-2 text-sm font-black">{value}</p>
    </div>
  );
}
