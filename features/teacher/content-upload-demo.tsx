"use client";

import { FileUp } from "lucide-react";
import { useState } from "react";
import { EcoButton } from "@/components/brand/eco-button";
import { useAuth } from "@/features/auth/auth-provider";
import { uploadLessonMaterial } from "@/lib/data/uploads";

export function ContentUploadDemo() {
  const { user } = useAuth();
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const file = new FormData(form).get("material");
    if (!(file instanceof File) || file.type !== "application/pdf" || !file.size || file.size > 50 * 1024 * 1024) {
      setMessage("Selecione um PDF de até 50 MB.");
      return;
    }
    if (user?.source === "demo") {
      setMessage("Arquivo validado na demonstração. Nenhum PDF foi enviado.");
      return;
    }
    setUploading(true);
    setMessage("");
    try {
      await uploadLessonMaterial(file);
      form.reset();
      setMessage("Material armazenado. A publicação na aula depende da revisão da coordenação.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Não foi possível enviar o material.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <form onSubmit={submit} className="brand-card p-5 sm:p-7">
      <h2 className="text-card-title">Enviar material de apoio</h2>
      <p className="mt-2 text-sm text-[var(--muted)]">Envie um PDF de até 50 MB para revisão. Compartilhe somente arquivos que você tem autorização para usar.</p>
      <label className="mt-4 block text-sm font-bold">Arquivo PDF
        <input type="file" name="material" accept="application/pdf" required className="mt-2 block w-full rounded-lg border border-[var(--control-border)] p-3 text-sm" />
      </label>
      {message && <p role="status" className="mt-3 text-sm">{message}</p>}
      <EcoButton className="mt-4" type="submit" disabled={uploading}>
        <FileUp size={16} aria-hidden="true" /> {uploading ? "Enviando…" : "Enviar material"}
      </EcoButton>
    </form>
  );
}
