"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function FormStepper({
  steps,
  current
}: {
  steps: string[];
  current: number;
}) {
  return (
    <ol className="grid gap-2 sm:grid-cols-4">
      {steps.map((step, index) => {
        const active = index === current;
        const complete = index < current;
        return (
          <li
            key={step}
            className={cn(
              "flex min-h-14 items-center gap-3 rounded-lg border px-3 py-2 text-xs font-black",
              active && "border-brand-mint bg-brand-mint/12 text-brand-brown dark:text-brand-cream",
              complete && "border-brand-yellow bg-brand-yellow/20 text-brand-brown",
              !active && !complete && "border-brand-brown/10 bg-white/60 text-brand-brown/60 dark:border-brand-yellow/15 dark:bg-white/5 dark:text-brand-cream/60"
            )}
          >
            <span className={cn("inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg", complete ? "bg-brand-yellow text-brand-brown" : active ? "bg-brand-mint text-brand-brown" : "bg-brand-brown/10 dark:bg-white/10")}>
              {complete ? <Check size={15} /> : index + 1}
            </span>
            {step}
          </li>
        );
      })}
    </ol>
  );
}
