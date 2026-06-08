import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, HeartHandshake, MapPin, Share2, ShieldCheck, Sparkles, Users } from "lucide-react";
import { PublicShell } from "@/components/layout/public-shell";
import { EcoButton } from "@/components/brand/eco-button";
import { OfficialLogo } from "@/components/brand/official-logo";
import { GuideCard } from "@/components/cards/guide-card";
import { Badge } from "@/components/ui/badge";
import { RouteInterestForm } from "@/features/routes/route-interest-form";
import { getMediaAssets } from "@/lib/mock-data/media-assets";
import { minutesToLabel } from "@/lib/utils";
import { guides, tourRoutes } from "@/lib/mock-data/ecotuca";

export default async function RouteDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const route = tourRoutes.find((item) => item.slug === slug);
  if (!route) notFound();
  const guide = guides.find((item) => item.id === route.guideId) ?? guides[0];
  const media = getMediaAssets(route.mediaAssetIds);

  return (
    <PublicShell>
      <section className="relative min-h-[58vh] overflow-hidden">
        <Image src={route.coverUrl} alt={route.coverAlt} fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(58,26,22,.88),rgba(58,26,22,.48),rgba(254,148,64,.16))]" />
        <div className="relative mx-auto flex min-h-[58vh] max-w-7xl items-end px-5 py-10 sm:px-6">
          <div className="max-w-4xl text-brand-cream">
            <div className="mb-5">
              <OfficialLogo brand="perifa" variant="horizontal" tone="negative" size="md" />
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge tone="yellow">{route.difficulty}</Badge>
              <Badge tone="mint">{route.validationStatus === "validado" ? "validado" : "roteiro demonstrativo"}</Badge>
            </div>
            <h1 className="brand-display mt-4 text-5xl text-brand-yellow sm:text-6xl">{route.title}</h1>
            <p className="mt-2 text-sm font-black uppercase text-brand-mint">{route.subtitle}</p>
            <p className="mt-4 max-w-3xl text-lg font-bold text-brand-cream/90">{route.description}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-10 sm:px-6 lg:grid-cols-[1fr_380px]">
        <div className="space-y-6">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Info icon={<Clock size={18} />} label="Duracao" value={minutesToLabel(route.durationMinutes)} />
            <Info icon={<Users size={18} />} label="Grupo" value={`Ate ${route.maxPeople} pessoas`} />
            <Info icon={<MapPin size={18} />} label="Ponto" value={route.meetingPoint} />
            <Info icon={<ShieldCheck size={18} />} label="Valor demonstrativo" value={`R$ ${route.price}`} />
          </div>
          <div className="brand-card border-l-4 border-brand-orange p-5 dark:bg-brand-dark-soft/90">
            <p className="inline-flex items-center gap-2 text-sm font-black uppercase text-brand-orange">
              <ShieldCheck size={17} />
              Validacao e cuidado
            </p>
            <h2 className="brand-display mt-3 text-4xl">Roteiro sujeito a validacao local</h2>
            <p className="mt-3 text-sm font-bold text-brand-brown/75 dark:text-brand-cream/75">{route.validationNote}</p>
            <p className="mt-3 rounded-lg bg-brand-warm p-3 text-sm font-black text-brand-brown dark:bg-white/10 dark:text-brand-cream">
              {route.finalMeetingPointNote}
            </p>
          </div>
          <div className="brand-card p-5 dark:bg-brand-dark-soft/90">
            <p className="inline-flex items-center gap-2 text-sm font-black uppercase text-brand-coral">
              <HeartHandshake size={17} />
              Por que este roteiro importa
            </p>
            <h2 className="brand-display mt-3 text-4xl">Territorio, aprendizagem e impacto</h2>
            <p className="mt-3 text-sm font-bold text-brand-brown/75 dark:text-brand-cream/75">{route.longDescription}</p>
            <p className="mt-3 text-sm font-black text-brand-brown dark:text-brand-yellow">{route.whyItMatters}</p>
          </div>
          <div className="brand-card p-5 dark:bg-brand-dark-soft/90">
            <h2 className="brand-display text-4xl">Galeria e territorio</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {route.galleryUrls.slice(0, 4).map((image, index) => (
                <div key={`${image}-${index}`} className="relative aspect-[4/3] overflow-hidden rounded-lg">
                  <Image src={image} alt={media[index]?.alt ?? route.coverAlt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs font-bold text-brand-brown/60 dark:text-brand-cream/60">
              Creditos e licencas completos documentados em docs/media.
            </p>
          </div>
          <div className="brand-card p-5 dark:bg-brand-dark-soft/90">
            <h2 className="brand-display text-4xl">O que o visitante vivencia</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {route.visitorExperience.map((item) => (
                <div key={item} className="rounded-lg bg-brand-warm p-3 text-sm font-bold text-brand-brown">{item}</div>
              ))}
            </div>
          </div>
          <div className="brand-card p-5 dark:bg-brand-dark-soft/90">
            <h2 className="brand-display text-4xl">O que esta incluido</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {route.includedItems.map((item) => (
                <div key={item} className="rounded-lg bg-brand-warm p-3 text-sm font-bold text-brand-brown">{item}</div>
              ))}
            </div>
          </div>
          <div className="brand-card p-5 dark:bg-brand-dark-soft/90">
            <h2 className="brand-display text-4xl">Cuidados e preparacao</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {route.recommendations.concat(route.careNotes).map((item) => (
                <li key={item} className="rounded-lg border border-brand-brown/10 p-3 text-sm font-bold">{item}</li>
              ))}
            </ul>
            <p className="mt-4 text-sm font-bold text-brand-brown/75 dark:text-brand-cream/75">{route.safetyNotes}</p>
            <p className="mt-2 text-sm font-bold text-brand-brown/75 dark:text-brand-cream/75">Acessibilidade: {route.accessibility}</p>
          </div>
        </div>

        <aside className="space-y-4">
          <RouteInterestForm routeSlug={route.slug} />
          <EcoButton variant="outline" className="w-full"><Share2 size={16} />Compartilhar roteiro</EcoButton>
          <GuideCard guide={guide} />
          <Link href="/demo-mobile">
            <EcoButton variant="mint" className="w-full"><Sparkles size={16} />Ver no app mobile</EcoButton>
          </Link>
        </aside>
      </section>
    </PublicShell>
  );
}

function Info({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="brand-card p-4 dark:bg-brand-dark-soft/90">
      <p className="flex items-center gap-2 text-xs font-black uppercase text-brand-coral">{icon}{label}</p>
      <p className="mt-2 text-sm font-black">{value}</p>
    </div>
  );
}
