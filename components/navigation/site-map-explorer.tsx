"use client";

import { useMemo, useState } from "react";
import { Check, Copy, ExternalLink, Filter } from "lucide-react";
import { EcoButton, EcoLink } from "@/components/brand/eco-button";
import { Badge } from "@/components/ui/badge";
import { siteMapSections, type SiteMapAudience, type SiteMapItem, type SiteMapStatus } from "@/lib/navigation/site-map";

const audienceOptions: Array<{ value: "all" | SiteMapAudience; label: string }> = [
  { value: "all", label: "Todos" },
  { value: "public", label: "Público" },
  { value: "student", label: "Aluno" },
  { value: "teacher", label: "Professor" },
  { value: "guide", label: "Guia" },
  { value: "tourist", label: "Turista" },
  { value: "admin", label: "Admin" },
  { value: "meeting", label: "Preview" },
  { value: "technical", label: "Técnico" }
];

const statusOptions: Array<{ value: "all" | SiteMapStatus; label: string }> = [
  { value: "all", label: "Todos" },
  { value: "ready", label: "Pronto" },
  { value: "preview", label: "Preview" },
  { value: "draft", label: "Minuta" },
  { value: "technical", label: "Técnico" }
];

const statusTone: Record<SiteMapStatus, "yellow" | "coral" | "blue" | "orange" | "mint"> = {
  ready: "mint",
  preview: "yellow",
  draft: "orange",
  technical: "blue"
};

const statusLabel: Record<SiteMapStatus, string> = {
  ready: "pronto",
  preview: "preview",
  draft: "minuta",
  technical: "tecnico"
};

function RouteCard({
  item,
  copiedHref,
  onCopy
}: {
  item: SiteMapItem;
  copiedHref: string;
  onCopy: (href: string) => void;
}) {
  return (
    <article className="brand-card flex min-h-48 flex-col justify-between p-4 dark:bg-brand-dark-soft/90">
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone={statusTone[item.status]}>{statusLabel[item.status]}</Badge>
          <span className="rounded-lg bg-brand-brown/10 px-2 py-1 text-xs font-black uppercase text-brand-brown/70 dark:bg-white/10 dark:text-brand-cream/70">
            {item.visibility}
          </span>
        </div>
        <h3 className="brand-display mt-4 text-3xl">{item.label}</h3>
        <p className="mt-2 text-sm font-bold text-brand-brown/68 dark:text-brand-cream/70">{item.description}</p>
        <p className="mt-3 break-all rounded-lg bg-brand-warm px-3 py-2 text-xs font-black text-brand-brown dark:bg-white/10 dark:text-brand-cream">
          {item.href}
        </p>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <EcoLink href={item.href} size="sm" variant="mint"><ExternalLink size={15} />
            Abrir</EcoLink>
        <EcoButton size="sm" variant="outline" type="button" onClick={() => onCopy(item.href)}>
          {copiedHref === item.href ? <Check size={15} /> : <Copy size={15} />}
          {copiedHref === item.href ? "Copiado" : "Copiar"}
        </EcoButton>
      </div>
    </article>
  );
}

export function SiteMapExplorer() {
  const [audience, setAudience] = useState<"all" | SiteMapAudience>("public");
  const [status, setStatus] = useState<"all" | SiteMapStatus>("ready");
  const [copiedHref, setCopiedHref] = useState("");

  const filteredSections = useMemo(() => (
    siteMapSections
      .map((section) => ({
        ...section,
        items: section.items.filter((item) => {
          const audienceMatch = audience === "all" || item.audiences.includes(audience);
          const statusMatch = status === "all" || item.status === status;
          return audienceMatch && statusMatch;
        })
      }))
      .filter((section) => section.items.length > 0)
  ), [audience, status]);

  async function copyHref(href: string) {
    const origin = window.location.origin;
    const value = `${origin}${href}`;
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      const input = document.createElement("input");
      input.value = value;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
    }
    setCopiedHref(href);
    window.setTimeout(() => setCopiedHref(""), 1400);
  }

  return (
    <div className="space-y-6">
      <section className="brand-card p-4 dark:bg-brand-dark-soft/90 sm:p-5">
        <div className="flex flex-wrap items-center gap-3">
          <Filter size={20} className="text-[var(--accent-text)]" />
          <h2 className="brand-display text-3xl">Filtros da plataforma</h2>
        </div>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <div>
            <p className="text-sm font-black uppercase text-[var(--muted)] dark:text-brand-cream/70">Perfil</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {audienceOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={`focus-ring-brand rounded-lg px-3 py-2 text-sm font-black transition ${
                    audience === option.value
                      ? "bg-brand-mint text-brand-brown"
                      : "bg-white text-brand-brown hover:bg-brand-yellow/35 dark:bg-white/10 dark:text-brand-cream"
                  }`}
                  onClick={() => setAudience(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-black uppercase text-[var(--muted)] dark:text-brand-cream/70">Status</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {statusOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={`focus-ring-brand rounded-lg px-3 py-2 text-sm font-black transition ${
                    status === option.value
                      ? "bg-brand-yellow text-brand-brown"
                      : "bg-white text-brand-brown hover:bg-brand-mint/20 dark:bg-white/10 dark:text-brand-cream"
                  }`}
                  onClick={() => setStatus(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {filteredSections.map((section) => {
        const Icon = section.icon;
        return (
          <section key={section.title} className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-brand-yellow text-brand-brown">
                <Icon size={20} />
              </span>
              <div>
                <h2 className="brand-display text-4xl">{section.title}</h2>
                <p className="text-sm font-bold text-[var(--muted)] dark:text-[var(--muted)]">{section.items.length} rotas encontradas</p>
              </div>
            </div>
            <div className="desktop-sitemap-grid">
              {section.items.map((item) => (
                <RouteCard key={item.href} item={item} copiedHref={copiedHref} onCopy={copyHref} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
