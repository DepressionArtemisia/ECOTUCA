import type { Metadata } from "next";
import Link from "next/link";
import { Leaf, MapPinned, Users } from "lucide-react";
import { PublicShell } from "@/components/layout/public-shell";
import { RichPageHeader } from "@/components/layout/rich-page-header";
import { buttonVariants } from "@/components/ui/button";
import { getMediaAsset } from "@/lib/mock-data/media-assets";

export const metadata: Metadata = {
  title: "O projeto | ECOTUCA e Perifa Ecotour",
  description: "Conheça a Escola de Ecoturismo do Complexo do Alemão e a iniciativa de turismo comunitário que deu origem à ECOTUCA."
};

const territory = getMediaAsset("visao-do-complexo");

const pillars = [
  { icon: Users, title: "Formação e trabalho", body: "O curso prepara jovens para planejar roteiros, conduzir grupos e reconhecer possibilidades de trabalho e renda no turismo comunitário." },
  { icon: Leaf, title: "Cuidado com o ambiente", body: "As trilhas aproximam biodiversidade urbana, educação ambiental e Agenda 2030 das situações que os alunos encontram no cotidiano." },
  { icon: MapPinned, title: "Memória e narrativa local", body: "Os moradores compartilham suas referências e suas histórias. Os roteiros são pensados com cuidado, respeito à imagem e validação do território." }
];

export default function AboutPage() {
  return (
    <PublicShell>
      <div className="site-container space-y-5 py-9 sm:py-14">
        <RichPageHeader eyebrow="O projeto" title="A escola nasce no território" description="A ECOTUCA é a escola da Perifa Ecotour no Complexo do Alemão. A formação reúne turismo comunitário e educação ambiental para que jovens possam contar a história do lugar onde vivem e atuar como guias locais." image={territory.src} imageAlt={territory.alt} />
        <div className="grid gap-4 md:grid-cols-3">
          {pillars.map(({ icon: Icon, title, body }) => (
            <section className="brand-card p-5 sm:p-7" key={title}>
              <span className="workspace-icon"><Icon size={22} aria-hidden="true" /></span>
              <h2 className="text-card-title mt-4">{title}</h2>
              <p className="mt-2 leading-relaxed text-[var(--muted)]">{body}</p>
            </section>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          <Link className={buttonVariants()} href="/como-funciona">Conhecer a formação</Link>
          <Link className={buttonVariants({ variant: "outline" })} href="/roteiros">Explorar os roteiros</Link>
        </div>
      </div>
    </PublicShell>
  );
}
