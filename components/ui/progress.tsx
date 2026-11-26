import { cn } from "@/lib/utils";

export function Progress({
  value,
  className,
  label = "Progresso",
  tone = "mint"
}: {
  value: number;
  className?: string;
  label?: string;
  tone?: "yellow" | "coral" | "blue" | "orange" | "mint";
}) {
  const color = {
    yellow: "bg-brand-yellow",
    coral: "bg-brand-coral",
    blue: "bg-brand-blue",
    orange: "bg-brand-orange",
    mint: "bg-brand-mint"
  }[tone];

  const percent = Math.min(100, Math.max(0, value));
  return (
    <div role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={percent} className={cn("h-2 w-full overflow-hidden rounded-lg bg-brand-brown/10 dark:bg-white/10", className)}>
      <div className={cn("h-full rounded-lg transition-all", color)} style={{ width: `${percent}%` }} />
    </div>
  );
}
