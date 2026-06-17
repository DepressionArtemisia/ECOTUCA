"use server";

import { z } from "zod";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

const signupValueSchema = z.union([
  z.string().max(5000),
  z.boolean(),
  z.array(z.string().max(500)).max(50)
]);

const signupApplicationSchema = z.object({
  role: z.enum(["student", "teacher", "guide", "tourist"]),
  storageKey: z.string().min(1).max(120),
  data: z.record(signupValueSchema),
  submittedAt: z.string().optional()
});

export type SignupApplicationInput = z.infer<typeof signupApplicationSchema>;

export type SignupApplicationResult = {
  ok: boolean;
  mode: "prepared" | "supabase";
  id?: string;
  message: string;
};

export async function submitSignupApplication(input: SignupApplicationInput): Promise<SignupApplicationResult> {
  const parsed = signupApplicationSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      mode: "prepared",
      message: "Revise os campos do cadastro antes de enviar."
    };
  }

  const application = parsed.data;
  if (process.env.ENABLE_SUPABASE_SIGNUP_WRITES !== "true") {
    return {
      ok: true,
      mode: "prepared",
      message: "Cadastro recebido neste ambiente. A fila de producao ja esta preparada para ativacao."
    };
  }

  const supabase = createSupabaseAdminClient();
  if (!supabase) {
    return {
      ok: false,
      mode: "supabase",
      message: "Nao foi possivel acessar o ambiente seguro de cadastro."
    };
  }

  const row = {
    role: application.role,
    status: "pending",
    applicant_name: pickString(application.data, ["nomeCompleto", "nomePublico", "comoChamar"]),
    applicant_email: pickString(application.data, ["email", "emailResponsavel"]),
    applicant_phone: pickString(application.data, ["telefone", "telefoneResponsavel"]),
    payload: application.data,
    source: "public_signup",
    policy_version: "2026-06-17",
    consent_version: "2026-06-17",
    submitted_at: application.submittedAt ?? new Date().toISOString()
  };

  const { data, error } = await supabase
    .from("signup_applications")
    .insert(row)
    .select("id")
    .single();

  if (error) {
    return {
      ok: false,
      mode: "supabase",
      message: "Nao foi possivel registrar o cadastro agora. Tente novamente ou fale com a coordenacao."
    };
  }

  return {
    ok: true,
    mode: "supabase",
    id: data?.id,
    message: "Cadastro recebido. A coordenacao ira analisar as informacoes e retornar pelo contato informado."
  };
}

function pickString(data: SignupApplicationInput["data"], keys: string[]) {
  for (const key of keys) {
    const value = data[key];
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  return null;
}
