export const brandColors = {
  yellow: "#FCC224",
  coral: "#E9635D",
  blue: "#335595",
  orange: "#FE9440",
  brown: "#3A1A16",
  mint: "#2ACCB5"
} as const;

export const brandTokens = [
  { name: "brand-yellow", value: brandColors.yellow, use: "energia, conquistas, chamadas principais" },
  { name: "brand-coral", value: brandColors.coral, use: "alertas leves, acolhimento, status humano" },
  { name: "brand-blue", value: brandColors.blue, use: "confianca, administracao, indicadores" },
  { name: "brand-orange", value: brandColors.orange, use: "acao, turismo, chamada mobile" },
  { name: "brand-brown", value: brandColors.brown, use: "base, titulos e tema escuro" },
  { name: "brand-mint", value: brandColors.mint, use: "natureza, progresso, sucesso" }
] as const;

export const publicNav = [
  { label: "Sobre", href: "/sobre" },
  { label: "Roteiros", href: "/roteiros" },
  { label: "Demo", href: "/demo" },
  { label: "Mobile", href: "/demo-mobile" }
] as const;
