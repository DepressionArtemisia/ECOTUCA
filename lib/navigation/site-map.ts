import { BookOpen, ClipboardCheck, Compass, GraduationCap, HelpCircle, Home, Info, LockKeyhole, Mail, Map, MapPinned, MonitorSmartphone, Scale, ShieldCheck, Smartphone, UserCheck, UsersRound } from "lucide-react";

export type SiteMapItem = {
  label: string;
  href: string;
  description: string;
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
      { label: "Inicio", href: "/", description: "Visao geral da ECOTUCA, impacto, jornadas e roteiros." },
      { label: "Sobre", href: "/sobre", description: "Missao, territorio, Agenda 2030 e proposta de valor." },
      { label: "Como funciona", href: "/como-funciona", description: "Fluxo da formacao ao roteiro publicado." },
      { label: "FAQ", href: "/faq", description: "Perguntas frequentes para parceiros, jovens e visitantes." },
      { label: "Contato", href: "/contato", description: "Canais para parceria, imprensa, escolas e turismo." }
    ]
  },
  {
    title: "Produto",
    icon: MonitorSmartphone,
    items: [
      { label: "Roteiros", href: "/roteiros", description: "Vitrine de experiencias territoriais e ambientais." },
      { label: "Serra da Misericordia", href: "/roteiros/serra-da-misericordia", description: "Detalhe do roteiro destaque para apresentacao." },
      { label: "Demo executiva", href: "/demo", description: "Central de apresentacao guiada para reuniao." },
      { label: "Demo mobile", href: "/demo-mobile", description: "Mockup navegavel do app PWA mobile." },
      { label: "Status tecnico", href: "/demo/status", description: "Diagnostico visivel apenas para equipe tecnica." }
    ]
  },
  {
    title: "Cadastros",
    icon: ClipboardCheck,
    items: [
      { label: "Escolher perfil", href: "/cadastro", description: "Entrada segmentada para cada tipo de usuario." },
      { label: "Aluno", href: "/cadastro/aluno", description: "Cadastro em etapas com rascunho local e revisao." },
      { label: "Professor", href: "/cadastro/professor", description: "Cadastro pedagogico em etapas com portfolio." },
      { label: "Guia", href: "/cadastro/guia", description: "Perfil de guia territorial e disponibilidade." },
      { label: "Turista", href: "/cadastro/turista", description: "Interesse em roteiros e contato responsavel." }
    ]
  },
  {
    title: "Areas logadas",
    icon: UsersRound,
    items: [
      { label: "Aluno", href: "/app/aluno", description: "Dashboard de trilhas, aulas e progresso." },
      { label: "Aula destaque", href: "/app/aluno/aulas/aula-guia-01", description: "Videoaula com progresso de exibicao." },
      { label: "Professor", href: "/app/professor", description: "Painel pedagogico e acompanhamento de turmas." },
      { label: "Guia", href: "/app/guia", description: "Perfil, agenda e roteiros do guia." },
      { label: "Turista", href: "/app/turista", description: "Experiencia de visitante com reservas e favoritos." },
      { label: "Admin", href: "/app/admin", description: "Indicadores, aprovacao e gestao do MVP." },
      { label: "Aprovacoes", href: "/app/admin/aprovacoes", description: "Fila de cadastros pendentes." }
    ]
  },
  {
    title: "Transparencia",
    icon: ShieldCheck,
    items: [
      { label: "Mapa do site", href: "/sitemap", description: "Todos os caminhos principais do MVP." },
      { label: "Creditos de imagens", href: "/creditos-imagens", description: "Licencas, autoria e uso das imagens." },
      { label: "Termos", href: "/termos", description: "Termos de uso em linguagem clara." },
      { label: "Privacidade", href: "/privacidade", description: "Tratamento de dados e proximos passos LGPD." }
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
