import { MobileBottomNav } from "@/components/mobile/mobile-bottom-nav";

export function MobileShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto min-h-screen max-w-md bg-brand-cream text-brand-brown dark:bg-brand-brown dark:text-brand-cream">
      <div className="sticky top-0 z-20 flex items-center justify-between border-b border-brand-brown/10 bg-brand-yellow px-4 py-3 text-brand-brown">
        <span className="brand-display text-2xl">ECOTUCA</span>
        <span className="rounded-lg bg-brand-brown px-3 py-1 text-xs font-black text-brand-yellow">APP</span>
      </div>
      <main className="px-4 pb-24 pt-4">{children}</main>
      <MobileBottomNav compact />
    </div>
  );
}
