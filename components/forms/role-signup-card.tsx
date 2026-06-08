import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PerifaCard } from "@/components/brand/perifa-card";
import { Badge } from "@/components/ui/badge";

type RoleTone = "yellow" | "coral" | "blue" | "orange" | "mint";

export function RoleSignupCard({
  label,
  href,
  tone,
  description,
  bullets
}: {
  label: string;
  href: string;
  tone: RoleTone;
  description: string;
  bullets: string[];
}) {
  return (
    <Link href={href} className="focus-ring-brand block rounded-lg">
      <PerifaCard tone={tone} className="h-full">
        <div className="flex items-start justify-between gap-3">
          <div>
            <Badge tone={tone}>{label}</Badge>
            <h2 className="brand-display mt-4 text-4xl">{label}</h2>
          </div>
          <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-brown text-brand-yellow dark:bg-brand-yellow dark:text-brand-brown">
            <ArrowRight size={18} />
          </span>
        </div>
        <p className="mt-4 text-sm font-bold text-brand-brown/70 dark:text-brand-cream/70">{description}</p>
        <ul className="mt-5 space-y-2 text-sm">
          {bullets.map((bullet) => (
            <li key={bullet} className="flex gap-2">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand-mint" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </PerifaCard>
    </Link>
  );
}
