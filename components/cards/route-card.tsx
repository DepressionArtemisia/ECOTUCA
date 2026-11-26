import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { minutesToLabel } from "@/lib/utils";
import type { TourRoute } from "@/types/domain";

export function RouteCard({ route }: { route: TourRoute }) {
  const validated = route.validationStatus === "validado";

  return (
    <article className="brand-card flex flex-col overflow-hidden">
      <div className="relative aspect-[16/10]">
        <Image src={route.coverUrl} alt={route.coverAlt} fill className="object-cover" sizes="(max-width: 767px) 100vw, (max-width: 1279px) 48vw, 420px" />
      </div>
      <div className="flex flex-1 flex-col items-start p-5">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone={validated ? "mint" : "yellow"}>{validated ? "Validado" : "Em avaliação"}</Badge>
          <Badge>{route.difficulty}</Badge>
        </div>
        <h3 className="text-card-title mt-3">{route.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{route.shortDescription}</p>
        <ul className="mt-4 grid gap-2 text-sm text-[var(--muted)]">
          <li className="flex items-center gap-2"><MapPin size={16} className="shrink-0" aria-hidden="true" />{route.location}</li>
          <li className="flex items-center gap-2"><Clock size={16} aria-hidden="true" />{minutesToLabel(route.durationMinutes)}</li>
        </ul>
        <Link href={`/roteiros/${route.slug}`} className="inline-action mt-auto pt-3 text-sm" aria-label={`Ver roteiro ${route.title}`}>
          Ver roteiro <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
