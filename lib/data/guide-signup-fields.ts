import type { SignupSection } from "@/lib/data/signup-fields";

export const guideSections = [
  {
    title: "Identificacao territorial",
    description: "Dados basicos para reconhecer o guia, o vínculo com o território e os contatos principais.",
    fields: [
      { name: "nomeCompleto", label: "Nome completo", placeholder: "Ex.: Joao Pedro Silva", required: true },
      { name: "nomePublico", label: "Nome público ou apelido de guia", placeholder: "Ex.: JP da Serra" },
      { name: "email", label: "E-mail", kind: "email" as const, placeholder: "Ex.: guia@email.com", required: true },
      { name: "telefone", label: "Telefone/WhatsApp", kind: "tel" as const, placeholder: "Ex.: (21) 98888-0000", required: true },
      { name: "cidadeUf", label: "Cidade/UF", placeholder: "Ex.: Rio de Janeiro/RJ", required: true },
      { name: "bairroBase", label: "Bairro/comunidade de base", placeholder: "Ex.: Complexo do Alemão", required: true },
      {
        name: "vinculoTerritorial",
        label: "Qual e o seu vínculo com o território?",
        kind: "radio" as const,
        options: ["Moro", "Trabalho", "Atuo em projeto/coletivo", "Sou guia formado", "Tenho outro vinculo"],
        required: true
      },
      { name: "miniBio", label: "Mini bio territorial", kind: "textarea" as const, placeholder: "Conte sua trajetoria, relação com o território e experiência com visitantes.", required: true }
    ]
  },
  {
    title: "Roteiros e especialidades",
    description: "Organiza temas, narrativas e tipos de experiência que podem entrar na vitrine Perifa Ecotour.",
    fields: [
      {
        name: "especialidades",
        label: "Especialidades",
        kind: "checkboxGroup" as const,
        options: ["Serra da Misericordia", "Memoria local", "Biodiversidade", "Cultura periferica", "Fotografia", "Gastronomia", "Educacao ambiental", "Agenda 2030"],
        required: true
      },
      {
        name: "tiposRoteiro",
        label: "Tipos de roteiro que pode conduzir",
        kind: "checkboxGroup" as const,
        options: ["Trilha ambiental", "Vivencia cultural", "Roteiro educativo", "Visita tecnica", "Roda de conversa", "Experiencia para escola", "Experiencia para parceiro"],
        required: true
      },
      { name: "roteiroPrincipal", label: "Roteiro principal que gostaria de cadastrar", kind: "textarea" as const, placeholder: "Nome, duração, narrativa e pontos importantes.", required: true },
      { name: "limitesSeguranca", label: "Limites, riscos ou combinados de segurança", kind: "textarea" as const, placeholder: "Ex.: dias melhores, pontos sensíveis, tamanho maximo de grupo.", required: true },
      { name: "publicoPreferido", label: "Público preferido", kind: "checkboxGroup" as const, options: ["Escolas", "Universidades", "Turistas", "Empresas", "Pesquisadores", "Moradores", "Parceiros sociais"], required: true }
    ]
  },
  {
    title: "Operação e disponibilidade",
    description: "Apoia agenda, idiomas, preço de referência e preparo operacional antes de publicar qualquer experiência.",
    fields: [
      { name: "disponibilidade", label: "Disponibilidade", kind: "checkboxGroup" as const, required: true, options: ["Manha", "Tarde", "Noite", "Fins de semana", "Datas sob combinacao"] },
      { name: "idiomas", label: "Idiomas", kind: "checkboxGroup" as const, options: ["Portugues", "Ingles", "Espanhol", "Frances", "Outro"], required: true },
      { name: "tamanhoGrupo", label: "Tamanho de grupo recomendado", placeholder: "Ex.: até 12 pessoas", required: true },
      { name: "duracaoMedia", label: "Duração media", placeholder: "Ex.: 2h30", required: true },
      { name: "valorReferencia", label: "Valor de referência ou faixa", placeholder: "Ex.: a definir com a coordenação" },
      { name: "certificados", label: "Cursos, certificados ou autorizacoes relevantes", kind: "textarea" as const, placeholder: "Ex.: guia, primeiros socorros, educação ambiental, turismo comunitario." },
      { name: "necessidadesOperacao", label: "O que precisa para operar bem?", kind: "textarea" as const, placeholder: "Ex.: apoio de comunicação, equipamento, transporte, seguro, roteiro impresso." }
    ]
  },
  {
    title: "Autorizacoes e cuidado comunitario",
    description: "Confirma entendimento sobre imagem, moradores, segurança e validação pela coordenação.",
    fields: [
      { name: "aceiteContato", label: "Aceito receber contato da coordenação para validar perfil, roteiro e agenda.", kind: "consent" as const, required: true },
      { name: "aceiteDados", label: "Autorizo o uso dos dados para análise de cadastro, perfil de guia e organização operacional.", kind: "consent" as const, required: true },
      { name: "cienciaValidacao", label: "Estou ciente de que nenhum roteiro será publicado sem validação da coordenação.", kind: "consent" as const, required: true },
      { name: "cuidadoImagem", label: "Comprometo-me a respeitar combinados de imagem, privacidade de moradores e segurança comunitaria.", kind: "consent" as const, required: true },
      { name: "observacoes", label: "Observacoes finais", kind: "textarea" as const, placeholder: "Inclua informações que ajudem a coordenação a analisar o perfil." }
    ]
  }
] satisfies SignupSection[];
