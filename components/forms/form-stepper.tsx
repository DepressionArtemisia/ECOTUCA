import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function FormStepper({ steps, current }: { steps: string[]; current: number }) {
  return (
    <ol className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap" aria-label="Etapas da inscrição">
      {steps.map((step, index) => (
        <li key={step} aria-current={index === current ? "step" : undefined}
          className={cn("flex min-w-0 items-center gap-2 rounded-lg border p-2 text-xs font-bold",
            index === current ? "border-brand-yellow bg-brand-yellow text-brand-brown" : "border-[var(--border-soft)] bg-[var(--card)] text-[var(--muted)]")}>
          <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md border border-current/20" aria-hidden="true">
            {index < current ? <Check size={14} /> : index + 1}
          </span>
          <span className="min-w-0 [overflow-wrap:anywhere]">{step}</span>
        </li>
      ))}
    </ol>
  );
}
