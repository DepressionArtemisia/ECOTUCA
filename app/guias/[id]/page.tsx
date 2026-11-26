import { notFound } from "next/navigation";
import { Award, Languages, Star } from "lucide-react";
import { PublicShell } from "@/components/layout/public-shell";
import { RouteCard } from "@/components/cards/route-card";
import { Badge } from "@/components/ui/badge";
import { guides, tourRoutes } from "@/lib/mock-data/ecotuca";

export default async function GuidePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const guide = guides.find((item) => item.id === id);
  if (!guide) notFound();
  const routes = tourRoutes.filter((route) => route.guideId === guide.id);

  return (
    <PublicShell>
      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-6">
        <Badge tone="blue">Guia ECOTUCA</Badge>
        <h1 className="brand-display mt-5 text-6xl text-brand-brown dark:text-brand-yellow">{guide.name}</h1>
        <p className="mt-4 max-w-3xl text-lg text-brand-brown/75 dark:text-brand-cream/75">{guide.bio}</p>
        <div className="mt-6 flex flex-wrap gap-3 text-sm font-black">
          <Badge tone="yellow"><Star size={14} /> {guide.rating.toFixed(1)}</Badge>
          <Badge tone="mint"><Languages size={14} /> {guide.languages.join(", ")}</Badge>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {guide.certificates.map((cert) => (
            <div key={cert} className="rounded-lg bg-white p-4 shadow-brand dark:bg-white/10">
              <Award className="text-[var(--accent-text)]" />
              <p className="mt-3 font-black">{cert}</p>
            </div>
          ))}
        </div>
        <h2 className="brand-display mt-10 text-5xl">Roteiros associados</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {routes.map((route) => (
            <RouteCard key={route.slug} route={route} />
          ))}
        </div>
      </section>
    </PublicShell>
  );
}
