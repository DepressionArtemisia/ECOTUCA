import type { DemoUser, Guide, LearningTrack, Metric, TourRoute } from "@/types/domain";

export const demoUsers: DemoUser[] = [
  {
    name: "Coordenacao ECOTUCA",
    email: "admin@ecotuca.local",
    password: "Demo@123456",
    role: "admin",
    status: "approved",
    highlight: "Aprova cadastros, monitora impacto e exporta relatorios."
  },
  {
    name: "Bruno Copque",
    email: "bruno@ecotuca.local",
    password: "Demo@123456",
    role: "super_admin",
    status: "approved",
    highlight: "Controle tecnico e operacional completo."
  },
  {
    name: "Prof. Mariana Costa",
    email: "professora@ecotuca.local",
    password: "Demo@123456",
    role: "teacher",
    status: "approved",
    highlight: "Acompanha turmas, publica materiais e responde a comunidade."
  },
  {
    name: "Lucas Oliveira",
    email: "aluno@ecotuca.local",
    password: "Demo@123456",
    role: "student",
    status: "approved",
    highlight: "Mostra trilhas, progresso, videoaula e certificados."
  },
  {
    name: "Ana Beatriz Santos",
    email: "pendente@ecotuca.local",
    password: "Demo@123456",
    role: "student",
    status: "pending",
    highlight: "Exibe estado de cadastro aguardando aprovacao."
  },
  {
    name: "Rafael Silva",
    email: "guia@ecotuca.local",
    password: "Demo@123456",
    role: "guide",
    status: "approved",
    highlight: "Perfil publico, especialidades e agenda simulada."
  },
  {
    name: "Camila Ferreira",
    email: "turista@ecotuca.local",
    password: "Demo@123456",
    role: "tourist",
    status: "approved",
    highlight: "Favoritos, interesse em roteiros e historico de reservas."
  }
];

export const guides: Guide[] = [
  {
    id: "rafael-silva",
    name: "Rafael Silva",
    email: "guia@ecotuca.local",
    bio: "Jovem guia em formacao, morador do Complexo do Alemao, com foco em biodiversidade, memoria local e educacao ambiental.",
    specialties: ["Serra da Misericordia", "Biodiversidade", "Memoria do territorio"],
    languages: ["Portugues", "Espanhol basico"],
    rating: 4.9,
    avatar: "/brand/symbol-perifa.png",
    certificates: ["Guia Local ECOTUCA", "Agenda 2030 aplicada", "Primeiros cuidados em trilha"]
  },
  {
    id: "mariana-costa",
    name: "Mariana Costa",
    email: "professora@ecotuca.local",
    bio: "Educadora ambiental e facilitadora das trilhas de Agenda 2030 e empreendedorismo comunitario.",
    specialties: ["Agenda 2030", "Educacao ambiental", "Formacao de jovens"],
    languages: ["Portugues"],
    rating: 4.8,
    avatar: "/brand/symbol-ecotuca.png",
    certificates: ["Educacao socioambiental", "Metodologias participativas"]
  }
];

