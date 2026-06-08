import { BookOpen, ClipboardCheck, Compass, GraduationCap, HelpCircle, Home, Info, LockKeyhole, Mail, Map, MapPinned, MonitorSmartphone, Scale, ShieldCheck, Smartphone, UserCheck, UsersRound } from "lucide-react";

export type SiteMapStatus = "ready" | "demo" | "draft" | "technical";
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
      { label: "Inicio", href: "/", description: "Visao geral da ECOTUCA, impacto, jornadas e roteiros.", status: "ready", audiences: ["public", "meeting"], visibility: "public" },
      { label: "Sobre", href: "/sobre", description: "Missao, territorio, Agenda 2030 e proposta de valor.", status: "ready", audiences: ["public", "meeting"], visibility: "public" },
      { label: "Como funciona", href: "/como-funciona", description: "Fluxo da formacao ao roteiro publicado.", status: "ready", audiences: ["public", "meeting"], visibility: "public" },
      { label: "FAQ", href: "/faq", description: "Perguntas frequentes para parceiros, jovens e visitantes.", status: "ready", audiences: ["public", "meeting"], visibility: "public" },
      { label: "Contato", href: "/contato", description: "Canais para parceria, imprensa, escolas e turismo.", status: "ready", audiences: ["public", "meeting"], visibility: "public" }
    ]
  },
  {
    title: "Produto",
    icon: MonitorSmartphone,
    items: [
      { label: "Roteiros", href: "/roteiros", description: "Vitrine de experiencias territoriais e ambientais.", status: "ready", audiences: ["public", "tourist", "guide", "meeting"], visibility: "public" },
      { label: "Serra da Misericordia", href: "/roteiros/serra-da-misericordia", description: "Detalhe do roteiro destaque para apresentacao.", status: "ready", audiences: ["public", "tourist", "guide", "meeting"], visibility: "public" },
      { label: "Demo executiva", href: "/demo", description: "Central de apresentacao guiada para reuniao.", status: "demo", audiences: ["meeting", "technical"], visibility: "meeting", indexable: false },
      { label: "Demo mobile", href: "/demo-mobile", description: "Mockup navegavel do app PWA mobile.", status: "demo", audiences: ["meeting", "student", "tourist"], visibility: "meeting", indexable: false },
      { label: "Status tecnico", href: "/demo/status", description: "Diagnostico visivel apenas para equipe tecnica.", status: "technical", audiences: ["technical", "admin"], visibility: "technical", indexable: false }
    ]
  },
  {
    title: "Cadastros",
    icon: ClipboardCheck,
    items: [
      { label: "Escolher perfil", href: "/cadastro", description: "Entrada segmentada para cada tipo de usuario.", status: "ready", audiences: ["public", "meeting"], visibility: "public" },
      { label: "Aluno", href: "/cadastro/aluno", description: "Cadastro em etapas com rascunho local e revisao.", status: "demo", audiences: ["student", "meeting"], visibility: "meeting", indexable: false },
      { label: "Professor", href: "/cadastro/professor", description: "Cadastro pedagogico em etapas com portfolio.", status: "demo", audiences: ["teacher", "meeting"], visibility: "meeting", indexable: false },
      { label: "Guia", href: "/cadastro/guia", description: "Perfil de guia territorial, roteiro, seguranca e disponibilidade.", status: "demo", audiences: ["guide", "meeting"], visibility: "meeting", indexable: false },
      { label: "Turista", href: "/cadastro/turista", description: "Interesse em roteiros, grupo, preparo e contato responsavel.", status: "demo", audiences: ["tourist", "meeting"], visibility: "meeting", indexable: false }
    ]
  },
  {
    title: "Areas logadas",
    icon: UsersRound,
    items: [
      { label: "Aluno", href: "/app/aluno", description: "Dashboard de trilhas, aulas e progresso.", status: "demo", audiences: ["student", "meeting"], visibility: "internal", indexable: false },
      { label: "Aula destaque", href: "/app/aluno/aulas/aula-guia-01", description: "Videoaula com progresso de exibicao.", status: "demo", audiences: ["student", "meeting"], visibility: "internal", indexable: false },
      { label: "Professor", href: "/app/professor", description: "Painel pedagogico e acompanhamento de turmas.", status: "demo", audiences: ["teacher", "meeting"], visibility: "internal", indexable: false },
      { label: "Conteudos do professor", href: "/app/professor/conteudos", description: "Rascunho visual de criacao e curadoria pedagogica.", status: "demo", audiences: ["teacher", "admin", "meeting"], visibility: "internal", indexable: false },
      { label: "Guia", href: "/app/guia", description: "Perfil, agenda e roteiros do guia.", status: "demo", audiences: ["guide", "meeting"], visibility: "internal", indexable: false },
      { label: "Turista", href: "/app/turista", description: "Experiencia de visitante com reservas e favoritos.", status: "demo", audiences: ["tourist", "meeting"], visibility: "internal", indexable: false },
      { label: "Admin", href: "/app/admin", description: "Indicadores, aprovacao e gestao do MVP.", status: "demo", audiences: ["admin", "meeting"], visibility: "internal", indexable: false },
      { label: "Aprovacoes", href: "/app/admin/aprovacoes", description: "Fila de cadastros pendentes.", status: "demo", audiences: ["admin", "technical", "meeting"], visibility: "internal", indexable: false }
    ]
  },
  {
    title: "Transparencia",
    icon: ShieldCheck,
    items: [
      { label: "Mapa do site", href: "/sitemap", description: "Todos os caminhos principais do MVP.", status: "ready", audiences: ["public", "meeting", "technical"], visibility: "public" },
      { label: "Creditos de imagens", href: "/creditos-imagens", description: "Licencas, autoria e uso das imagens.", status: "ready", audiences: ["public", "meeting"], visibility: "public" },
      { label: "Termos", href: "/termos", description: "Termos de uso em linguagem clara.", status: "draft", audiences: ["public", "technical"], visibility: "public" },
      { label: "Privacidade", href: "/privacidade", description: "Tratamento de dados e proximos passos LGPD.", status: "draft", audiences: ["public", "technical"], visibility: "public" }
    ]
  }
];

export const footerHighlights = [
  { label: "Aprendizagem", href: "/app/aluno", icon: GraduationCap },
  { label: "Territorio", href: "/roteiros", icon: MapPinned },
  { label: "PWA mobile", href: "/demo-mobile", icon: Smartphone },
  { label: "Governanca", href: "/app/admin", icon: UserCheck },
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
