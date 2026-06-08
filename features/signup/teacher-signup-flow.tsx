import { MultistepSignupFlow } from "@/features/signup/multistep-signup-flow";

const teacherSections = [
  {
    title: "Identidade",
    description: "Dados de contato e area de atuacao do educador ou facilitador.",
    fields: [
      { name: "nomeCompleto", label: "Nome completo", required: true },
      { name: "email", label: "E-mail", kind: "email" as const, required: true },
      { name: "telefone", label: "Telefone ou WhatsApp", kind: "tel" as const, required: true },
      { name: "areaAtuacao", label: "Area de atuacao", required: true },
      { name: "organizacao", label: "Instituicao ou coletivo" }
    ]
  },
  {
    title: "Experiencia",
    description: "Experiencia pedagogica, territorial e materiais que pode construir.",
    fields: [
      { name: "miniBio", label: "Mini bio", kind: "textarea" as const, required: true },
      { name: "disciplinas", label: "Temas que pode ministrar", kind: "textarea" as const, required: true },
      { name: "experienciaTerritorial", label: "Experiencia com territorio/periferia", kind: "textarea" as const },
      { name: "portfolio", label: "Link de portfolio, Lattes ou rede profissional" }
    ]
  },
  {
    title: "Turmas",
    description: "Informacoes praticas para organizar aulas, encontros e materiais.",
    fields: [
      { name: "disponibilidade", label: "Disponibilidade", kind: "select" as const, required: true, options: ["Manha", "Tarde", "Noite", "Finais de semana", "Sob demanda"] },
      { name: "formato", label: "Formato preferido", kind: "select" as const, required: true, options: ["Presencial", "Online", "Hibrido"] },
      { name: "recursos", label: "Recursos ou materiais necessarios", kind: "textarea" as const }
    ]
  },
  {
    title: "Termos",
    description: "Combinados para publicacao pedagogica e contato.",
    fields: [
      { name: "aceiteDados", label: "Autorizo a analise dos dados para cadastro de professor ECOTUCA.", kind: "consent" as const, required: true },
      { name: "aceiteConteudos", label: "Entendo que materiais publicados passam por curadoria da coordenacao.", kind: "consent" as const, required: true },
      { name: "aceiteContato", label: "Aceito receber contato sobre turmas, agenda e alinhamentos pedagogicos.", kind: "consent" as const, required: true }
    ]
  }
];

export function TeacherSignupFlow() {
  return (
    <MultistepSignupFlow
      title="Cadastro de professor"
      eyebrow="Rede pedagogica"
      description="Fluxo completo para educadores, facilitadores e parceiros que vao organizar conteudos, turmas e materiais da ECOTUCA."
      storageKey="ecotuca:signup:teacher"
      sections={teacherSections}
      asideItems={[
        "Perfil voltado para educadores, facilitadores e parceiros.",
        "Materiais passam por curadoria antes de aparecer para alunos.",
        "Acesso ao painel de professor depende de aprovacao.",
        "O formulario ja separa experiencia, agenda e termos."
      ]}
    />
  );
}
