import { Badge } from "@/components/ui/badge";

type Step = {
  title: string;
  description: string;
};

export function ProcessTimeline({ steps }: { steps: Step[] }) {
  return (
    <div className="grid gap-3 lg:grid-cols-5">
      {steps.map((step, index) => (
        <article key={step.title} className="relative rounded-lg border border-brand-brown/10 bg-white/82 p-4 shadow-soft dark:border-brand-yellow/15 dark:bg-white/10">
          <Badge tone={index % 2 === 0 ? "yellow" : "mint"}>{String(index + 1).padStart(2, "0")}</Badge>
          <h3 className="brand-display mt-4 text-2xl">{step.title}</h3>
          <p className="mt-2 text-sm font-bold text-brand-brown/70 dark:text-brand-cream/70">{step.description}</p>
        </article>
      ))}
    </div>
  );
}
