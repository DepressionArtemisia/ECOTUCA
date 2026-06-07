import { cn } from "@/lib/utils";

export function BrandGradient({
  children,
  className,
  tone = "light"
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "light" | "dark" | "tourism";
}) {
  return (
    <section
      className={cn(
        "relative overflow-hidden",
        tone === "light" && "bg-brand-radial dark:bg-brand-dark",
        tone === "dark" && "brand-gradient-dark text-brand-cream",
        tone === "tourism" && "bg-gradient-tourism text-brand-cream",
        className
      )}
    >
      <div className="absolute inset-x-0 top-0 h-3 bg-[linear-gradient(90deg,#FCC224,#E9635D,#2ACCB5,#335595,#FE9440)]" />
      {children}
    </section>
  );
}
