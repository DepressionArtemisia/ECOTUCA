import { AppShell } from "@/components/layout/app-shell";
import { Badge } from "@/components/ui/badge";
import { notices } from "@/lib/mock-data/ecotuca";

export default function NotificationsPage() {
  return (
    <AppShell title="Notificacoes">
      <section className="mx-auto max-w-4xl">
        <h1 className="brand-display text-5xl">Notificacoes</h1>
        <div className="mt-6 space-y-3">
          {notices.map((notice) => (
            <div key={notice} className="rounded-lg bg-white p-4 shadow-brand dark:bg-white/10">
              <Badge tone="mint">novo</Badge>
              <p className="mt-2 font-black">{notice}</p>
            </div>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
