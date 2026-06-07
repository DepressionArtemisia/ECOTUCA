"use client";

import { RotateCcw } from "lucide-react";
import { useState } from "react";
import { EcoButton } from "@/components/brand/eco-button";

export function ResetDemoDataButton() {
  const [message, setMessage] = useState("");

  function resetDemoData() {
    const confirmed = window.confirm(
      "Resetar apenas os dados locais da apresentacao ECOTUCA? Isso limpa perfil demo, progresso e reservas locais."
    );
    if (!confirmed) return;

    const keysToRemove: string[] = [];
    for (let index = 0; index < window.localStorage.length; index += 1) {
      const key = window.localStorage.key(index);
      if (!key) continue;
      if (key.startsWith("ecotuca") || key === "demo-session") {
        keysToRemove.push(key);
      }
    }

    keysToRemove.forEach((key) => window.localStorage.removeItem(key));
    setMessage(`Dados locais da apresentacao resetados (${keysToRemove.length}).`);
  }

  return (
    <div className="inline-flex flex-col gap-2">
      <EcoButton type="button" variant="outline" onClick={resetDemoData}>
        <RotateCcw size={16} />
        Resetar demo
      </EcoButton>
      {message ? <span className="text-xs font-black text-brand-mint dark:text-brand-yellow">{message}</span> : null}
    </div>
  );
}
