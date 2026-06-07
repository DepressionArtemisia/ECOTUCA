import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Languages, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Guide } from "@/types/domain";

export function GuideCard({ guide }: { guide: Guide }) {
  return (
    <article className="rounded-lg border border-brand-brown/10 bg-white p-5 shadow-brand dark:border-brand-yellow/15 dark:bg-white/10">
      <div className="flex items-center gap-4">
        <Image src={guide.avatar} alt="" width={64} height={64} className="h-16 w-16 rounded-lg object-cover" />
        <div>
          <h3 className="text-xl font-black">{guide.name}</h3>
          <p className="inline-flex items-center gap-1 text-sm font-black text-brand-orange">
            <Star size={15} fill="currentColor" />
            {guide.rating.toFixed(1)}
          </p>
        </div>
      </div>
      <p className="mt-4 text-sm text-brand-brown/70 dark:text-brand-cream/75">{guide.bio}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {guide.specialties.slice(0, 3).map((item) => (
          <Badge key={item} tone="blue">{item}</Badge>
        ))}
      </div>
      <p className="mt-4 inline-flex items-center gap-2 text-sm font-black">
        <Languages size={16} />
        {guide.languages.join(", ")}
      </p>
      <Link href={`/guias/${guide.id}`} className="mt-5 inline-flex items-center gap-2 text-sm font-black text-brand-blue dark:text-brand-mint">
        Ver perfil
        <ArrowRight size={16} />
      </Link>
    </article>
  );
}
