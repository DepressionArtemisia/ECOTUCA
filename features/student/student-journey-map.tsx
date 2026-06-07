import { CheckCircle2, Circle, Lock, Map } from "lucide-react";
import { studentJourney } from "@/lib/mock-data/ecotuca";
import { cn } from "@/lib/utils";

export function StudentJourneyMap() {
  return (
    <section className="rounded-lg border border-brand-brown/10 bg-white p-5 shadow-brand dark:border-brand-yellow/15 dark:bg-white/10">
      <p className="inline-flex items-center gap-2 text-sm font-black uppercase text-brand-blue dark:text-brand-mint">
        <Map size={16} />
        Jornada visual
      </p>
      <div className="mt-5 grid gap-3 md:grid-cols-7">
        {studentJourney.map((step) => {
          const done = step.status === "done";
          const active = step.status === "active";
          const locked = step.status === "locked";
          const Icon = done ? CheckCircle2 : locked ? Lock : Circle;

          return (
            <div
              key={step.label}
              className={cn(
                "rounded-lg border p-3 text-center text-xs font-black",
                done && "border-brand-mint bg-brand-mint/20 text-brand-brown",
                active && "border-brand-yellow bg-brand-yellow text-brand-brown",
                step.status === "next" && "border-brand-orange bg-brand-orange/25 text-brand-brown",
                locked && "border-brand-brown/10 bg-brand-warm text-brand-brown/55 dark:bg-white/5 dark:text-brand-cream/60"
              )}
            >
              <Icon className="mx-auto mb-2" size={18} />
              {step.label}
            </div>
          );
        })}
      </div>
    </section>
  );
}
