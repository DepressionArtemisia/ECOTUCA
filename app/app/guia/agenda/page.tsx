import { AppShell } from "@/components/layout/app-shell";
import { Badge } from "@/components/ui/badge";

export default function GuideAgendaPage() {
  return (
    <AppShell title="Agenda do guia" roleContext="guide">
      <section className="mx-auto max-w-5xl space-y-4">
        <Badge tone="orange">Agenda de apresentacao</Badge>
        <h1 className="brand-display text-5xl">Solicitações recebidas</h1>
        {["Serra da Misericórdia - 12/07 - 4 pessoas", "Vivência Perifa Ecotour - 18/07 - universidade", "Caminho Verde - 21/07 - grupo escolar"].map((item) => (
          <article key={item} className="rounded-lg bg-white p-5 font-black shadow-brand dark:bg-white/10">{item}</article>
        ))}
      </section>
    </AppShell>
  );
}
