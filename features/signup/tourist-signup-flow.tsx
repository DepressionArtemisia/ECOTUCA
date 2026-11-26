import { MultistepSignupFlow } from "@/features/signup/multistep-signup-flow";

import { touristSections } from "@/lib/data/tourist-signup-fields";

export function TouristSignupFlow() {
  return (
    <MultistepSignupFlow
      applicationRole="tourist"
      title="Cadastro de turista"
      eyebrow="Visitante responsável"
      description="Para visitantes, escolas, universidades, empresas e parceiros interessados em experiências comunitarias, ambientais e territorialmente respeitosas."
      storageKey="ecotuca:signup:tourist"
      sections={touristSections}
      asideTitle="Interesse de visita"
      asideItems={[
        "O envio vira uma solicitação organizada, não uma reserva confirmada.",
        "A equipe valida data, guia, tamanho do grupo e segurança.",
        "O roteiro respeita moradores, memória local e combinados de imagem.",
        "Orientações de preparo são enviadas antes da visita.",
        "Valores e disponibilidade dependem de retorno da equipe."
      ]}
      analysisTitle="Como a equipe responde"
      analysisDescription="A equipe cruza data, roteiro, perfil do grupo, acessibilidade e agenda de guias para retornar com uma proposta responsável."
      submitLabel="Enviar interesse"
    />
  );
}
