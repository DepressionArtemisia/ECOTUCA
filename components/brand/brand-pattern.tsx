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
    </div>
  );
}
