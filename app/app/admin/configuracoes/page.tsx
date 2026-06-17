import { Bell, Database, Palette, ShieldCheck } from "lucide-react";
import { AdminShell } from "@/components/layout/admin-shell";
import { PerifaCard } from "@/components/brand/perifa-card";
import { Badge } from "@/components/ui/badge";

export default function AdminSettingsPage() {
  return (
    <AdminShell>
      <section className="mx-auto max-w-7xl space-y-6">
        <div className="brand-card bg-brand-brown p-5 text-brand-cream shadow-glow sm:p-6">
          <Badge tone="mint">Configuracao</Badge>
          <h1 className="brand-display mt-4 text-5xl text-brand-yellow sm:text-6xl">Sistema e governanca</h1>
          <p className="mt-3 max-w-3xl text-sm font-bold text-brand-cream/75">
            Parametros visuais, regras de aprovacao, notificacoes e integracoes ficam centralizados para operacao segura da plataforma.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {[
            { title: "Marca", text: "Logo oficial, paleta, tom de voz e assets aprovados.", icon: Palette, tone: "yellow" as const },
            { title: "Aprovacoes", text: "Regras para liberar aluno, professor, conteudo e certificado.", icon: ShieldCheck, tone: "mint" as const },
            { title: "Notificacoes", text: "Avisos de prazo, feedback, certificado e conta aprovada.", icon: Bell, tone: "coral" as const },
            { title: "Dados", text: "Supabase, RLS, backups, storage e auditoria de decisoes.", icon: Database, tone: "blue" as const }
          ].map((item) => {
            const Icon = item.icon;
            return (
              <PerifaCard key={item.title} tone={item.tone}>
                <Icon className="text-brand-coral" size={28} />
                <h2 className="brand-display mt-3 text-4xl">{item.title}</h2>
                <p className="mt-2 text-sm font-bold text-brand-brown/70 dark:text-brand-cream/70">{item.text}</p>
                <div className="mt-4 grid gap-2">
                  {["Planejado", "Requer aprovacao", "Auditavel"].map((label) => (
                    <span key={label} className="rounded-lg bg-brand-warm px-3 py-2 text-xs font-black text-brand-brown dark:bg-white/10 dark:text-brand-cream">{label}</span>
                  ))}
                </div>
              </PerifaCard>
            );
          })}
        </div>
      </section>
    </AdminShell>
  );
}
