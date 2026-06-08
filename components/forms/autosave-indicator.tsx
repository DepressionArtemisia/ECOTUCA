"use client";

import { CheckCircle2, RotateCcw } from "lucide-react";

export function AutosaveIndicator({ savedAt }: { savedAt: string | null }) {
  return (
    <div className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-brand-brown/10 bg-white/75 px-3 py-2 text-xs font-black text-brand-brown/75 dark:border-brand-yellow/20 dark:bg-white/10 dark:text-brand-cream/75">
      {savedAt ? <CheckCircle2 size={15} className="text-brand-mint" /> : <RotateCcw size={15} className="text-brand-orange" />}
      {savedAt ? `Rascunho salvo ${savedAt}` : "Rascunho pronto"}
    </div>
  );
}
