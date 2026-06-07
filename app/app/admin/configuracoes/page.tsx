import { AdminShell } from "@/components/layout/admin-shell";
import { PlaceholderPage } from "@/components/layout/placeholder-page";

export default function AdminSettingsPage() {
  return (
    <AdminShell>
      <PlaceholderPage title="Configuracoes do sistema" description="Parametros de marca, aprovacoes, notificacoes, relatorios e integracoes." area="Admin" />
    </AdminShell>
  );
}
