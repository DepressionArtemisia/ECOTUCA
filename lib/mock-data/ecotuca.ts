import type {
  AdminReportRow,
  AdminReportSnapshot,
  ContentReviewItem,
  DemoUser,
  Guide,
  LearningTrack,
  Metric,
  StudentActivity,
  TeacherEvaluation,
  TourRoute
} from "@/types/domain";

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
    highlight: "Perfil publico, especialidades e agenda em validacao."
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
    title: "Serra da Misericordia - Natureza e Memoria",
    subtitle: "Biodiversidade, educacao ambiental e leitura do territorio.",
    shortDescription: "Roteiro demonstrativo sobre biodiversidade, mirantes, memoria local e cuidado ambiental.",
    description:
      "Uma vivencia territorial que conecta biodiversidade, historia local, mirantes e educacao ambiental sem prometer operacao final antes da validacao comunitaria.",
    longDescription:
      "A Serra da Misericordia aparece na narrativa ECOTUCA como patrimonio vivo da Zona Norte: natureza urbana, memoria de luta ambiental, possibilidades de caminhada educativa e protagonismo de jovens guias. O roteiro e uma proposta de demonstracao para mostrar como o app pode organizar formacao, hospitalidade, preparo do visitante e prestacao de contas antes de publicar uma rota definitiva.",
    location: "Complexo do Alemao, Rio de Janeiro",
    meetingPoint: "Ponto de recepcao confirmado pela equipe antes da visita",
    finalMeetingPointNote: "Ponto final confirmado pela equipe e pelos guias responsaveis.",
    durationMinutes: 180,
    difficulty: "moderada",
    price: 85,
    maxPeople: 12,
    coverUrl: "/media/territory/complexo-alemao/complexo-alemao-panorama-acediscovery-cc-by-4.jpg",
    coverAlt: "Vista ampla do Complexo do Alemao com morros e paisagem urbana da Zona Norte",
    galleryUrls: [
      "/media/territory/complexo-alemao/complexo-alemao-panorama-acediscovery-cc-by-4.jpg",
      "/media/territory/complexo-alemao/visao-do-complexo-thirson-cc-by-sa-4.jpg",
      "/media/territory/penha/panorama-zona-norte-igreja-penha-adam-jones-cc-by-sa-2.jpg"
    ],
    mediaAssetIds: ["complexo-alemao-panorama", "visao-do-complexo", "panorama-zona-norte-penha"],
    guideId: "rafael-silva",
    featured: true,
    tags: ["biodiversidade", "mirante", "territorio", "validacao comunitaria"],
    validationStatus: "precisa-validacao",
    validationNote: "Roteiro em validacao comunitaria. Operacao final depende de agenda, percurso e aprovacao local.",
    whyItMatters:
      "Mostra que a formacao de guias pode transformar a Serra da Misericordia em sala de aula viva, valorizando Mata Atlantica remanescente, historia local e renda responsavel.",
    visitorExperience: ["Leitura ambiental do territorio", "Mirantes e fotografia com contexto", "Conversa sobre preservacao", "Roda de fechamento com aprendizados"],
    includedItems: ["Guia local em formacao ECOTUCA", "Material educativo digital", "Orientacoes de seguranca confirmadas pela equipe antes da visita"],
    recommendations: ["Levar agua", "Usar tenis fechado", "Protetor solar", "Chegar 15 min antes", "Evitar lixo descartavel"],
    careNotes: ["Nao publicar ponto sensivel sem validacao", "Confirmar clima e condicoes do percurso", "Respeitar moradores e espacos comunitarios"],
    accessibility: "Trechos de subida e solo irregular; pode exigir versao adaptada sob consulta.",
    bestTime: "Manha, entre 8h e 11h",
    safetyNotes: "Orientacoes de seguranca confirmadas pela equipe antes da visita."
  },
  {
    id: "route-02",
    slug: "caminho-verde-do-alemao",
    title: "Caminhos do Alemao - Territorio e Pertencimento",
    subtitle: "Caminhada guiada sobre memoria, cotidiano e transformacao social.",
    shortDescription: "Percurso demonstrativo para apresentar o territorio por narrativas locais, cultura e educacao.",
    description:
      "Caminhada urbana pensada para apresentar pertencimento, vida comunitaria, cultura periferica e praticas sustentaveis com cuidado etico.",
    longDescription:
      "Este roteiro demonstra como a Perifa Ecotour pode organizar visitas respeitosas em que moradores e guias formados contam a propria historia. A experiencia evita olhar exotizante e prioriza memoria, hospitalidade, educacao ambiental e combinados claros com a comunidade.",
    location: "Complexo do Alemao",
    meetingPoint: "Ponto publico de recepcao definido pela coordenacao",
    finalMeetingPointNote: "Ponto final confirmado pela equipe antes de cada saida.",
    durationMinutes: 120,
    difficulty: "leve",
    price: 65,
    maxPeople: 15,
    coverUrl: "/media/territory/complexo-alemao/visao-do-complexo-thirson-cc-by-sa-4.jpg",
    coverAlt: "Vista urbana do Complexo do Alemao usada como referencia territorial do roteiro",
    galleryUrls: [
      "/media/territory/complexo-alemao/visao-do-complexo-thirson-cc-by-sa-4.jpg",
      "/media/territory/complexo-alemao/complexo-alemao-olimore-public-domain.jpg",
      "/media/territory/complexo-alemao/complexo-alemao-panorama-acediscovery-cc-by-4.jpg"
    ],
    mediaAssetIds: ["visao-do-complexo", "complexo-alemao-public-domain", "complexo-alemao-panorama"],
    guideId: "rafael-silva",
    featured: true,
    tags: ["urbano", "pertencimento", "cultura", "hospitalidade"],
    validationStatus: "demonstrativo",
    validationNote: "Roteiro demonstrativo; pontos reais precisam ser definidos com parceiros locais.",
    whyItMatters:
      "Fortalece o protagonismo local ao substituir a logica de favela como espetaculo por uma experiencia de escuta, respeito e aprendizado.",
    visitorExperience: ["Recepcao por guia local", "Paradas interpretativas", "Leitura de paisagem urbana", "Conversa sobre cultura e futuro do territorio"],
    includedItems: ["Guia local", "Mapa digital", "Roda de conversa", "Orientacoes de hospitalidade responsavel"],
    recommendations: ["Levar garrafa reutilizavel", "Roupa confortavel", "Celular carregado", "Escuta respeitosa durante as paradas"],
    careNotes: ["Nao fotografar moradores sem autorizacao", "Evitar geolocalizacao de pontos sensiveis", "Publicar apenas percursos validados"],
    accessibility: "Percurso com trechos urbanos, ideal para grupos escolares.",
    bestTime: "Tarde, entre 14h e 16h",
    safetyNotes: "Orientacoes de seguranca confirmadas pela equipe antes da visita."
  },
  {
    id: "route-03",
    slug: "mirantes-e-memorias-do-complexo",
    title: "Mirantes da Penha e do Alemao",
    subtitle: "Paisagem, fotografia e relacao visual com a Igreja da Penha.",
    shortDescription: "Experiencia demonstrativa de paisagem, fotografia e leitura urbana entre Penha e Alemao.",
    description:
      "Uma experiencia para observar a cidade a partir do territorio, valorizando paisagem, memoria social e relacao visual com a Igreja da Penha.",
    longDescription:
      "O roteiro apresenta a Zona Norte como paisagem viva. A partir de imagens panoramicas e pontos de mirante a validar, a proposta conecta fotografia, memoria, mobilidade, turismo comunitario e educacao patrimonial.",
    location: "Complexo do Alemao e Penha",
    meetingPoint: "Ponto publico de facil acesso definido pela equipe",
    finalMeetingPointNote: "Ponto final confirmado conforme agenda, clima e validacao local.",
    durationMinutes: 150,
    difficulty: "moderada",
    price: 75,
    maxPeople: 10,
    coverUrl: "/media/territory/penha/panorama-zona-norte-igreja-penha-adam-jones-cc-by-sa-2.jpg",
    coverAlt: "Panorama da Zona Norte visto da Igreja da Penha",
    galleryUrls: [
      "/media/territory/penha/panorama-zona-norte-igreja-penha-adam-jones-cc-by-sa-2.jpg",
      "/media/territory/penha/igreja-da-penha-wilfredor-cc0.jpg",
      "/media/territory/complexo-alemao/complexo-alemao-panorama-acediscovery-cc-by-4.jpg"
    ],
    mediaAssetIds: ["panorama-zona-norte-penha", "igreja-da-penha", "complexo-alemao-panorama"],
    guideId: "rafael-silva",
    featured: false,
    tags: ["memoria", "fotografia", "mirantes", "penha"],
    validationStatus: "precisa-validacao",
    validationNote: "Pontos de mirante dependem de validacao local e operacao segura.",
    whyItMatters:
      "Ajuda visitantes a entenderem o Complexo do Alemao dentro da Zona Norte, sem reduzir o territorio a uma unica narrativa.",
    visitorExperience: ["Fotografia de paisagem", "Leitura urbana com guia", "Referencia visual da Igreja da Penha", "Conversa sobre memoria e mobilidade"],
    includedItems: ["Guia local", "Paradas interpretativas", "Indicacoes culturais", "Orientacao de fotografia responsavel"],
    recommendations: ["Camera ou celular carregado", "Calcado confortavel", "Evitar fotos de rosto sem consentimento"],
    careNotes: ["Nao prometer acesso a mirantes sem confirmacao", "Checar clima e luz", "Evitar divulgacao de caminhos sensiveis"],
    accessibility: "Alguns aclives; nao recomendado para mobilidade reduzida sem adaptacao.",
    bestTime: "Fim de tarde",
    safetyNotes: "Roteiro depende de avaliacao previa do percurso e confirmacao da equipe."
  },
  {
    id: "route-04",
    slug: "trilha-cultura-natureza-pertencimento",
    title: "Rota Juventude Guia Local",
    subtitle: "Alunos formados apresentando pontos de aprendizagem e hospitalidade.",
    shortDescription: "Vivencia demonstrativa conduzida por jovens em formacao, com foco em aprendizagem aplicada.",
    description:
      "Roteiro imersivo para grupos interessados em juventude, formacao, cultura periferica e educacao ambiental aplicada.",
    longDescription:
      "A Rota Juventude Guia Local mostra o coracao pedagogico da ECOTUCA: jovens aprendem, praticam narrativa, acolhem visitantes e constroem portifolio profissional com cuidado. E uma experiencia demonstrativa para parceiros, escolas e apoiadores.",
    location: "Complexo do Alemao",
    meetingPoint: "Ponto educacional parceiro a confirmar",
    finalMeetingPointNote: "Ponto final confirmado pela coordenacao pedagogica.",
    durationMinutes: 210,
    difficulty: "moderada",
    price: 95,
    maxPeople: 14,
    coverUrl: "/media/territory/complexo-alemao/complexo-alemao-olimore-public-domain.jpg",
    coverAlt: "Vista do Complexo do Alemao usada como base territorial para roteiro de juventude",
    galleryUrls: [
      "/media/territory/complexo-alemao/complexo-alemao-olimore-public-domain.jpg",
      "/media/territory/complexo-alemao/visao-do-complexo-thirson-cc-by-sa-4.jpg",
      "/media/territory/penha/igreja-da-penha-wilfredor-cc0.jpg"
    ],
    mediaAssetIds: ["complexo-alemao-public-domain", "visao-do-complexo", "igreja-da-penha"],
    guideId: "mariana-costa",
    featured: false,
    tags: ["juventude", "formacao", "hospitalidade", "educacao"],
    validationStatus: "demonstrativo",
    validationNote: "Roteiro demonstrativo para apresentar a jornada do aluno; agenda depende da turma.",
    whyItMatters:
      "Traduz formacao em oportunidade concreta: cada aluno pode praticar acolhimento, roteiro, narrativa e trabalho em equipe.",
    visitorExperience: ["Boas-vindas por jovens guias", "Exercicios de narrativa territorial", "Troca sobre ODS", "Mini devolutiva de aprendizagem"],
    includedItems: ["Facilitacao pedagogica", "Roda educativa", "Material digital", "Registro de participacao"],
    recommendations: ["Levar agua", "Autorizacao para menores em grupos escolares", "Combinar objetivos da visita com antecedencia"],
    careNotes: ["Nao usar rosto real de aluno sem termo de imagem", "Separar demo de operacao real", "Validar presenca de professor responsavel"],
    accessibility: "Pode ser adaptado para versao mais curta.",
    bestTime: "Manha",
    safetyNotes: "Agenda confirmada com parceiros locais e equipe pedagogica."
  },
  {
    id: "route-05",
    slug: "roteiro-juventude-natureza-favela",
    title: "Serra Viva - Educacao Ambiental",
    subtitle: "Mata Atlantica, residuos, agua, reflorestamento e Agenda 2030.",
    shortDescription: "Roteiro demonstrativo para grupos educacionais sobre preservacao e sustentabilidade urbana.",
    description:
      "Experiencia focada em educacao ambiental, Agenda 2030, preservacao, residuos, agua, reflorestamento e cuidado com a cidade.",
    longDescription:
      "Serra Viva e a versao mais pedagogica dos roteiros: conecta conteudos da trilha de biodiversidade com observacao de territorio, debate sobre residuos, agua, reflorestamento e cidadania ambiental. Deve ser validado com educadores e moradores antes de operacao real.",
    location: "Complexo do Alemao / Serra da Misericordia",
    meetingPoint: "Ponto educacional seguro definido pela coordenacao",
    finalMeetingPointNote: "Ponto final confirmado pela equipe antes da atividade.",
    durationMinutes: 160,
    difficulty: "leve",
    price: 70,
    maxPeople: 12,
    coverUrl: "/media/territory/complexo-alemao/complexo-alemao-panorama-acediscovery-cc-by-4.jpg",
    coverAlt: "Paisagem do Complexo do Alemao e encostas usadas para leitura ambiental urbana",
    galleryUrls: [
      "/media/territory/complexo-alemao/complexo-alemao-panorama-acediscovery-cc-by-4.jpg",
      "/media/territory/complexo-alemao/visao-do-complexo-thirson-cc-by-sa-4.jpg"
    ],
    mediaAssetIds: ["complexo-alemao-panorama", "visao-do-complexo"],
    guideId: "rafael-silva",
    featured: false,
    tags: ["agenda-2030", "educacao ambiental", "reflorestamento", "escolas"],
    validationStatus: "precisa-validacao",
    validationNote: "Percurso e atividades precisam ser validados com responsaveis ambientais locais.",
    whyItMatters:
      "Transforma a natureza proxima em conteudo de aula e cria evidencias de impacto ambiental para editais, escolas e parceiros.",
    visitorExperience: ["Atividade de observacao", "Conversa sobre Mata Atlantica", "Pratica de cuidado com residuos", "Ligacao com ODS"],
    includedItems: ["Guia jovem", "Material ODS", "Registro de participacao", "Checklist de preparo ambiental"],
    recommendations: ["Perguntas bem-vindas", "Evitar lixo descartavel", "Levar caderno ou celular para registro"],
    careNotes: ["Nao coletar plantas ou animais", "Nao divulgar trilha sem autorizacao", "Checar responsaveis por grupo escolar"],
    accessibility: "Trechos planejados para grupos mistos.",
    bestTime: "Manha ou tarde",
    safetyNotes: "Monitoria do projeto durante toda a vivencia e preparo confirmado antes da visita."
  },
  {
    id: "route-06",
    slug: "vivencia-perifa-ecotour",
    title: "Perifa Ecotour Experience",
    subtitle: "Experiencia institucional para parceiros, imprensa, editais e visitantes estrategicos.",
    shortDescription: "Experiencia premium demonstrativa sobre formacao, territorio, impacto e futuro do projeto.",
    description:
      "Uma vivencia completa que apresenta a proposta Perifa Ecotour, seus guias, os percursos possiveis e a ponte entre formacao, renda, turismo comunitario e impacto.",
    longDescription:
      "Pensada para reunioes, parceiros institucionais, imprensa, universidades e editais, esta experiencia costura pitch, visita de contexto, roteiro demonstrativo, dados de impacto e proximos passos. Nao e um produto turistico fechado: e uma vitrine etica da metodologia.",
    location: "Complexo do Alemao",
    meetingPoint: "Ponto institucional combinado com o grupo",
    finalMeetingPointNote: "Ponto final confirmado pela coordenacao e parceiros envolvidos.",
    durationMinutes: 240,
    difficulty: "leve",
    price: 120,
    maxPeople: 20,
    coverUrl: "/media/territory/penha/igreja-da-penha-wilfredor-cc0.jpg",
    coverAlt: "Igreja da Penha como ponto visual de referencia para a Zona Norte e o territorio",
    galleryUrls: [
      "/media/territory/penha/igreja-da-penha-wilfredor-cc0.jpg",
      "/media/territory/penha/panorama-zona-norte-igreja-penha-adam-jones-cc-by-sa-2.jpg",
      "/media/territory/complexo-alemao/complexo-alemao-panorama-acediscovery-cc-by-4.jpg"
    ],
    mediaAssetIds: ["igreja-da-penha", "panorama-zona-norte-penha", "complexo-alemao-panorama"],
    guideId: "mariana-costa",
    featured: true,
    tags: ["premium", "parceiros", "impacto", "institucional"],
    validationStatus: "premium-demo",
    validationNote: "Experiencia demonstrativa premium; operacao final depende de agenda e curadoria.",
    whyItMatters:
      "Ajuda apoiadores a entenderem a ponte entre escola, app, turismo responsavel, renda local e indicadores de impacto.",
    visitorExperience: ["Apresentacao institucional", "Leitura de territorio", "Conversa com equipe", "Demonstracao do app e painel de impacto"],
    includedItems: ["Curadoria", "Guia local", "Relato de impacto", "Material digital", "Resumo executivo da visita"],
    recommendations: ["Ideal para universidades e apoiadores", "Agendar com antecedencia", "Enviar objetivo da visita antes"],
    careNotes: ["Separar agenda institucional de roteiro turistico publico", "Confirmar autorizacoes de imagem", "Alinhar mensagens com responsaveis do projeto"],
    accessibility: "Formato customizavel conforme grupo.",
    bestTime: "Sob agenda",
    safetyNotes: "Planejamento com coordenacao, guias e parceiros responsaveis."
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
  { label: "Atividades enviadas", value: "214", detail: "feedback em andamento", tone: "orange" },
  { label: "Turmas acompanhadas", value: "8", detail: "4 com tutoria ativa", tone: "coral" },
  { label: "Certificados emitidos", value: "18", detail: "liberados pela coordenacao", tone: "yellow" },
  { label: "Taxa de conclusao", value: "68%", detail: "trilha Guia Local", tone: "mint" },
  { label: "Horas estudadas", value: "1.340h", detail: "registro da plataforma", tone: "blue" },
  { label: "Potencial de renda", value: "R$ 9,8k", detail: "apos certificacao", tone: "mint" }
];

