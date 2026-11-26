import { MultistepSignupFlow } from "@/features/signup/multistep-signup-flow";

import { studentSections } from "@/lib/data/student-signup-fields";

export function StudentSignupFlow() {
  return (
    <MultistepSignupFlow
      applicationRole="student"
      title="Cadastro de aluno"
      eyebrow="Jornada do aluno"
      description="Para jovens do território em formação, com trilhas, aulas, certificados, comunidade e possibilidade futura de atuação como guia local."
      storageKey="ecotuca:signup:student"
      sections={studentSections}
      asideTitle="Jornada do aluno"
      asideItems={[
        "Cadastro recebido pela coordenação.",
        "Validação de perfil e disponibilidade.",
        "Entrada em trilhas, aulas e comunidade.",
        "Evolucao para certificados e práticas no território.",
        "Possível atuação como guia após formação e validação."
      ]}
      analysisTitle="Depois do envio"
      analysisDescription="A coordenação ECOTUCA analisa vínculo, disponibilidade, idade, consentimentos e necessidades de apoio antes de liberar a participação."
      submitLabel="Enviar cadastro"
    />
  );
}
