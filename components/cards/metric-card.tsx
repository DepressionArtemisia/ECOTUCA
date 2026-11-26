import type { Metric } from "@/types/domain";

export function MetricCard({ metric }: { metric: Metric }) {
  return (
    <article className="brand-card min-w-0 p-4 sm:p-5">
      <p className="text-sm font-bold text-[var(--muted)]">{metric.label}</p>
      <p className="brand-display mt-2 text-4xl tabular-nums">{metric.value}</p>
      <p className="mt-2 text-sm text-[var(--muted)]">{metric.detail}</p>
    </article>
  );
}
