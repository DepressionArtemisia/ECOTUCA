import { cn } from "@/lib/utils";

export function Progress({
  value,
  className,
  tone = "mint"
}: {
  value: number;
  className?: string;
  tone?: "yellow" | "coral" | "blue" | "orange" | "mint";
}) {
  const color = {
    yellow: "bg-brand-yellow",
    coral: "bg-brand-coral",
    blue: "bg-brand-blue",
    orange: "bg-brand-orange",
    mint: "bg-brand-mint"
  }[tone];

  return (
    <div className={cn("h-3 w-full overflow-hidden rounded-lg bg-brand-brown/10 dark:bg-white/10", className)}>
      <div className={cn("h-full rounded-lg transition-all", color)} style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
    </div>
  );
}
