import { Check, Circle, Lock } from "lucide-react";
import { studentJourney } from "@/lib/mock-data/ecotuca";

export function StudentJourneyMap() {
  return (
    <section className="brand-card p-5 sm:p-6">
      <h2 className="text-card-title">Etapas da formação</h2>
      <ol className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
        {studentJourney.map(({ label, status }) => {
          const Icon = status === "done" ? Check : status === "locked" ? Lock : Circle;
          const description = status === "done" ? "Concluída" : status === "locked" ? "Aguardando" : status === "active" ? "Em andamento" : "A seguir";
          return (
            <li key={label} className="flex items-center gap-3 rounded-lg bg-[var(--surface-alt)] p-3" aria-current={status === "active" ? "step" : undefined}>
              <Icon size={17} className="shrink-0" aria-hidden="true" />
              <span className="text-sm font-bold">{label}<small className="block font-medium text-[var(--muted)]">{description}</small></span>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