export const notices = [
  "Nova turma de Guia Local começa em breve",
  "Material sobre Agenda 2030 disponível",
  "Roteiro Serra da Misericordia atualizado para validacao comunitaria",
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
  { month: "Jan", alunos: 28, aulas: 110, certificados: 2 },
  { month: "Fev", alunos: 44, aulas: 180, certificados: 4 },
  { month: "Mar", alunos: 73, aulas: 330, certificados: 9 },
  { month: "Abr", alunos: 96, aulas: 560, certificados: 13 },
  { month: "Mai", alunos: 128, aulas: 842, certificados: 18 }
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

export const studentActivities: StudentActivity[] = [
  {
    id: "atividade-01",
    title: "Mapa afetivo do territorio",
    trackTitle: "Formacao de Guia Local",
    dueDate: "20/06",
    status: "submitted",
    evidenceType: "Relato + 3 fotos",
    teacherFeedback: "Recebido. Aguardando devolutiva da professora.",
    progressPercent: 80,
    tone: "mint"
  },
  {
    id: "atividade-02",
    title: "Checklist de seguranca da saida",
    trackTitle: "Meio Ambiente e Biodiversidade",
    dueDate: "24/06",
    status: "todo",
    evidenceType: "Lista guiada",
    teacherFeedback: "Preencha antes da pratica em grupo.",
    progressPercent: 20,
    tone: "yellow"
  },
  {
    id: "atividade-03",
    title: "ODS aplicado ao ecoturismo",
    trackTitle: "Agenda 2030 e Empreendedorismo",
    dueDate: "28/06",
    status: "revision",
    evidenceType: "Texto curto",
    teacherFeedback: "Revisar a conexao entre indicador e acao local.",
    progressPercent: 55,
    tone: "coral"
  },
  {
    id: "atividade-04",
    title: "Roteiro de fala para acolhimento",
    trackTitle: "Formacao de Guia Local",
    dueDate: "Concluida",
    status: "reviewed",
    evidenceType: "Audio de 2 minutos",
    teacherFeedback: "Aprovado. Boa clareza e cuidado com moradores.",
    progressPercent: 100,
    tone: "blue"
  }
];

export const teacherEvaluations: TeacherEvaluation[] = [
  {
    id: "avaliacao-01",
    studentName: "Lucas Oliveira",
    activityTitle: "Mapa afetivo do territorio",
    trackTitle: "Formacao de Guia Local",
    submittedAt: "Hoje, 09:42",
    status: "pending",
    priority: "alta",
    evidence: "Relato + 3 fotos",
    feedbackHint: "Validar se os pontos descritos respeitam combinados de imagem e geolocalizacao."
  },
  {
    id: "avaliacao-02",
    studentName: "Ana Beatriz Santos",
    activityTitle: "ODS aplicado ao ecoturismo",
    trackTitle: "Agenda 2030 e Empreendedorismo",
    submittedAt: "Ontem, 18:10",
    status: "revision",
    priority: "media",
    evidence: "Texto curto",
    feedbackHint: "Pedir exemplo de indicador mensuravel e acao local correspondente."
  },
  {
    id: "avaliacao-03",
    studentName: "Rafael Silva",
    activityTitle: "Roteiro de fala para acolhimento",
    trackTitle: "Formacao de Guia Local",
    submittedAt: "15/06, 14:30",
    status: "reviewed",
    priority: "baixa",
    evidence: "Audio de 2 minutos",
    feedbackHint: "Aprovado com destaque para linguagem acolhedora."
  }
];

export const contentReviewItems: ContentReviewItem[] = [
  {
    id: "conteudo-01",
    title: "Como contar o territorio com seguranca",
    author: "Prof. Mariana Costa",
    trackTitle: "Formacao de Guia Local",
    kind: "Videoaula",
    status: "approved",
    updatedAt: "16/06",
    checklist: ["Objetivo claro", "Atividade territorial", "Termos de imagem"]
  },
  {
    id: "conteudo-02",
    title: "Residuos, agua e cuidado em trilha",
    author: "Prof. Mariana Costa",
    trackTitle: "Meio Ambiente e Biodiversidade",
    kind: "Material PDF",
    status: "review",
    updatedAt: "15/06",
    checklist: ["Fonte citada", "Quiz pendente", "Acessibilidade revisar"]
  },
  {
    id: "conteudo-03",
    title: "Precificacao e renda local",
    author: "Coordenacao ECOTUCA",
    trackTitle: "Agenda 2030 e Empreendedorismo",
    kind: "Aula + atividade",
    status: "changes",
    updatedAt: "14/06",
    checklist: ["Exemplo financeiro", "Linguagem simples", "Curadoria final"]
  },
  {
    id: "conteudo-04",
    title: "Biodiversidade que mora perto",
    author: "Equipe ECOTUCA",
    trackTitle: "Meio Ambiente e Biodiversidade",
    kind: "Rascunho",
    status: "draft",
    updatedAt: "12/06",
    checklist: ["Imagem oficial", "Atividade", "Glossario"]
  }
];

export const adminReportSnapshots: AdminReportSnapshot[] = [
  { label: "Retencao", value: "82%", detail: "alunos ativos no ciclo", tone: "mint" },
  { label: "Feedbacks", value: "37", detail: "devolutivas no mes", tone: "yellow" },
  { label: "Certificados", value: "18", detail: "liberados pela coordenacao", tone: "blue" },
  { label: "Aprovacoes", value: "17", detail: "cadastros na fila", tone: "coral" }
];

export const adminReportRows: AdminReportRow[] = [
  { period: "Jan", students: 28, completedLessons: 110, certificates: 2, pendingApprovals: 7, supportRequests: 4 },
  { period: "Fev", students: 44, completedLessons: 180, certificates: 4, pendingApprovals: 9, supportRequests: 5 },
  { period: "Mar", students: 73, completedLessons: 330, certificates: 9, pendingApprovals: 11, supportRequests: 7 },
  { period: "Abr", students: 96, completedLessons: 560, certificates: 13, pendingApprovals: 15, supportRequests: 9 },
  { period: "Mai", students: 128, completedLessons: 842, certificates: 18, pendingApprovals: 17, supportRequests: 11 }
];
