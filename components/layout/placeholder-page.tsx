import Link from "next/link";
import { ArrowRight, Construction } from "lucide-react";
import { PerifaCard } from "@/components/brand/perifa-card";
import { EcoButton } from "@/components/brand/eco-button";

export function PlaceholderPage({
  title,
  description,
  area = "Modulo em construcao"
}: {
  title: string;
  description: string;
  area?: string;
}) {
  return (
    <section className="mx-auto max-w-5xl py-8">
      <PerifaCard tone="mint">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 text-sm font-black uppercase text-brand-coral">
              <Construction size={16} />
              {area}
            </p>
            <h1 className="brand-display mt-3 text-4xl">{title}</h1>
            <p className="mt-3 max-w-2xl text-brand-brown/75 dark:text-brand-cream/75">{description}</p>
          </div>
          <Link href="/app/aluno">
            <EcoButton variant="mint">
              Voltar
              <ArrowRight size={16} />
            </EcoButton>
          </Link>
        </div>
      </PerifaCard>
    </section>
  );
}
