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
        "brand-card brand-card-hover relative min-w-0 overflow-hidden border-l-4 p-4 sm:border-l-8 sm:p-5 dark:bg-brand-dark-soft/90",
        border[tone],
        className
      )}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#FCC224,#E9635D,#2ACCB5,#335595,#FE9440)] opacity-60" />
      {children}
    </div>
  );
}
