"use client";

import { useState } from "react";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/auth/auth-provider";

export function LogoutButton({ className }: { className?: string } = {}) {
  const { logout } = useAuth();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(false);

  async function exit() {
    setBusy(true);
    setError(false);
    try { await logout(); }
    catch { setError(true); }
    finally { setBusy(false); }
  }

  return (
    <div>
      <Button className={className} variant="outline" size="sm" onClick={exit} disabled={busy}><LogOut size={15} />Sair</Button>
      {error && <p className="mt-2 text-sm" role="alert">Não foi possível sair. Tente novamente.</p>}
    </div>
  );
}
