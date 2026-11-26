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
        tone === "light" && "bg-[var(--background)]",
        tone === "dark" && "bg-brand-brown text-brand-cream",
        tone === "tourism" && "bg-brand-brown text-brand-cream",
        className
      )}
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-brand-yellow" />
      {children}
    </section>
  );
}
