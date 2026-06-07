import { cn } from "@/lib/utils";

export function ImpactRibbon({
  items,
  className
}: {
  items: Array<{ label: string; value: string }>;
  className?: string;
}) {
  return (
    <div className={cn("grid w-full max-w-full gap-2 rounded-lg bg-brand-brown p-2 text-brand-cream shadow-card sm:grid-cols-3", className)}>
      {items.map((item) => (
        <div key={item.label} className="rounded-lg bg-white/10 px-4 py-3">
          <p className="brand-display text-3xl text-brand-yellow">{item.value}</p>
          <p className="text-xs font-black uppercase text-brand-cream/75">{item.label}</p>
        </div>
      ))}
    </div>
  );
}
