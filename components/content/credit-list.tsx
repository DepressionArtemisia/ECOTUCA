import { Badge } from "@/components/ui/badge";
import type { MediaAsset } from "@/types/media";

export function CreditList({ assets }: { assets: MediaAsset[] }) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {assets.map((asset) => (
        <article key={asset.id} className="brand-card p-4 dark:bg-brand-dark-soft/90">
          <div className="flex flex-wrap gap-2">
            <Badge tone={asset.creditRequired ? "orange" : "mint"}>
              {asset.creditRequired ? "credito obrigatorio" : "credito documentado"}
            </Badge>
            <Badge tone="blue">{asset.license}</Badge>
          </div>
          <h2 className="brand-display mt-4 text-3xl">{asset.title}</h2>
          <p className="mt-2 text-sm font-bold text-brand-brown/70 dark:text-brand-cream/70">{asset.alt}</p>
          <dl className="mt-4 grid gap-2 text-sm">
            <div><dt className="font-black">Autor</dt><dd>{asset.author}</dd></div>
            <div><dt className="font-black">Fonte</dt><dd className="break-all">{asset.source}</dd></div>
            <div><dt className="font-black">Uso</dt><dd>{asset.usage}</dd></div>
            <div><dt className="font-black">Local</dt><dd>{asset.location}</dd></div>
          </dl>
        </article>
      ))}
    </div>
  );
}