export const tourRoutes: TourRoute[] = [
  {
    id: "route-01",
    slug: "serra-da-misericordia",
    title: "Serra da Misericordia",
    shortDescription: "Trilha de natureza, memoria e leitura ambiental no coracao da zona norte.",
    description:
      "Uma vivencia territorial que conecta biodiversidade, historia local, mirantes e educacao ambiental. O roteiro valoriza a Serra da Misericordia como patrimonio vivo e espaco de formacao para jovens guias.",
    location: "Complexo do Alemao, Rio de Janeiro",
    meetingPoint: "Base Perifa Ecotour - ponto a confirmar na vespera",
    durationMinutes: 180,
    difficulty: "moderada",
    price: 85,
    maxPeople: 12,
    coverUrl: "/mock/route-serra.png",
    galleryUrls: ["/mock/route-serra.png", "/mock/route-verde.png"],
    guideId: "rafael-silva",
    featured: true,
    tags: ["biodiversidade", "mirante", "territorio"],
    includedItems: ["Guia local", "Seguro simulado", "Material educativo digital"],
    recommendations: ["Levar agua", "Usar tenis fechado", "Protetor solar", "Chegar 15 min antes"],
    accessibility: "Trechos de subida e solo irregular; roteiro adaptavel sob consulta.",
    bestTime: "Manha, entre 8h e 11h",
    safetyNotes: "Grupo acompanhado por guia local e pontos de parada definidos."
  },
  {
    id: "route-02",
    slug: "caminho-verde-do-alemao",
    title: "Caminho Verde do Alemao",
    shortDescription: "Percurso leve sobre hortas, pracas, educacao ambiental e cidade viva.",
    description:
      "Roteiro de caminhada urbana que evidencia praticas sustentaveis, jardins comunitarios, memorias e solucoes de cuidado ambiental no territorio.",
    location: "Complexo do Alemao",
    meetingPoint: "Entrada da estacao local indicada pela coordenacao",
    durationMinutes: 120,
    difficulty: "leve",
    price: 65,
    maxPeople: 15,
    coverUrl: "/mock/route-verde.png",
    galleryUrls: ["/mock/route-verde.png"],
    guideId: "rafael-silva",
    featured: true,
    tags: ["urbano", "sustentabilidade", "familia"],
    includedItems: ["Guia local", "Mapa digital", "Roda de conversa"],
    recommendations: ["Levar garrafa reutilizavel", "Roupa confortavel"],
    accessibility: "Percurso com trechos urbanos, ideal para grupos escolares.",
    bestTime: "Tarde, entre 14h e 16h",
    safetyNotes: "Confirmacao de clima e ponto de encontro antes da saida."
  },
  {
    id: "route-03",
    slug: "mirantes-e-memorias-do-complexo",
    title: "Mirantes e Memorias do Complexo",
    shortDescription: "Paisagem, pertencimento e narrativas locais em uma caminhada guiada.",
    description:
      "Uma experiencia para observar a cidade a partir do territorio, valorizando memoria social, pertencimento e perspectivas de desenvolvimento local.",
    location: "Complexo do Alemao",
    meetingPoint: "Ponto cultural parceiro",
    durationMinutes: 150,
    difficulty: "moderada",
    price: 75,
    maxPeople: 10,
    coverUrl: "/mock/route-mirantes.png",
    galleryUrls: ["/mock/route-mirantes.png"],
    guideId: "rafael-silva",
    featured: false,
    tags: ["memoria", "fotografia", "mirantes"],
    includedItems: ["Guia local", "Paradas interpretativas", "Indicacoes culturais"],
    recommendations: ["Camera ou celular carregado", "Calcado confortavel"],
    accessibility: "Alguns aclives; nao recomendado para mobilidade reduzida sem adaptacao.",
    bestTime: "Fim de tarde",
    safetyNotes: "Roteiro depende de avaliacao previa do percurso."
  },
  {
    id: "route-04",
    slug: "trilha-cultura-natureza-pertencimento",
    title: "Trilha Cultura, Natureza e Pertencimento",
    shortDescription: "Vivencia que mistura ecologia, arte, juventude e identidade local.",
    description:
      "Roteiro imersivo para grupos interessados em cultura periferica, educacao ambiental e conexao com iniciativas locais de juventude.",
    location: "Complexo do Alemao",
    meetingPoint: "Sede parceira Favela Art",
    durationMinutes: 210,
    difficulty: "moderada",
    price: 95,
    maxPeople: 14,
    coverUrl: "/mock/route-cultura.png",
    galleryUrls: ["/mock/route-cultura.png"],
    guideId: "mariana-costa",
    featured: false,
    tags: ["cultura", "natureza", "educacao"],
    includedItems: ["Guia", "Roda educativa", "Material digital"],
    recommendations: ["Levar agua", "Autorizacao para menores em grupos escolares"],
    accessibility: "Pode ser adaptado para versao mais curta.",
    bestTime: "Manha",
    safetyNotes: "Agenda confirmada com parceiros locais."
  },
  {
    id: "route-05",
    slug: "roteiro-juventude-natureza-favela",
    title: "Roteiro Juventude, Natureza e Favela",
    shortDescription: "O territorio apresentado por jovens protagonistas.",
    description:
      "Experiencia focada na formacao de jovens guias, com narrativa de futuro, ODS, renda local e valorizacao ambiental.",
    location: "Complexo do Alemao",
    meetingPoint: "Base ECOTUCA",
    durationMinutes: 160,
    difficulty: "leve",
    price: 70,
    maxPeople: 12,
    coverUrl: "/mock/route-juventude.png",
    galleryUrls: ["/mock/route-juventude.png"],
    guideId: "rafael-silva",
    featured: false,
    tags: ["juventude", "ods", "renda"],
    includedItems: ["Guia jovem", "Material ODS", "Registro de participacao"],
    recommendations: ["Perguntas bem-vindas", "Evitar lixo descartavel"],
    accessibility: "Trechos planejados para grupos mistos.",
    bestTime: "Manha ou tarde",
    safetyNotes: "Monitoria do projeto durante toda a vivencia."
  },
  {
    id: "route-06",
    slug: "vivencia-perifa-ecotour",
    title: "Vivencia Perifa Ecotour",
    shortDescription: "Experiencia premium de ecoturismo comunitario e aprendizagem territorial.",
    description:
      "Uma vivencia completa que apresenta a proposta Perifa Ecotour, seus guias, os percursos possiveis e a ponte entre formacao, renda e impacto.",
    location: "Complexo do Alemao",
    meetingPoint: "Ponto combinado com o grupo",
    durationMinutes: 240,
    difficulty: "leve",
    price: 120,
    maxPeople: 20,
    coverUrl: "/mock/route-perifa.png",
    galleryUrls: ["/mock/route-perifa.png"],
    guideId: "mariana-costa",
    featured: true,
    tags: ["premium", "grupo", "impacto"],
    includedItems: ["Curadoria", "Guia local", "Relato de impacto", "Material digital"],
    recommendations: ["Ideal para universidades e apoiadores", "Agendar com antecedencia"],
    accessibility: "Formato customizavel conforme grupo.",
    bestTime: "Sob agenda",
    safetyNotes: "Planejamento com coordenacao e guias certificados."
  }
];

