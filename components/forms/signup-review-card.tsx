"use client";

import { Badge } from "@/components/ui/badge";

export function SignupReviewCard({
  title,
  data
}: {
  title: string;
  data: Record<string, string | boolean | string[]>;
}) {
  const entries = Object.entries(data).filter(([, value]) => Array.isArray(value) ? value.length > 0 : value !== "");

  return (
    <section className="brand-card p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="brand-display text-3xl">{title}</h3>
        <Badge tone="mint">Revisao</Badge>
      </div>
      <dl className="mt-4 grid gap-3 sm:grid-cols-2">
        {entries.map(([key, value]) => (
          <div key={key} className="rounded-lg border border-brand-brown/10 bg-white/70 p-3 dark:border-brand-yellow/15 dark:bg-white/5">
            <dt className="text-xs font-black uppercase text-brand-brown/55 dark:text-brand-cream/55">{key}</dt>
            <dd className="mt-1 text-sm font-bold">
              {Array.isArray(value) ? value.join(", ") : typeof value === "boolean" ? (value ? "Sim" : "Nao") : value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
