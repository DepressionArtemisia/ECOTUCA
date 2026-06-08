import Link from "next/link";
import { ChevronRight, LogIn, MapPinned, Menu } from "lucide-react";
import { BrandLogo } from "@/components/brand/brand-logo";
import { BrandGradient } from "@/components/brand/brand-gradient";
import { OfficialLogo } from "@/components/brand/official-logo";
import { ThemeToggle } from "@/components/brand/theme-toggle";
import { EcoButton } from "@/components/brand/eco-button";
import { publicNav } from "@/lib/constants/brand";
import { footerHighlights, siteMapSections } from "@/lib/navigation/site-map";

export function PublicShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background-warm text-brand-brown dark:bg-background-dark dark:text-brand-cream">
      <header className="sticky top-0 z-40 border-b border-brand-brown/10 bg-brand-warm/95 backdrop-blur dark:border-brand-yellow/10 dark:bg-brand-brown/95">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <BrandLogo />
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Navegacao principal">
            {publicNav.map((item) => (
              <Link key={item.href} href={item.href} className="focus-ring-brand rounded-lg px-4 py-2 text-sm font-black transition hover:bg-brand-yellow/40 dark:hover:bg-white/10">
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link href="/login" className="hidden sm:block">
              <EcoButton size="sm">
                <LogIn size={16} />
                Entrar
              </EcoButton>
            </Link>
            <Link href="/roteiros" className="sm:hidden" aria-label="Roteiros">
              <EcoButton size="sm" variant="mint">
                <MapPinned size={16} />
              </EcoButton>
            </Link>
            <details className="group relative lg:hidden">
              <summary className="focus-ring-brand inline-flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-lg border border-brand-brown/15 bg-white/60 dark:border-brand-yellow/20 dark:bg-white/10" aria-label="Menu">
                <Menu size={18} />
              </summary>
              <nav className="absolute right-0 mt-3 w-72 rounded-lg border border-brand-brown/12 bg-brand-paper p-3 shadow-premium dark:border-brand-yellow/20 dark:bg-brand-dark-soft" aria-label="Menu mobile">
                {publicNav.map((item) => (
                  <Link key={item.href} href={item.href} className="focus-ring-brand flex min-h-11 items-center justify-between rounded-lg px-3 py-2 text-sm font-black hover:bg-brand-yellow/25 dark:hover:bg-white/10">
                    {item.label}
                    <ChevronRight size={16} />
                  </Link>
                ))}
              </nav>
            </details>
          </div>
        </div>
      </header>
      <main>{children}</main>
      <footer className="border-t border-brand-yellow/10 bg-brand-brown px-5 py-10 text-brand-cream">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.1fr_1.4fr]">
          <div>
            <div className="flex flex-wrap items-center gap-4">
              <BrandLogo tone="negative" />
              <OfficialLogo brand="perifa" variant="horizontal" tone="negative" size="sm" />
            </div>
            <p className="mt-5 max-w-xl text-sm text-brand-cream/75">
              ECOTUCA conecta educacao ambiental, juventude, turismo comunitario, tecnologia e prestacao de contas em uma experiencia digital pronta para evoluir.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {footerHighlights.slice(0, 6).map((item) => {
                const Icon = item.icon;
                return (
                  <Link key={item.href} href={item.href} className="focus-ring-brand inline-flex min-h-10 items-center gap-2 rounded-lg border border-brand-yellow/20 px-3 py-2 text-xs font-black text-brand-cream/85 hover:bg-brand-yellow hover:text-brand-brown">
                    <Icon size={15} />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="grid gap-5 sm:grid-cols-3">
            {siteMapSections.slice(0, 3).map((section) => (
              <div key={section.title}>
                <h2 className="text-sm font-black text-brand-yellow">{section.title}</h2>
                <div className="mt-3 space-y-2">
                  {section.items.slice(0, 4).map((item) => (
                    <Link key={item.href} href={item.href} className="focus-ring-brand block rounded-md text-sm text-brand-cream/75 hover:text-brand-yellow">
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

export function PublicHero({ children }: { children: React.ReactNode }) {
  return <BrandGradient className="min-h-[calc(100vh-76px)]">{children}</BrandGradient>;
}
