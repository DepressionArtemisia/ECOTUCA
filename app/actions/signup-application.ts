"use server";

import { z } from "zod";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { getInvalidFields, isVisible } from "@/lib/data/signup-fields";
import { studentSections } from "@/lib/data/student-signup-fields";
import { teacherSections } from "@/lib/data/teacher-signup-fields";
import { guideSections } from "@/lib/data/guide-signup-fields";
import { touristSections } from "@/lib/data/tourist-signup-fields";

const formSections = { student: studentSections, teacher: teacherSections, guide: guideSections, tourist: touristSections };
const signupValueSchema = z.union([z.string().max(5000), z.boolean(), z.array(z.string().max(500)).max(50)]);
const signupApplicationSchema = z.object({
  id: z.string().uuid(),
  role: z.enum(["student", "teacher", "guide", "tourist"]),
  data: z.record(z.string(), signupValueSchema)
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
  const invalid = { ok: false, mode: "prepared", message: "Confira os campos da inscrição antes de enviar." } as const;
  if (!parsed.success) return invalid;

  const { id, role, data } = parsed.data;
  const fields = formSections[role].flatMap((section) => [...section.fields]);
  if (getInvalidFields(fields, data).length) return invalid;
  const payload = Object.fromEntries(fields.filter((field) => isVisible(field, data) && data[field.name] !== undefined)
    .map(({ name }) => [name, data[name]]));

  if (process.env.ENABLE_SUPABASE_SIGNUP_WRITES !== "true") {
    if (process.env.NEXT_PUBLIC_ACCESS_CONTROL_MODE === "enforce") {
      return { ok: false, mode: "prepared", message: "As inscrições estão temporariamente indisponíveis." };
    }
    return {
      ok: true,
      mode: "prepared",
      message: "O preenchimento foi validado para demonstração. A inscrição ficou neste navegador."
    };
  }

  const supabase = createSupabaseAdminClient();
  if (!supabase) return { ok: false, mode: "supabase", message: "As inscrições estão temporariamente indisponíveis." };

  const { error } = await supabase.from("signup_applications").upsert({
    id,
    role,
    status: "pending",
    applicant_name: String(payload.nomeCompleto).trim(),
    applicant_email: String(payload.email).trim().toLowerCase(),
    applicant_phone: typeof payload.telefone === "string" ? payload.telefone.trim() : null,
    payload,
    source: "public_signup",
    policy_version: "2026-06-17",
    consent_version: "2026-06-17"
  }, { onConflict: "id", ignoreDuplicates: true });
  if (error) {
    return { ok: false, mode: "supabase", message: "Não foi possível enviar a inscrição. Tente novamente." };
  }
  return {
    ok: true,
    mode: "supabase",
    id,
    message: "A coordenação recebeu sua inscrição. Guarde o protocolo e aguarde retorno pelo contato informado."
  };
}