export const learningTracks: LearningTrack[] = [
  {
    id: "guia-local",
    title: "Formacao de Guia Local",
    description: "Condução segura, leitura do território, hospitalidade e narrativa de pertencimento.",
    category: "Ecoturismo",
    difficulty: "Intermediario",
    estimatedHours: 18,
    progressPercent: 64,
    accent: "yellow",
    lessons: [
      {
        id: "aula-guia-01",
        title: "Como contar o territorio com seguranca",
        description: "Primeiros passos para conduzir visitantes com cuidado, contexto e orgulho local.",
        videoId: "ScMzIvxBSi4",
        durationMinutes: 18,
        progressPercent: 72,
        status: "in_progress",
        supportText: "Roteirize paradas, combine regras do grupo e valorize memorias locais."
      },
      {
        id: "aula-guia-02",
        title: "Hospitalidade e experiencia do visitante",
        description: "Como receber turistas sem perder a identidade do território.",
        videoId: "ysz5S6PUM-U",
        durationMinutes: 14,
        progressPercent: 100,
        status: "completed",
        supportText: "Acolhimento, clareza e combinados simples criam confiança."
      },
      {
        id: "aula-guia-03",
        title: "Roteiro pratico e pontos de parada",
        description: "Como organizar tempo, seguranca e narrativa em cada ponto do percurso.",
        videoId: "ScMzIvxBSi4",
        durationMinutes: 22,
        progressPercent: 0,
        status: "not_started",
        supportText: "Desenhe uma rota com inicio, pausas, risco, historia e fechamento."
      }
    ]
  },
  {
    id: "meio-ambiente",
    title: "Meio Ambiente e Biodiversidade",
    description: "Ecologia urbana, Serra da Misericordia, residuos, agua e cuidados de trilha.",
    category: "Ambiental",
    difficulty: "Basico",
    estimatedHours: 14,
    progressPercent: 42,
    accent: "mint",
    lessons: [
      {
        id: "aula-bio-01",
        title: "Biodiversidade que mora perto",
        description: "Reconhecendo espécies, paisagens e riscos ambientais no território.",
        videoId: "ScMzIvxBSi4",
        durationMinutes: 16,
        progressPercent: 35,
        status: "in_progress",
        supportText: "Observe sem retirar, fotografe com cuidado e registre pontos de interesse."
      },
      {
        id: "aula-bio-02",
        title: "Residuos, agua e cuidado em trilha",
        description: "Boas praticas para reduzir impacto e orientar visitantes.",
        videoId: "ysz5S6PUM-U",
        durationMinutes: 17,
        progressPercent: 0,
        status: "not_started",
        supportText: "Planeje descarte, hidratação, sombra e comunicação antes da saída."
      }
    ]
  },
  {
    id: "agenda-2030",
    title: "Agenda 2030 e Empreendedorismo",
    description: "ODS, renda local, turismo responsavel e prestação de contas de impacto.",
    category: "Impacto",
    difficulty: "Intermediario",
    estimatedHours: 16,
    progressPercent: 28,
    accent: "orange",
    lessons: [
      {
        id: "aula-ods-01",
        title: "ODS na pratica do ecoturismo",
        description: "Como transformar uma rota em indicador de impacto social e ambiental.",
        videoId: "ysz5S6PUM-U",
        durationMinutes: 20,
        progressPercent: 15,
        status: "in_progress",
        supportText: "Cada roteiro pode gerar evidencias de renda, formação, cuidado e pertencimento."
      },
      {
        id: "aula-ods-02",
        title: "Precificacao e renda local",
        description: "Como pensar valor, custos, agenda e sustentabilidade financeira do roteiro.",
        videoId: "ScMzIvxBSi4",
        durationMinutes: 19,
        progressPercent: 0,
        status: "not_started",
        supportText: "Preco precisa comunicar cuidado, tempo, preparo e retorno para o territorio."
      }
    ]
  }
];

