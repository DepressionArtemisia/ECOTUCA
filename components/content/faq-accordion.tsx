import { ChevronDown } from "lucide-react";

type FaqItem = { question: string; answer: string };

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  return (
    <div className="grid max-w-4xl gap-3">
      {items.map((item) => (
        <details key={item.question} className="brand-card group px-5">
          <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-3 py-3 font-bold [&::-webkit-details-marker]:hidden">
            {item.question}<ChevronDown size={17} className="shrink-0 transition-transform group-open:rotate-180" aria-hidden="true" />
          </summary>
          <p className="max-w-[68ch] pb-5 leading-relaxed text-[var(--muted)]">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
