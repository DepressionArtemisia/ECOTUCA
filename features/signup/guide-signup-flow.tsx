import { MultistepSignupFlow } from "@/features/signup/multistep-signup-flow";

const guideSections = [
  {
    title: "Identificacao territorial",
    description: "Dados basicos para reconhecer o guia, o vinculo com o territorio e os contatos principais.",
    fields: [
      { name: "nomeCompleto", label: "Nome completo", placeholder: "Ex.: Joao Pedro Silva", required: true },
      { name: "nomePublico", label: "Nome publico ou apelido de guia", placeholder: "Ex.: JP da Serra" },
      { name: "email", label: "E-mail", kind: "email" as const, placeholder: "Ex.: guia@email.com", required: true },
      { name: "telefone", label: "Telefone/WhatsApp", kind: "tel" as const, placeholder: "Ex.: (21) 98888-0000", required: true },
      { name: "cidadeUf", label: "Cidade/UF", placeholder: "Ex.: Rio de Janeiro/RJ", required: true },
      { name: "bairroBase", label: "Bairro/comunidade de base", placeholder: "Ex.: Complexo do Alemao", required: true },
      {
        name: "vinculoTerritorial",
        label: "Qual e o seu vinculo com o territorio?",
        kind: "radio" as const,
        options: ["Moro", "Trabalho", "Atuo em projeto/coletivo", "Sou guia formado", "Tenho outro vinculo"],
        required: true
      },
      { name: "miniBio", label: "Mini bio territorial", kind: "textarea" as const, placeholder: "Conte sua trajetoria, relacao com o territorio e experiencia com visitantes.", required: true }
    ]
  },
  {
    title: "Roteiros e especialidades",
    description: "Organiza temas, narrativas e tipos de experiencia que podem entrar na vitrine Perifa Ecotour.",
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
      { name: "roteiroPrincipal", label: "Roteiro principal que gostaria de cadastrar", kind: "textarea" as const, placeholder: "Nome, duracao, narrativa e pontos importantes.", required: true },
      { name: "limitesSeguranca", label: "Limites, riscos ou combinados de seguranca", kind: "textarea" as const, placeholder: "Ex.: dias melhores, pontos sensiveis, tamanho maximo de grupo.", required: true },
      { name: "publicoPreferido", label: "Publico preferido", kind: "checkboxGroup" as const, options: ["Escolas", "Universidades", "Turistas", "Empresas", "Pesquisadores", "Moradores", "Parceiros sociais"], required: true }
    ]
  },
  {
    title: "Operacao e disponibilidade",
    description: "Apoia agenda, idiomas, preco de referencia e preparo operacional antes de publicar qualquer experiencia.",
    fields: [
      { name: "disponibilidade", label: "Disponibilidade", kind: "checkboxGroup" as const, required: true, options: ["Manha", "Tarde", "Noite", "Fins de semana", "Datas sob combinacao"] },
      { name: "idiomas", label: "Idiomas", kind: "checkboxGroup" as const, options: ["Portugues", "Ingles", "Espanhol", "Frances", "Outro"], required: true },
      { name: "tamanhoGrupo", label: "Tamanho de grupo recomendado", placeholder: "Ex.: ate 12 pessoas", required: true },
      { name: "duracaoMedia", label: "Duracao media", placeholder: "Ex.: 2h30", required: true },
      { name: "valorReferencia", label: "Valor de referencia ou faixa", placeholder: "Ex.: a definir com a coordenacao" },
      { name: "certificados", label: "Cursos, certificados ou autorizacoes relevantes", kind: "textarea" as const, placeholder: "Ex.: guia, primeiros socorros, educacao ambiental, turismo comunitario." },
      { name: "necessidadesOperacao", label: "O que precisa para operar bem?", kind: "textarea" as const, placeholder: "Ex.: apoio de comunicacao, equipamento, transporte, seguro, roteiro impresso." }
    ]
  },
  {
    title: "Autorizacoes e cuidado comunitario",
    description: "Confirma entendimento sobre imagem, moradores, seguranca e validacao pela coordenacao.",
    fields: [
      { name: "aceiteContato", label: "Aceito receber contato da coordenacao para validar perfil, roteiro e agenda.", kind: "consent" as const, required: true },
      { name: "aceiteDados", label: "Autorizo o uso dos dados para analise de cadastro, perfil de guia e organizacao operacional.", kind: "consent" as const, required: true },
      { name: "cienciaValidacao", label: "Estou ciente de que nenhum roteiro sera publicado sem validacao da coordenacao.", kind: "consent" as const, required: true },
      { name: "cuidadoImagem", label: "Comprometo-me a respeitar combinados de imagem, privacidade de moradores e seguranca comunitaria.", kind: "consent" as const, required: true },
      { name: "observacoes", label: "Observacoes finais", kind: "textarea" as const, placeholder: "Inclua informacoes que ajudem a coordenacao a analisar o perfil." }
    ]
  }
];

export function GuideSignupFlow() {
  return (
    <MultistepSignupFlow
      title="Cadastro de guia"
      eyebrow="Guia territorial"
      description="Para condutores, especialistas locais e jovens em formacao que querem organizar perfil, agenda, especialidades e roteiros responsaveis."
      storageKey="ecotuca:signup:guide"
      sections={guideSections}
      asideTitle="Perfil de guia"
      asideItems={[
        "Perfil analisado pela coordenacao Perifa Ecotour.",
        "Roteiros precisam de narrativa, seguranca e combinados territoriais.",
        "Agenda, valores e grupos sao validados antes de publicar.",
        "Imagem de moradores e pontos sensiveis exige cuidado comunitario.",
        "Acesso completo depende de aprovacao."
      ]}
      analysisTitle="Como entra na vitrine"
      analysisDescription="A coordenacao revisa vinculo territorial, experiencia, disponibilidade, riscos e roteiro proposto antes de liberar perfil ou experiencia na plataforma."
      submitLabel="Enviar perfil de guia"
      successMessage="Perfil recebido. A coordenacao ira validar dados, roteiro, agenda e combinados antes de liberar qualquer publicacao."
    />
  );
}
