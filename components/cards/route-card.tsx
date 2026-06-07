import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, MapPin, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { minutesToLabel } from "@/lib/utils";
import { TourRoute } from "@/types/domain";

export function RouteCard({ route }: { route: TourRoute }) {
  return (
    <article className="overflow-hidden rounded-lg border border-brand-brown/10 bg-white shadow-brand dark:border-brand-yellow/15 dark:bg-white/10">
      <div className="relative aspect-[4/3]">
        <Image src={route.coverUrl} alt="" fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
        {route.featured && <Badge tone="yellow" className="absolute left-3 top-3">Destaque</Badge>}
      </div>
      <div className="p-5">
        <div className="flex flex-wrap gap-2">
          {route.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} tone="mint">{tag}</Badge>
          ))}
        </div>
        <h3 className="brand-display mt-4 text-3xl text-brand-brown dark:text-brand-yellow">{route.title}</h3>
        <p className="mt-2 text-sm text-brand-brown/70 dark:text-brand-cream/75">{route.shortDescription}</p>
        <div className="mt-4 grid grid-cols-2 gap-2 text-xs font-black text-brand-brown/75 dark:text-brand-cream/80">
          <span className="inline-flex items-center gap-2"><Clock size={15} />{minutesToLabel(route.durationMinutes)}</span>
          <span className="inline-flex items-center gap-2"><Users size={15} />Ate {route.maxPeople}</span>
          <span className="col-span-2 inline-flex items-center gap-2"><MapPin size={15} />{route.location}</span>
        </div>
        <div className="mt-5 flex items-center justify-between">
          <span className="text-lg font-black">R$ {route.price}</span>
          <Link href={`/roteiros/${route.slug}`} className="inline-flex items-center gap-2 rounded-lg bg-brand-brown px-4 py-2 text-sm font-black text-brand-yellow dark:bg-brand-yellow dark:text-brand-brown">
            Ver
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </article>
  );
}
