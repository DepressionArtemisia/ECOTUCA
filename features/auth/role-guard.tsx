"use client";

import { Badge } from "@/components/ui/badge";
import { useCurrentUser } from "@/features/auth/use-current-user";
import type { UserRole } from "@/types/domain";

export function RoleGuard({
  roles,
  children
}: {
  roles: UserRole[];
  children: React.ReactNode;
}) {
  const user = useCurrentUser();
  if (!user || !roles.includes(user.role)) {
    return (
      <div className="rounded-lg bg-brand-yellow p-5 text-brand-brown shadow-brand">
        <Badge tone="coral">Acesso demo</Badge>
        <h1 className="brand-display mt-4 text-4xl">Acesso restrito</h1>
        <p className="mt-2 text-sm font-bold">Este perfil nao tem acesso a esta area no modo atual.</p>
      </div>
    );
  }

  return <>{children}</>;
}
