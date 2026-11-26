import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export async function uploadLessonMaterial(file: File) {
  const supabase = createSupabaseBrowserClient();
  if (!supabase) throw new Error("O envio de arquivos está indisponível.");
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) throw new Error("Entre com uma conta aprovada para enviar um material.");
  const slug = file.name.replace(/[^a-z0-9._-]/gi, "-").toLowerCase().slice(-100);
  const path = `${user.id}/${crypto.randomUUID()}-${slug}`;
  const { error } = await supabase.storage.from("lesson-materials").upload(path, file);
  if (error) throw new Error("Não foi possível armazenar o arquivo. Tente novamente.");
}
