import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { type SiteMapSection as SiteMapSectionType } from "@/lib/navigation/site-map";

export function SiteMapSection({ section }: { section: SiteMapSectionType }) {
  const Icon = section.icon;

  return (
    <section className="brand-card p-5">
      <div className="flex items-center gap-3">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-brand-yellow text-brand-brown">
          <Icon size={20} />
        </span>
        <h2 className="brand-display text-3xl">{section.title}</h2>
      </div>
      <div className="mt-5 space-y-3">
        {section.items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="focus-ring-brand group flex min-h-16 items-start justify-between gap-4 rounded-lg border border-brand-brown/10 bg-white/70 p-3 transition hover:border-brand-mint hover:bg-brand-mint/10 dark:border-brand-yellow/15 dark:bg-white/5"
          >
            <span>
              <span className="block text-sm font-black">{item.label}</span>
              <span className="mt-1 block text-xs text-[var(--muted)] dark:text-brand-cream/70">{item.description}</span>
            </span>
            <ChevronRight className="mt-1 shrink-0 transition group-hover:translate-x-0.5" size={17} />
          </Link>
        ))}
      </div>
    </section>
  );
}
