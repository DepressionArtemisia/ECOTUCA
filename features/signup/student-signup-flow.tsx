import { MultistepSignupFlow } from "@/features/signup/multistep-signup-flow";

const studentSections = [
  {
    title: "Dados pessoais",
    description: "Informacoes para contato, reconhecimento e organizacao da turma.",
    fields: [
      { name: "nomeCompleto", label: "Nome completo", placeholder: "Ex.: Ana Beatriz Santos", required: true },
      { name: "nomeSocial", label: "Nome social", placeholder: "Ex.: Ana B." },
      { name: "comoChamar", label: "Como prefere ser chamado", placeholder: "Ex.: Ana, Biel, Duda" },
      { name: "email", label: "E-mail", kind: "email" as const, placeholder: "Ex.: ana@email.com", required: true },
      { name: "telefone", label: "Telefone/WhatsApp", kind: "tel" as const, placeholder: "Ex.: (21) 99999-0000", required: true },
      { name: "dataNascimento", label: "Data de nascimento", kind: "date" as const, required: true },
      { name: "cidadeUf", label: "Cidade/UF", placeholder: "Ex.: Rio de Janeiro/RJ", required: true },
      { name: "bairro", label: "Bairro/comunidade", placeholder: "Ex.: Complexo do Alemao", required: true },
      {
        name: "vinculoAlemao",
        label: "Mora, estuda, trabalha ou atua no Complexo do Alemao?",
        kind: "radio" as const,
        options: ["Moro", "Estudo", "Trabalho", "Atuo em projeto/coletivo", "Tenho outro vinculo", "Nao tenho vinculo direto"],
        required: true,
        fullWidth: true
      }
    ]
  },
  {
    title: "Interesse e vinculo",
    description: "Ajuda a coordenacao a entender motivacao, territorio e temas de maior interesse.",
    fields: [
      {
        name: "motivacao",
        label: "Por que quer participar da ECOTUCA?",
        kind: "textarea" as const,
        placeholder: "Conte o que voce busca aprender, praticar ou transformar no territorio.",
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
        label: "Participa de algum projeto, escola, coletivo ou organizacao?",
        kind: "textarea" as const,
        placeholder: "Ex.: escola, coletivo, igreja, ONG, projeto social ou iniciativa local."
      }
    ]
  },
  {
    title: "Formacao e disponibilidade",
    description: "Organiza horario, acesso digital e necessidades para permanencia na trilha.",
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
        label: "Ja participou de trilhas, visitas guiadas, turismo, comunicacao ou projeto social?",
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
    title: "Responsavel e LGPD",
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
        label: "Nome do responsavel",
        placeholder: "Ex.: Maria Santos",
        showWhen: { field: "menorIdade", value: "Sim" },
        requiredWhen: { field: "menorIdade", value: "Sim" }
      },
      {
        name: "telefoneResponsavel",
        label: "Telefone do responsavel",
        kind: "tel" as const,
        placeholder: "Ex.: (21) 98888-0000",
        showWhen: { field: "menorIdade", value: "Sim" },
        requiredWhen: { field: "menorIdade", value: "Sim" }
      },
      {
        name: "emailResponsavel",
        label: "E-mail do responsavel",
        kind: "email" as const,
        placeholder: "Ex.: responsavel@email.com",
        showWhen: { field: "menorIdade", value: "Sim" }
      },
      { name: "aceiteContato", label: "Aceito receber contato da coordenacao ECOTUCA pelo e-mail ou WhatsApp informado.", kind: "consent" as const, required: true },
      { name: "aceiteDados", label: "Autorizo o tratamento dos dados para analise de cadastro, organizacao de turmas e comunicacao do projeto.", kind: "consent" as const, required: true },
      { name: "aceiteImagem", label: "Autorizo contato posterior para tratar autorizacao de imagem em documento separado.", kind: "consent" as const },
      { name: "cienciaValidacao", label: "Estou ciente de que a participacao esta sujeita a validacao da coordenacao.", kind: "consent" as const, required: true }
    ]
  }
];

export function StudentSignupFlow() {
  return (
    <MultistepSignupFlow
      title="Cadastro de aluno"
      eyebrow="Jornada do aluno"
      description="Para jovens do territorio em formacao, com trilhas, aulas, certificados, comunidade e possibilidade futura de atuacao como guia local."
      storageKey="ecotuca:signup:student"
      sections={studentSections}
      asideTitle="Jornada do aluno"
      asideItems={[
        "Cadastro recebido pela coordenacao.",
        "Validacao de perfil e disponibilidade.",
        "Entrada em trilhas, aulas e comunidade.",
        "Evolucao para certificados e praticas no territorio.",
        "Possivel atuacao como guia apos formacao e validacao."
      ]}
      analysisTitle="Depois do envio"
      analysisDescription="A coordenacao ECOTUCA analisa vinculo, disponibilidade, idade, consentimentos e necessidades de apoio antes de liberar a participacao."
      submitLabel="Enviar cadastro"
      successMessage="Cadastro recebido. A coordenacao ECOTUCA ira analisar as informacoes e retornar pelo contato informado."
    />
  );
}
