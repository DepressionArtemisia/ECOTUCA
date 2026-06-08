"use client";

import { RotateCcw } from "lucide-react";
import { useState } from "react";
import { EcoButton } from "@/components/brand/eco-button";

export function ResetDemoDataButton() {
  const [message, setMessage] = useState("");
  const [confirming, setConfirming] = useState(false);

  function resetDemoData() {
    if (!confirming) {
      setConfirming(true);
      setMessage("Clique novamente para limpar apenas os dados locais da apresentacao.");
      return;
    }

    const keysToRemove: string[] = [];
    for (let index = 0; index < window.localStorage.length; index += 1) {
      const key = window.localStorage.key(index);
      if (!key) continue;
      if (key.startsWith("ecotuca") || key === "demo-session") {
        keysToRemove.push(key);
      }
    }

    keysToRemove.forEach((key) => window.localStorage.removeItem(key));
    setConfirming(false);
    setMessage(`Dados locais da apresentacao limpos (${keysToRemove.length}).`);
  }

  return (
    <div className="inline-flex flex-col gap-2">
      <EcoButton type="button" variant="outline" onClick={resetDemoData}>
        <RotateCcw size={16} />
        {confirming ? "Confirmar limpeza" : "Limpar apresentacao"}
      </EcoButton>
      {message ? <span className="text-xs font-black text-brand-mint dark:text-brand-yellow">{message}</span> : null}
    </div>
  );
}
