"use client";

import { FileUp } from "lucide-react";
import { useState } from "react";
import { EcoButton } from "@/components/brand/eco-button";
import { Badge } from "@/components/ui/badge";
import { uploadDemoAwareFile } from "@/lib/data/uploads";

export function ContentUploadDemo() {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("Nenhum arquivo enviado nesta sessao.");
  const [source, setSource] = useState<"supabase" | "demo">("demo");
  const [uploading, setUploading] = useState(false);

  async function submit() {
    if (!file) {
      setMessage("Selecione um PDF antes de enviar.");
      return;
    }

    setUploading(true);
    const safeName = file.name.replace(/[^a-z0-9._-]/gi, "-").toLowerCase();
    const result = await uploadDemoAwareFile("lesson-materials", `demo/${Date.now()}-${safeName}`, file);
    setUploading(false);
    setSource(result.source);
    setMessage(
      result.source === "supabase"
        ? `Arquivo enviado para lesson-materials/${result.path}.`
        : "Registro de apresentacao preparado. O arquivo oficial depende da ativacao do bucket lesson-materials."
    );
  }

  return (
    <div className="mt-6 rounded-lg border border-brand-brown/10 bg-brand-warm p-4 text-brand-brown dark:border-brand-yellow/15 dark:bg-brand-brown/60 dark:text-brand-cream">
      <div className="flex flex-wrap gap-2">
        <Badge tone="blue">Upload PDF</Badge>
        <Badge tone={source === "supabase" ? "mint" : "yellow"}>
          {source === "supabase" ? "Storage Supabase" : "Apresentacao"}
        </Badge>
      </div>
      <label className="mt-4 block">
        <span className="text-xs font-black uppercase">Material da aula</span>
        <input
          type="file"
          accept="application/pdf"
          onChange={(event) => setFile(event.target.files?.[0] ?? null)}
          className="mt-2 block w-full rounded-lg border border-brand-brown/15 bg-white px-4 py-3 text-sm font-bold text-brand-brown"
        />
      </label>
      <p className="mt-3 text-sm font-bold">{message}</p>
      <EcoButton className="mt-4" variant="mint" type="button" onClick={submit} disabled={uploading}>
        <FileUp size={16} />
        {uploading ? "Enviando..." : "Enviar material"}
      </EcoButton>
    </div>
  );
}
