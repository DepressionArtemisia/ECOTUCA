import { cn } from "@/lib/utils";

export function BrandPattern({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden opacity-50",
        className
      )}
    >
      <div className="brand-pattern absolute inset-0" />
      <div className="absolute left-0 top-0 h-full w-2 bg-brand-yellow" />
      <div className="absolute bottom-0 right-0 h-2 w-2/3 bg-brand-mint" />
    </div>
  );
}
