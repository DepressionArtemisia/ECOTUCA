import { AppShell } from "@/components/layout/app-shell";
import { PlaceholderPage } from "@/components/layout/placeholder-page";

export default function SettingsPage() {
  return (
    <AppShell title="Configuracoes">
      <PlaceholderPage title="Configuracoes do app" description="Tema, notificacoes, privacidade, dados e preferencias de apresentacao." area="Configuracoes" />
    </AppShell>
  );
}
