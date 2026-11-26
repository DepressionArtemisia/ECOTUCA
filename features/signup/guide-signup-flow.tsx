import { MultistepSignupFlow } from "@/features/signup/multistep-signup-flow";

import { guideSections } from "@/lib/data/guide-signup-fields";

export function GuideSignupFlow() {
  return (
    <MultistepSignupFlow
      applicationRole="guide"
      title="Cadastro de guia"
      eyebrow="Guia territorial"
      description="Para condutores, especialistas locais e jovens em formação que querem organizar perfil, agenda, especialidades e roteiros responsáveis."
      storageKey="ecotuca:signup:guide"
      sections={guideSections}
      asideTitle="Perfil de guia"
      asideItems={[
        "Perfil analisado pela coordenação Perifa Ecotour.",
        "Roteiros precisam de narrativa, segurança e combinados territoriais.",
        "Agenda, valores e grupos são validados antes de publicar.",
        "Imagem de moradores e pontos sensíveis exige cuidado comunitario.",
        "Acesso completo depende de aprovação."
      ]}
      analysisTitle="Como entra na vitrine"
      analysisDescription="A coordenação revisa vínculo territorial, experiência, disponibilidade, riscos e roteiro proposto antes de liberar perfil ou experiência na plataforma."
      submitLabel="Enviar perfil de guia"
    />
  );
}
