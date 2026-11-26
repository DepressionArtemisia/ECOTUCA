import type { SignupSection } from "@/lib/data/signup-fields";

export const studentSections = [
  {
    title: "Dados pessoais",
    description: "Informações para contato, reconhecimento e organização da turma.",
    fields: [
      { name: "nomeCompleto", label: "Nome completo", placeholder: "Ex.: Ana Beatriz Santos", required: true },
      { name: "nomeSocial", label: "Nome social", placeholder: "Ex.: Ana B." },
      { name: "comoChamar", label: "Como prefere ser chamado", placeholder: "Ex.: Ana, Biel, Duda" },
      { name: "email", label: "E-mail", kind: "email" as const, placeholder: "Ex.: ana@email.com", required: true },
      { name: "telefone", label: "Telefone/WhatsApp", kind: "tel" as const, placeholder: "Ex.: (21) 99999-0000", required: true },
      { name: "dataNascimento", label: "Data de nascimento", kind: "date" as const, required: true },
      { name: "cidadeUf", label: "Cidade/UF", placeholder: "Ex.: Rio de Janeiro/RJ", required: true },
      { name: "bairro", label: "Bairro/comunidade", placeholder: "Ex.: Complexo do Alemão", required: true },
      {
        name: "vinculoAlemao",
        label: "Mora, estuda, trabalha ou atua no Complexo do Alemão?",
        kind: "radio" as const,
        options: ["Moro", "Estudo", "Trabalho", "Atuo em projeto/coletivo", "Tenho outro vinculo", "Nao tenho vinculo direto"],
        required: true,
        fullWidth: true
      }
    ]
  },
  {
    title: "Interesse e vínculo",
    description: "Ajuda a coordenação a entender motivacao, território e temas de maior interesse.",
    fields: [
      {
        name: "motivacao",
        label: "Por que quer participar da ECOTUCA?",
        kind: "textarea" as const,
        placeholder: "Conte o que você busca aprender, praticar ou transformar no território.",
        required: true
      },
      {
        name: "querSerGuia",
        label: "Tem interesse em ser guia local?",
        kind: "radio" as const,
        options: ["Sim", "Talvez", "Ainda nao sei", "Nao"],
        required: true
      },
      {
        name: "temasInteresse",
        label: "Quais temas interessam?",
        kind: "checkboxGroup" as const,
        options: ["Educacao ambiental", "Turismo comunitario", "Serra da Misericordia", "Agenda 2030", "Empreendedorismo", "Comunicacao", "Cultura local", "Hospitalidade"],
        required: true
      },
      {
        name: "projetoColetivo",
        label: "Participa de algum projeto, escola, coletivo ou organização?",
        kind: "textarea" as const,
        placeholder: "Ex.: escola, coletivo, igreja, ONG, projeto social ou iniciativa local."
      }
    ]
  },
  {
    title: "Formação e disponibilidade",
    description: "Organiza horário, acesso digital e necessidades para permanencia na trilha.",
    fields: [
      {
        name: "escolaridade",
        label: "Escolaridade",
        kind: "select" as const,
        required: true,
        options: ["Ensino fundamental", "Ensino medio", "EJA", "Ensino tecnico", "Ensino superior", "Outro"]
      },
      {
        name: "estudaAtualmente",
        label: "Esta estudando atualmente?",
        kind: "radio" as const,
        required: true,
        options: ["Sim", "Nao", "Pretendo voltar"]
      },
      {
        name: "disponibilidade",
        label: "Disponibilidade",
        kind: "checkboxGroup" as const,
        required: true,
        options: ["Manha", "Tarde", "Noite", "Fins de semana"]
      },
      {
        name: "temCelularInternet",
        label: "Tem celular com internet?",
        kind: "radio" as const,
        required: true,
        options: ["Sim", "As vezes", "Nao"]
      },
      {
        name: "temComputador",
        label: "Tem computador?",
        kind: "radio" as const,
        required: true,
        options: ["Sim", "Compartilhado", "Nao"]
      },
      {
        name: "experienciasPrevias",
        label: "Já participou de trilhas, visitas guiadas, turismo, comunicação ou projeto social?",
        kind: "textarea" as const,
        placeholder: "Ex.: visita guiada na escola, mutirao ambiental, projeto cultural."
      },
      {
        name: "acessibilidade",
        label: "Precisa de recurso de acessibilidade?",
        kind: "textarea" as const,
        placeholder: "Ex.: Libras, letra ampliada, apoio de deslocamento, outro cuidado."
      }
    ]
  },
  {
    title: "Responsável e LGPD",
    description: "Consentimentos de contato, dados e autorizacoes especificas.",
    fields: [
      {
        name: "menorIdade",
        label: "E menor de idade?",
        kind: "radio" as const,
        options: ["Sim", "Nao"],
        required: true
      },
      {
        name: "nomeResponsavel",
        label: "Nome do responsável",
        placeholder: "Ex.: Maria Santos",
        showWhen: { field: "menorIdade", value: "Sim" },
        requiredWhen: { field: "menorIdade", value: "Sim" }
      },
      {
        name: "telefoneResponsavel",
        label: "Telefone do responsável",
        kind: "tel" as const,
        placeholder: "Ex.: (21) 98888-0000",
        showWhen: { field: "menorIdade", value: "Sim" },
        requiredWhen: { field: "menorIdade", value: "Sim" }
      },
      {
        name: "emailResponsavel",
        label: "E-mail do responsável",
        kind: "email" as const,
        placeholder: "Ex.: responsável@email.com",
        showWhen: { field: "menorIdade", value: "Sim" }
      },
      { name: "aceiteContato", label: "Aceito receber contato da coordenação ECOTUCA pelo e-mail ou WhatsApp informado.", kind: "consent" as const, required: true },
      { name: "aceiteDados", label: "Autorizo o tratamento dos dados para análise de cadastro, organização de turmas e comunicação do projeto.", kind: "consent" as const, required: true },
      { name: "aceiteImagem", label: "Autorizo contato posterior para tratar autorizacao de imagem em documento separado.", kind: "consent" as const },
      { name: "cienciaValidacao", label: "Estou ciente de que a participação está sujeita a validação da coordenação.", kind: "consent" as const, required: true }
    ]
  }
] satisfies SignupSection[];
