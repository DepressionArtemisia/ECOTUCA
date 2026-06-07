import { cn } from "@/lib/utils";

const tones = {
  yellow: "bg-brand-yellow text-brand-brown",
  coral: "bg-brand-coral text-white",
  blue: "bg-brand-blue text-white",
  orange: "bg-brand-orange text-brand-brown",
  mint: "bg-brand-mint text-brand-brown",
  brown: "bg-brand-brown text-brand-yellow"
};

export function Badge({
  children,
  tone = "yellow",
  className
}: {
  children: React.ReactNode;
  tone?: keyof typeof tones;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center rounded-lg px-3 py-1 text-xs font-black", tones[tone], className)}>
      {children}
    </span>
  );
}
