import type { SignupSection } from "@/lib/data/signup-fields";

export const touristSections = [
  {
    title: "Dados do visitante",
    description: "Informações de contato para retorno responsável da equipe Perifa Ecotour.",
    fields: [
      { name: "nomeCompleto", label: "Nome completo", placeholder: "Ex.: Camila Rocha", required: true },
      { name: "email", label: "E-mail", kind: "email" as const, placeholder: "Ex.: visitante@email.com", required: true },
      { name: "telefone", label: "Telefone/WhatsApp", kind: "tel" as const, placeholder: "Ex.: (11) 99999-0000", required: true },
      { name: "cidadeOrigem", label: "Cidade/UF ou pais de origem", placeholder: "Ex.: São Paulo/SP ou Chile", required: true },
      {
        name: "tipoVisitante",
        label: "Perfil de visita",
        kind: "radio" as const,
        options: ["Individual", "Familia", "Escola", "Universidade", "Empresa", "ONG/parceiro", "Agencia/operadora"],
        required: true
      },
      { name: "organizacao", label: "Organização, escola ou grupo", placeholder: "Se houver" }
    ]
  },
  {
    title: "Interesse de roteiro",
    description: "Ajuda a equipe a indicar experiência, guia, duração e preparo adequados.",
    fields: [
      {
        name: "roteiroInteresse",
        label: "Roteiro de interesse",
        kind: "select" as const,
        options: ["Serra da Misericordia", "Vivencia Perifa Ecotour", "Roteiro educativo", "Roteiro personalizado", "Ainda nao sei"],
        required: true
      },
      { name: "dataDesejada", label: "Data desejada", kind: "date" as const, required: true },
      { name: "quantidadePessoas", label: "Quantidade de pessoas", placeholder: "Ex.: 8", required: true },
      { name: "faixaEtaria", label: "Faixa etaria do grupo", placeholder: "Ex.: adultos, jovens, turma de ensino medio" },
      {
        name: "temasInteresse",
        label: "Temas que mais interessam",
        kind: "checkboxGroup" as const,
        options: ["Turismo comunitario", "Educacao ambiental", "Biodiversidade", "Cultura local", "Agenda 2030", "Fotografia", "Historia e memoria", "Empreendedorismo social"],
        required: true
      },
      { name: "objetivoVisita", label: "Objetivo da visita", kind: "textarea" as const, placeholder: "Conte o que espera viver, aprender ou apresentar ao grupo.", required: true }
    ]
  },
  {
    title: "Preparo e cuidados",
    description: "Dados para acolhimento, acessibilidade, segurança e combinados antes da visita.",
    fields: [
      { name: "mobilidade", label: "Ha alguma necessidade de mobilidade ou acessibilidade?", kind: "textarea" as const, placeholder: "Ex.: pessoa idosa, dificuldade em subida, Libras, restrição visual." },
      { name: "restricoes", label: "Restricoes alimentares, de saúde ou cuidados importantes", kind: "textarea" as const, placeholder: "Se houver, descreva para a equipe orientar melhor." },
      {
        name: "experienciaFavela",
        label: "Já participou de roteiro em favela/periferia?",
        kind: "radio" as const,
        options: ["Sim", "Nao", "Ainda nao, mas tenho interesse"],
        required: true
      },
      {
        name: "contatoPreferido",
        label: "Preferencia de contato",
        kind: "checkboxGroup" as const,
        options: ["WhatsApp", "E-mail", "Ligacao"],
        required: true
      },
      { name: "observacoesOperacionais", label: "Observacoes sobre horário, transporte ou expectativa", kind: "textarea" as const, placeholder: "Ex.: horário limite, chegada de van, ponto de encontro desejado." }
    ]
  },
  {
    title: "Consentimentos",
    description: "Confirma contato, tratamento de dados e respeito aos combinados comunitarios.",
    fields: [
      { name: "aceiteContato", label: "Aceito receber contato da equipe Perifa Ecotour para retorno sobre disponibilidade, guia e valores.", kind: "consent" as const, required: true },
      { name: "aceiteDados", label: "Autorizo o uso dos dados para análise do interesse de visita e comunicação operacional.", kind: "consent" as const, required: true },
      { name: "cienciaConfirmacao", label: "Estou ciente de que o envio não confirma reserva; a visita depende de retorno e validação da equipe.", kind: "consent" as const, required: true },
      { name: "respeitoTerritorio", label: "Comprometo-me a respeitar orientações do guia, moradores, imagens e áreas sensíveis do território.", kind: "consent" as const, required: true },
      { name: "mensagemFinal", label: "Mensagem final para a equipe", kind: "textarea" as const, placeholder: "Opcional." }
    ]
  }
] satisfies SignupSection[];
