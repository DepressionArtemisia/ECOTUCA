import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { EcoButton } from "@/components/brand/eco-button";

export function ImpactBand({
  title,
  description,
  href,
  action
}: {
  title: string;
  description: string;
  href: string;
  action: string;
}) {
  return (
    <section className="premium-cta-band">
      <div>
        <p className="text-sm font-black uppercase text-brand-mint">Proximo passo</p>
        <h2 className="brand-display mt-2 text-4xl text-brand-yellow sm:text-5xl">{title}</h2>
        <p className="mt-3 max-w-3xl text-sm font-bold text-brand-cream/78 sm:text-base">{description}</p>
      </div>
      <Link href={href}>
        <EcoButton variant="mint" size="lg">
          {action}
          <ArrowRight size={18} />
        </EcoButton>
      </Link>
    </section>
  );
}