export const adminMetrics: Metric[] = [
  { label: "Jovens inscritos", value: "128", detail: "+24 nesta semana", tone: "yellow" },
  { label: "Cadastros pendentes", value: "17", detail: "fila da coordenacao", tone: "coral" },
  { label: "Trilhas ativas", value: "3", detail: "formacao em andamento", tone: "blue" },
  { label: "Aulas concluidas", value: "842", detail: "64% da trilha principal", tone: "mint" },
  { label: "Guias em formacao", value: "42", detail: "12 quase certificados", tone: "orange" },
  { label: "Roteiros publicados", value: "6", detail: "3 em destaque", tone: "orange" },
  { label: "Leads de turistas", value: "31", detail: "mock/localStorage", tone: "coral" },
  { label: "Certificados emitidos", value: "18", detail: "simulados", tone: "yellow" },
  { label: "Taxa de conclusao", value: "68%", detail: "trilha Guia Local", tone: "mint" },
  { label: "Horas estudadas", value: "1.340h", detail: "dados simulados", tone: "blue" },
  { label: "Potencial de renda", value: "R$ 9,8k", detail: "por solicitacoes", tone: "mint" }
];

export const notices = [
  "Nova turma de Guia Local começa em breve",
  "Material sobre Agenda 2030 disponível",
  "Roteiro Serra da Misericórdia atualizado",
  "Parabens! Voce concluiu 60% da trilha Formacao de Guia Local"
];

export const forumTopics = [
  {
    title: "Como explicar a Serra da Misericordia para visitantes?",
    category: "Trilhas e natureza",
    replies: 8,
    author: "Lucas Oliveira"
  },
  {
    title: "Dicas para conectar ODS com roteiros reais",
    category: "Agenda 2030",
    replies: 5,
    author: "Prof. Mariana Costa"
  },
  {
    title: "Oportunidades de visita monitorada em julho",
    category: "Oportunidades",
    replies: 3,
    author: "Coordenacao ECOTUCA"
  }
];

export const impactChartData = [
  { month: "Jan", alunos: 28, aulas: 110, roteiros: 2 },
  { month: "Fev", alunos: 44, aulas: 180, roteiros: 2 },
  { month: "Mar", alunos: 73, aulas: 330, roteiros: 4 },
  { month: "Abr", alunos: 96, aulas: 560, roteiros: 5 },
  { month: "Mai", alunos: 128, aulas: 842, roteiros: 6 }
];

export const completionByTrack = [
  { name: "Guia Local", concluidas: 68, andamento: 24 },
  { name: "Biodiversidade", concluidas: 42, andamento: 38 },
  { name: "Agenda 2030", concluidas: 31, andamento: 44 }
];

export const bookingChartData = [
  { week: "S1", solicitacoes: 4 },
  { week: "S2", solicitacoes: 7 },
  { week: "S3", solicitacoes: 9 },
  { week: "S4", solicitacoes: 11 }
];

export const recentActivities = [
  "Lucas retomou a aula Como contar o territorio",
  "Ana Beatriz enviou cadastro para aprovacao",
  "Rafael recebeu interesse para Serra da Misericordia",
  "Prof. Mariana publicou material de Agenda 2030"
];

export const studentJourney = [
  { label: "Cadastro aprovado", status: "done" },
  { label: "Primeira aula", status: "done" },
  { label: "Trilha em andamento", status: "active" },
  { label: "Aula pratica", status: "next" },
  { label: "Certificacao", status: "locked" },
  { label: "Perfil de guia", status: "locked" },
  { label: "Roteiro publicado", status: "locked" }
];
