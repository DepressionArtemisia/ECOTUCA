import { Badge } from "@/components/ui/badge";
import type { Metric } from "@/types/domain";

export function MetricCard({ metric }: { metric: Metric }) {
  return (
    <article className="brand-card brand-card-hover p-5 dark:bg-brand-dark-soft/90">
      <Badge tone={metric.tone}>{metric.label}</Badge>
      <p className="brand-display mt-4 text-4xl text-brand-brown dark:text-brand-yellow">{metric.value}</p>
      <p className="mt-2 text-sm font-bold text-brand-brown/65 dark:text-brand-cream/70">{metric.detail}</p>
    </article>
  );
}
