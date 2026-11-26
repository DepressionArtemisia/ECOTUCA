import { Check } from "lucide-react";

export function AutosaveIndicator({ savedAt }: { savedAt: string | null }) {
  if (!savedAt) return null;
  return <p role="status" className="inline-flex items-center gap-2 text-sm font-bold text-[var(--muted)]"><Check size={16} aria-hidden="true" />{savedAt === "recuperado" ? "Rascunho recuperado" : `Rascunho salvo às ${savedAt}`}</p>;
}
