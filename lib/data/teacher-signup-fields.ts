import type { SignupSection } from "@/lib/data/signup-fields";

export const teacherSections = [
  {
    title: "Identificacao",
    description: "Dados basicos do educador, facilitador ou parceiro pedagógico.",
    fields: [
      { name: "nomeCompleto", label: "Nome completo", placeholder: "Ex.: Prof. Mariana Costa", required: true },
      { name: "email", label: "E-mail", kind: "email" as const, placeholder: "Ex.: mariana@email.com", required: true },
      { name: "telefone", label: "Telefone/WhatsApp", kind: "tel" as const, placeholder: "Ex.: (21) 97777-0000", required: true },
      { name: "instituicao", label: "Instituição/organização", placeholder: "Ex.: escola, universidade, ONG, coletivo" },
      { name: "cidadeUf", label: "Cidade/UF", placeholder: "Ex.: Rio de Janeiro/RJ", required: true },
      { name: "miniBio", label: "Mini bio", kind: "textarea" as const, placeholder: "Conte sua trajetoria em educação, território ou projeto social.", required: true }
    ]
  },
  {
    title: "Atuação pedagógica",
    description: "Onde pode contribuir com turmas, trilhas e experiências educativas.",
    fields: [
      {
        name: "areasAtuacao",
        label: "Área de atuação",
        kind: "checkboxGroup" as const,
        required: true,
        options: ["Educacao ambiental", "Turismo", "Agenda 2030", "Empreendedorismo", "Cultura local", "Comunicacao", "Tecnologia", "Gestao social", "Outro"]
      },
      { name: "experienciaJovens", label: "Experiência com jovens", kind: "textarea" as const, placeholder: "Ex.: oficinas, aulas, mentoria, projetos de juventude.", required: true },
      { name: "experienciaTerritorio", label: "Experiência com território/favela/projetos sociais", kind: "textarea" as const, placeholder: "Conte experiências com periferia, comunidade ou movimentos locais." },
      {
        name: "trilhaAtuacao",
        label: "Trilha onde pode atuar",
        kind: "checkboxGroup" as const,
        options: ["Guia local", "Biodiversidade", "Agenda 2030", "Empreendedorismo", "Comunicacao", "Hospitalidade", "Outra"],
        required: true
      },
      {
        name: "formatos",
        label: "Formato de contribuicao",
        kind: "checkboxGroup" as const,
        options: ["Aula", "Oficina", "Mentoria", "Video", "PDF", "Visita tecnica", "Avaliacao"],
        required: true
      }
    ]
  },
  {
    title: "Conteúdos e materiais",
    description: "Organiza o que pode virar aula, material, fórum ou acompanhamento.",
    fields: [
      { name: "conteudos", label: "Quais conteúdos pode oferecer?", kind: "textarea" as const, placeholder: "Ex.: roteiro de leitura de paisagem, ODS, turismo responsável.", required: true },
      { name: "videosProntos", label: "Tem vídeos prontos?", kind: "radio" as const, options: ["Sim", "Nao", "Posso gravar com apoio"], required: true },
      { name: "pdfsProntos", label: "Tem PDFs/apostilas?", kind: "radio" as const, options: ["Sim", "Nao", "Tenho rascunhos"], required: true },
      { name: "apoioGravacao", label: "Precisa de apoio para gravacao?", kind: "radio" as const, options: ["Sim", "Nao", "Talvez"], required: true },
      { name: "podeForum", label: "Pode responder fórum?", kind: "radio" as const, options: ["Sim", "Com agenda combinada", "Nao"], required: true },
      { name: "podeAvaliar", label: "Pode avaliar atividades?", kind: "radio" as const, options: ["Sim", "Com rubrica simples", "Nao"], required: true },
      { name: "podeAcompanharTurmas", label: "Pode acompanhar turmas?", kind: "radio" as const, options: ["Sim", "Pontualmente", "Nao"], required: true }
    ]
  },
  {
    title: "Disponibilidade e autorizacao",
    description: "Combinados para contato, agenda e validação pela coordenação.",
    fields: [
      { name: "disponibilidade", label: "Disponibilidade", kind: "checkboxGroup" as const, required: true, options: ["Manha", "Tarde", "Noite", "Fins de semana", "Sob demanda"] },
      { name: "formatoPreferido", label: "Formato", kind: "checkboxGroup" as const, required: true, options: ["Presencial", "Online", "Hibrido"] },
      { name: "aceiteDados", label: "Autorizo o uso dos dados para análise de cadastro e contato da coordenação.", kind: "consent" as const, required: true },
      { name: "cienciaValidacao", label: "Estou ciente de que a participação depende de validação da coordenação.", kind: "consent" as const, required: true },
      { name: "aceiteContato", label: "Aceito receber contato para alinhar turmas, materiais e agenda.", kind: "consent" as const, required: true }
    ]
  }
] satisfies SignupSection[];
