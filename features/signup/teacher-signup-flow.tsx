import { MultistepSignupFlow } from "@/features/signup/multistep-signup-flow";

import { teacherSections } from "@/lib/data/teacher-signup-fields";

export function TeacherSignupFlow() {
  return (
    <MultistepSignupFlow
      applicationRole="teacher"
      title="Cadastro de professor"
      eyebrow="Rede pedagógica"
      description="Para educadores e facilitadores que apoiam conteúdos, turmas, materiais, fórum, mentoria e avaliação dentro da ECOTUCA."
      storageKey="ecotuca:signup:teacher"
      sections={teacherSections}
      asideTitle="Participação pedagógica"
      asideItems={[
        "Perfil avaliado pela coordenação.",
        "Conteúdos passam por curadoria antes de publicar.",
        "Turmas e fórum dependem de agenda combinada.",
        "Materiais oficiais precisam de autorizacao de uso.",
        "Acesso ao painel e liberado após aprovação."
      ]}
      analysisTitle="Depois do envio"
      analysisDescription="A coordenação avalia aderencia pedagógica, experiência com jovens, disponibilidade e materiais antes de alinhar participação."
      submitLabel="Enviar cadastro"
    />
  );
}
