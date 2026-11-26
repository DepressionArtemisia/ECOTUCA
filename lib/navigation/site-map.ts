import { BookOpen, ClipboardCheck, Compass, GraduationCap, HelpCircle, Home, Info, LockKeyhole, Mail, Map, MapPinned, MonitorSmartphone, Scale, ShieldCheck, Smartphone, UserCheck, UsersRound } from "lucide-react";

export type SiteMapStatus = "ready" | "preview" | "draft" | "technical";
export type SiteMapAudience = "public" | "student" | "teacher" | "guide" | "tourist" | "admin" | "meeting" | "technical";
export type SiteMapVisibility = "public" | "meeting" | "internal" | "technical";

export type SiteMapItem = {
  label: string;
  href: string;
  description: string;
  status: SiteMapStatus;
  audiences: SiteMapAudience[];
  visibility: SiteMapVisibility;
  indexable?: boolean;
};

export type SiteMapSection = {
  title: string;
  icon: typeof Home;
  items: SiteMapItem[];
};

export const siteMapSections: SiteMapSection[] = [
  {
    title: "Institucional",
    icon: Info,
    items: [
      { label: "Início", href: "/", description: "Funil público da plataforma de ensino ECOTUCA.", status: "ready", audiences: ["public", "meeting"], visibility: "public" },
      { label: "Sobre", href: "/sobre", description: "Missao, território, Agenda 2030 e proposta de valor.", status: "ready", audiences: ["public", "meeting"], visibility: "public" },
      { label: "Como funciona", href: "/como-funciona", description: "Fluxo da inscrição ao certificado.", status: "ready", audiences: ["public", "meeting"], visibility: "public" },
      { label: "FAQ", href: "/faq", description: "Perguntas frequentes sobre plataforma, cadastro e ensino.", status: "ready", audiences: ["public", "meeting"], visibility: "public" },
      { label: "Contato", href: "/contato", description: "Canais para alunos, professores, parceiros e escolas.", status: "ready", audiences: ["public", "meeting"], visibility: "public" }
    ]
  },
  {
    title: "Produto",
    icon: MonitorSmartphone,
    items: [
      { label: "Roteiros", href: "/roteiros", description: "Vitrine de experiências territoriais e ambientais.", status: "ready", audiences: ["public", "tourist", "guide", "meeting"], visibility: "public" },
      { label: "Serra da Misericórdia", href: "/roteiros/serra-da-misericordia", description: "Detalhe do roteiro territorial usado como contexto educativo.", status: "ready", audiences: ["public", "tourist", "guide", "meeting"], visibility: "public" },
      { label: "Preview executivo", href: "/demo", description: "Central interna para revisão guiada do produto.", status: "preview", audiences: ["meeting", "technical"], visibility: "meeting", indexable: false },
      { label: "Preview mobile", href: "/demo-mobile", description: "Mockup navegável do app PWA mobile.", status: "preview", audiences: ["meeting", "student", "tourist"], visibility: "meeting", indexable: false },
      { label: "Status técnico", href: "/demo/status", description: "Diagnostico visivel apenas para equipe técnica.", status: "technical", audiences: ["technical", "admin"], visibility: "technical", indexable: false }
    ]
  },
  {
    title: "Cadastros",
    icon: ClipboardCheck,
    items: [
      { label: "Escolher perfil", href: "/cadastro", description: "Entrada segmentada para cada tipo de usuário.", status: "ready", audiences: ["public", "meeting"], visibility: "public" },
      { label: "Aluno", href: "/cadastro/aluno", description: "Pre-cadastro do aluno para aprovação da coordenação.", status: "ready", audiences: ["student", "meeting"], visibility: "meeting", indexable: false },
      { label: "Professor", href: "/cadastro/professor", description: "Pre-cadastro pedagógico para aprovação da coordenação.", status: "ready", audiences: ["teacher", "meeting"], visibility: "meeting", indexable: false },
      { label: "Guia", href: "/cadastro/guia", description: "Perfil de guia territorial, roteiro, segurança e disponibilidade.", status: "preview", audiences: ["guide", "meeting"], visibility: "meeting", indexable: false },
      { label: "Turista", href: "/cadastro/turista", description: "Interesse em roteiros, grupo, preparo e contato responsável.", status: "preview", audiences: ["tourist", "meeting"], visibility: "meeting", indexable: false }
    ]
  },
  {
    title: "Áreas logadas",
    icon: UsersRound,
    items: [
      { label: "Aluno", href: "/app/aluno", description: "Dashboard de trilhas, aulas e progresso.", status: "ready", audiences: ["student", "meeting"], visibility: "internal", indexable: false },
      { label: "Trilhas do aluno", href: "/app/aluno/trilhas", description: "Catalogo de trilhas formativas.", status: "ready", audiences: ["student", "meeting"], visibility: "internal", indexable: false },
      { label: "Atividades do aluno", href: "/app/aluno/atividades", description: "Entregas, evidências e feedbacks do aluno.", status: "ready", audiences: ["student", "teacher"], visibility: "internal", indexable: false },
      { label: "Certificados do aluno", href: "/app/aluno/certificados", description: "Status de certificação e codigos digitais.", status: "ready", audiences: ["student", "admin"], visibility: "internal", indexable: false },
      { label: "Aula destaque", href: "/app/aluno/aulas/aula-guia-01", description: "Videoaula com progresso de exibicao.", status: "ready", audiences: ["student", "meeting"], visibility: "internal", indexable: false },
      { label: "Professor", href: "/app/professor", description: "Painel pedagógico e acompanhamento de turmas.", status: "ready", audiences: ["teacher", "meeting"], visibility: "internal", indexable: false },
      { label: "Turmas do professor", href: "/app/professor/turmas", description: "Turmas, progresso medio e alunos em atencao.", status: "ready", audiences: ["teacher", "admin"], visibility: "internal", indexable: false },
      { label: "Conteúdos do professor", href: "/app/professor/conteudos", description: "Criacao de aulas, materiais e curadoria pedagógica.", status: "ready", audiences: ["teacher", "admin", "meeting"], visibility: "internal", indexable: false },
      { label: "Avaliações do professor", href: "/app/professor/avaliacoes", description: "Fila de atividades para feedback pedagógico.", status: "ready", audiences: ["teacher", "student"], visibility: "internal", indexable: false },
      { label: "Guia", href: "/app/guia", description: "Perfil, agenda e roteiros do guia.", status: "preview", audiences: ["guide", "meeting"], visibility: "internal", indexable: false },
      { label: "Turista", href: "/app/turista", description: "Experiência de visitante com reservas e favoritos.", status: "preview", audiences: ["tourist", "meeting"], visibility: "internal", indexable: false },
      { label: "Admin", href: "/app/admin", description: "Indicadores, aprovação e gestão educacional.", status: "ready", audiences: ["admin", "meeting"], visibility: "internal", indexable: false },
      { label: "Aprovações", href: "/app/admin/aprovacoes", description: "Fila de cadastros pendentes.", status: "ready", audiences: ["admin", "technical", "meeting"], visibility: "internal", indexable: false },
      { label: "Usuários", href: "/app/admin/usuarios", description: "Gestão de usuários, papeis e status.", status: "ready", audiences: ["admin"], visibility: "internal", indexable: false },
      { label: "Conteúdos admin", href: "/app/admin/conteudos", description: "Curadoria de conteúdos antes da publicação.", status: "ready", audiences: ["admin", "teacher"], visibility: "internal", indexable: false },
      { label: "Relatórios", href: "/app/admin/relatorios", description: "Prestação de contas e indicadores mensais.", status: "ready", audiences: ["admin", "technical"], visibility: "internal", indexable: false }
    ]
  },
  {
    title: "Transparência",
    icon: ShieldCheck,
    items: [
      { label: "Mapa do site", href: "/sitemap", description: "Todos os caminhos principais da plataforma.", status: "ready", audiences: ["public", "meeting", "technical"], visibility: "public" },
      { label: "Créditos de imagens", href: "/creditos-imagens", description: "Licenças, autoria e uso das imagens.", status: "ready", audiences: ["public", "meeting"], visibility: "public" },
      { label: "Termos", href: "/termos", description: "Termos de uso em linguagem clara.", status: "draft", audiences: ["public", "technical"], visibility: "public" },
      { label: "Privacidade", href: "/privacidade", description: "Tratamento de dados e próximos passos LGPD.", status: "draft", audiences: ["public", "technical"], visibility: "public" }
    ]
  }
];

export const footerHighlights = [
  { label: "Aprendizagem", href: "/app/aluno", icon: GraduationCap },
  { label: "Território", href: "/roteiros", icon: MapPinned },
  { label: "PWA mobile", href: "/demo-mobile", icon: Smartphone },
  { label: "Governança", href: "/app/admin", icon: UserCheck },
  { label: "Mapa", href: "/sitemap", icon: Map },
  { label: "Privacidade", href: "/privacidade", icon: LockKeyhole },
  { label: "Termos", href: "/termos", icon: Scale },
  { label: "Contato", href: "/contato", icon: Mail },
  { label: "FAQ", href: "/faq", icon: HelpCircle },
  { label: "Como funciona", href: "/como-funciona", icon: Compass },
  { label: "Cadastros", href: "/cadastro", icon: BookOpen }
];

export const flatSiteMapItems = siteMapSections.flatMap((section) => section.items);

export const publicSitemapItems = flatSiteMapItems.filter((item) => item.indexable !== false && item.visibility === "public");
