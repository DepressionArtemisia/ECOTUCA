import { AppShell } from "@/components/layout/app-shell";
import { PlaceholderPage } from "@/components/layout/placeholder-page";

export default function ProfilePage() {
  return (
    <AppShell title="Perfil">
      <PlaceholderPage title="Perfil do usuario" description="Dados pessoais, comunidade, notificacoes, certificados e preferencias." area="Perfil" />
    </AppShell>
  );
}
