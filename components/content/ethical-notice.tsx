import { ShieldCheck } from "lucide-react";

export function EthicalNotice({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-brand-mint/40 bg-brand-mint/12 p-4 text-sm font-bold text-brand-brown dark:text-brand-cream">
      <ShieldCheck className="mr-2 inline text-brand-mint" size={18} />
      {children}
    </div>
  );
}
