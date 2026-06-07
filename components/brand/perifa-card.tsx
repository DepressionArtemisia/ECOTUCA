import { cn } from "@/lib/utils";

const border = {
  yellow: "border-brand-yellow",
  coral: "border-brand-coral",
  blue: "border-brand-blue",
  orange: "border-brand-orange",
  mint: "border-brand-mint"
};

export function PerifaCard({
  children,
  tone = "yellow",
  className
}: {
  children: React.ReactNode;
  tone?: keyof typeof border;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative rounded-lg border-l-8 bg-white p-5 shadow-brand dark:bg-white/10",
        border[tone],
        className
      )}
    >
      {children}
    </div>
  );
}
