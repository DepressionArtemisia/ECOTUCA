"use client";

import { Copy, LogIn } from "lucide-react";
import { useState } from "react";
import { EcoButton } from "@/components/brand/eco-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { demoSessionKey } from "@/lib/demo/demo-session";
import { demoUsers } from "@/lib/mock-data/ecotuca";
import { useAuth } from "@/features/auth/auth-provider";

export function DemoUserSwitcher() {
  const [selected, setSelected] = useState(demoUsers[3]);
  const { useDemoUser } = useAuth();

  function choose(email: string) {
    const user = demoUsers.find((item) => item.email === email);
    if (!user) return;
    setSelected(user);
    window.localStorage.setItem(demoSessionKey, JSON.stringify(user));
  }

  async function copyText(value: string) {
    await navigator.clipboard?.writeText(value);
  }

  function useProfile() {
    window.localStorage.setItem(demoSessionKey, JSON.stringify(selected));
    useDemoUser(selected);
  }

  return (
    <section className="brand-card min-w-0 p-4 dark:bg-brand-dark-soft/90 sm:p-5">
      <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="text-sm font-black uppercase text-[var(--accent-text)]">Usuários de apresentacao</p>
          <h2 className="brand-display text-3xl">Login rapido da reuniao</h2>
          <p className="mt-2 text-sm text-brand-brown/70 dark:text-brand-cream/75">
            Selecione um perfil para contar uma história diferente na apresentacao.
          </p>
          <Badge tone="yellow" className="mt-3">Modo de demonstração</Badge>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={() => copyText(selected.email)}>
            <Copy size={15} />
            E-mail
          </Button>
          <Button variant="outline" size="sm" onClick={() => copyText(selected.password)}>
            <Copy size={15} />
            Senha
          </Button>
        </div>
      </div>
      <div className="mt-5 grid min-w-0 gap-3 md:grid-cols-2">
        {demoUsers.map((user) => (
          <button
            key={user.email}
            onClick={() => choose(user.email)}
            className="focus-ring-brand min-w-0 rounded-lg border border-brand-brown/10 bg-brand-warm p-4 text-left transition hover:border-brand-brown dark:border-brand-yellow/15 dark:bg-white/10"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="font-black">{user.name}</p>
                <p className="break-all text-sm text-brand-brown/70 dark:text-brand-cream/70">{user.email}</p>
              </div>
              <Badge tone={user.status === "pending" ? "coral" : "mint"}>{user.role}</Badge>
            </div>
          </button>
        ))}
      </div>
      <div className="mt-5 rounded-lg bg-brand-brown p-4 text-brand-cream">
        <p className="text-sm font-black text-brand-yellow">Selecionado</p>
        <p className="mt-1 text-lg font-black">{selected.name}</p>
        <p className="mt-1 break-all text-sm text-brand-yellow">{selected.email} / {selected.password}</p>
        <p className="text-sm text-brand-cream/75">{selected.highlight}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <EcoButton variant="mint" onClick={useProfile}>
            <LogIn size={16} />
            Usar este perfil na apresentacao
          </EcoButton>
          <Badge tone={selected.status === "pending" ? "coral" : "yellow"}>{selected.status}</Badge>
        </div>
      </div>
    </section>
  );
}
