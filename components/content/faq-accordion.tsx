type FaqItem = {
  question: string;
  answer: string;
};

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {items.map((item) => (
        <details key={item.question} className="brand-card p-4 dark:bg-brand-dark-soft/90">
          <summary className="cursor-pointer text-base font-black">{item.question}</summary>
          <p className="mt-3 text-sm font-bold text-brand-brown/70 dark:text-brand-cream/70">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
