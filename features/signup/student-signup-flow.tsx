import { MultistepSignupFlow } from "@/features/signup/multistep-signup-flow";

const studentSections = [
  {
    title: "Identidade",
    description: "Dados basicos para a equipe reconhecer o jovem e fazer contato.",
    fields: [
      { name: "nomeCompleto", label: "Nome completo", required: true },
      { name: "email", label: "E-mail", kind: "email" as const, required: true },
      { name: "telefone", label: "Telefone ou WhatsApp", kind: "tel" as const, required: true },
      { name: "dataNascimento", label: "Data de nascimento", kind: "date" as const, required: true },
      { name: "bairro", label: "Bairro/comunidade", required: true },
      { name: "responsavel", label: "Responsavel, se menor de idade" }
    ]
  },
  {
    title: "Formacao",
    description: "Contexto escolar, disponibilidade e objetivos dentro da ECOTUCA.",
    fields: [
      { name: "escolaridade", label: "Escolaridade", kind: "select" as const, required: true, options: ["Ensino fundamental", "Ensino medio", "EJA", "Ensino superior", "Outro"] },
      { name: "escola", label: "Escola ou instituicao" },
      { name: "disponibilidade", label: "Disponibilidade", kind: "select" as const, required: true, options: ["Manha", "Tarde", "Noite", "Finais de semana"] },
      { name: "interesse", label: "Por que quer entrar na ECOTUCA?", kind: "textarea" as const, required: true }
    ]
  },
  {
    title: "Territorio",
    description: "Interesses ligados ao Complexo do Alemao, ambiente e turismo comunitario.",
    fields: [
      { name: "vivenciaTerritorio", label: "Vivencia no territorio", kind: "textarea" as const },
      { name: "temaFavorito", label: "Tema favorito", kind: "select" as const, options: ["Educacao ambiental", "Turismo comunitario", "Comunicacao", "Tecnologia", "Memoria e cultura"] },
      { name: "necessidades", label: "Necessidades de acessibilidade ou apoio", kind: "textarea" as const }
    ]
  },
  {
    title: "Termos",
    description: "Consentimentos minimos para a demonstracao do fluxo.",
    fields: [
      { name: "aceiteDados", label: "Autorizo o uso dos dados informados para analise de cadastro ECOTUCA.", kind: "consent" as const, required: true },
      { name: "aceiteContato", label: "Aceito receber contato da coordenacao sobre proximas etapas.", kind: "consent" as const, required: true },
      { name: "aceiteImagem", label: "Entendo que autorizacao de imagem definitiva sera coletada em documento proprio.", kind: "consent" as const }
    ]
  }
];

export function StudentSignupFlow() {
  return (
    <MultistepSignupFlow
      title="Cadastro de aluno"
      eyebrow="Jornada formativa"
      description="Fluxo completo para jovens interessados em educacao ambiental, tecnologia, turismo comunitario e geracao de renda."
      storageKey="ecotuca:signup:student"
      sections={studentSections}
      asideItems={[
        "Perfil de jovem estudante ou morador interessado no projeto.",
        "Cadastro fica pendente ate validacao da coordenacao.",
        "Rascunho e revisao facilitam preencher sem pressa.",
        "Consentimentos foram separados para futura adequacao LGPD."
      ]}
    />
  );
}
