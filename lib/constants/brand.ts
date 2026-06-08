export const brandColors = {
  yellow: "#FCC224",
  coral: "#E9635D",
  blue: "#335595",
  orange: "#FE9440",
  brown: "#3A1A16",
  mint: "#2ACCB5",
  warm: "#FFF6E2",
  paper: "#FFFDF7",
  dark: "#24110F",
  darkSoft: "#4A241F"
} as const;

export const brandTokens = [
  { name: "brand-yellow", value: brandColors.yellow, use: "energia, conquistas, chamadas principais" },
  { name: "brand-coral", value: brandColors.coral, use: "alertas leves, acolhimento, status humano" },
  { name: "brand-blue", value: brandColors.blue, use: "confianca, administracao, indicadores" },
  { name: "brand-orange", value: brandColors.orange, use: "acao, turismo, chamada mobile" },
  { name: "brand-brown", value: brandColors.brown, use: "base, titulos e tema escuro" },
  { name: "brand-mint", value: brandColors.mint, use: "natureza, progresso, sucesso" },
  { name: "background-warm", value: brandColors.warm, use: "fundo claro quente" },
  { name: "background-paper", value: brandColors.paper, use: "cards e formularios" },
  { name: "background-dark", value: brandColors.brown, use: "tema escuro principal" },
  { name: "background-dark-soft", value: brandColors.darkSoft, use: "cards no tema escuro" }
] as const;

export const typographyTokens = {
  display: "Troika style via Impact/Arial Black fallback until licensed Troika file is available",
  body: "Lufga style via Nunito Sans/Aptos/Segoe UI fallback until licensed Lufga file is available"
} as const;

export const publicNav = [
  { label: "Inicio", href: "/" },
  { label: "Sobre", href: "/sobre" },
  { label: "Como funciona", href: "/como-funciona" },
  { label: "Roteiros", href: "/roteiros" },
  { label: "Cadastros", href: "/cadastro" },
  { label: "Demo", href: "/demo" },
  { label: "Mobile", href: "/demo-mobile" },
  { label: "Mapa", href: "/sitemap" }
] as const;
