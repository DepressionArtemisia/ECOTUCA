import { cn } from "@/lib/utils";

export function BrandPattern({
  className,
  intensity = "soft"
}: {
  className?: string;
  intensity?: "soft" | "medium";
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        intensity === "soft" ? "opacity-45" : "opacity-70",
        className
      )}
    >
      <div className="brand-pattern-soft absolute inset-0" />
      <div className="absolute left-0 top-0 h-full w-2 bg-brand-yellow" />
      <div className="absolute bottom-0 right-0 h-2 w-2/3 bg-brand-mint" />
      <div className="absolute right-8 top-8 h-20 w-20 rounded-lg border-4 border-brand-coral/45" />
      <div className="absolute bottom-10 left-10 h-16 w-36 rounded-lg border-4 border-brand-blue/30" />
    </div>
  );
}
