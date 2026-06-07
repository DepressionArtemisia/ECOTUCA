import { cn } from "@/lib/utils";

export function EcotucaOrb({
  className,
  label = "64%",
  caption = "formacao"
}: {
  className?: string;
  label?: string;
  caption?: string;
}) {
  return (
    <div
      className={cn(
        "inline-flex aspect-square w-28 flex-col items-center justify-center rounded-lg border border-brand-yellow/35 bg-brand-brown p-4 text-center text-brand-yellow shadow-card",
        className
      )}
    >
      <span className="brand-display text-4xl leading-none">{label}</span>
      <span className="mt-1 text-[11px] font-black uppercase text-brand-cream/80">{caption}</span>
      <span className="mt-3 h-2 w-16 rounded-pill bg-[linear-gradient(90deg,#FCC224,#E9635D,#2ACCB5)]" />
    </div>
  );
}
