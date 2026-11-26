import type { MediaAsset } from "@/types/media";

export const mediaAssets: MediaAsset[] = [
  {
    id: "complexo-alemao-panorama",
    title: "Panorama aereo do Complexo do Alemão",
    alt: "Vista ampla do Complexo do Alemão com morros, casas e paisagem urbana da Zona Norte do Rio",
    src: "/media/territory/complexo-alemao/complexo-alemao-panorama-acediscovery-cc-by-4.jpg",
    author: "Acediscovery",
    source: "https://commons.wikimedia.org/wiki/File:Complexo-do-Alemao-Rio-de-Janeiro.jpg",
    license: "CC BY 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
    creditRequired: true,
    usage: "Hero institucional, rotas territoriais e cards de contexto.",
    status: "approved",
    location: "Complexo do Alemão, Rio de Janeiro",
    tags: ["complexo-alemao", "territorio", "panorama", "zona-norte"]
  },
  {
    id: "visao-do-complexo",
    title: "Visao do Complexo do Alemão",
    alt: "Vista do Complexo do Alemão em perspectiva urbana com casas e encostas ao fundo",
    src: "/media/territory/complexo-alemao/visao-do-complexo-thirson-cc-by-sa-4.jpg",
    author: "Thirson",
    source: "https://commons.wikimedia.org/wiki/File:Vis%C3%A3o_do_complexo_2.jpg",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    creditRequired: true,
    usage: "Cards de roteiros, demo mobile e narrativa territorial.",
    status: "approved",
    location: "Complexo do Alemão, Rio de Janeiro",
    tags: ["complexo-alemao", "vista", "cidade", "territorio"]
  },
  {
    id: "complexo-alemao-public-domain",
    title: "Complexo do Alemão em registro histórico aberto",
    alt: "Imagem do Complexo do Alemão com moradias em encosta e paisagem urbana",
    src: "/media/territory/complexo-alemao/complexo-alemao-olimore-public-domain.jpg",
    author: "Olimor",
    source: "https://commons.wikimedia.org/wiki/File:Complexo_alemao_rj.jpg",
    license: "Public domain",
    licenseUrl: "https://commons.wikimedia.org/wiki/Commons:Public_domain",
    creditRequired: false,
    usage: "Imagem de apoio para telas internas e placeholders territoriais.",
    status: "approved",
    location: "Complexo do Alemão, Rio de Janeiro",
    tags: ["complexo-alemao", "territorio", "apoio"]
  },
  {
    id: "igreja-da-penha",
    title: "Igreja da Penha",
    alt: "Igreja da Penha no alto do morro, ponto visual de referência da Zona Norte do Rio",
    src: "/media/territory/penha/igreja-da-penha-wilfredor-cc0.jpg",
    author: "Wilfredor",
    source: "https://commons.wikimedia.org/wiki/File:Igreja_da_Penha,_Rio_de_Janeiro,_Brazil.jpg",
    license: "CC0 1.0",
    licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
    creditRequired: false,
    usage: "Roteiros de mirante, relação visual Penha-Alemão e contexto turístico.",
    status: "approved",
    location: "Penha, Rio de Janeiro",
    tags: ["penha", "mirante", "referencia-visual", "zona-norte"]
  },
  {
    id: "panorama-zona-norte-penha",
    title: "Panorama da Zona Norte visto da Igreja da Penha",
    alt: "Panorama largo da Zona Norte do Rio de Janeiro visto a partir da Igreja da Penha",
    src: "/media/territory/penha/panorama-zona-norte-igreja-penha-adam-jones-cc-by-sa-2.jpg",
    author: "Adam Jones",
    source: "https://commons.wikimedia.org/wiki/File:Panorama_of_Zona_Norte_from_Igreja_da_Penha_-_Rio_de_Janeiro_-_Brazil_(16936673073).jpg",
    license: "CC BY-SA 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/",
    creditRequired: true,
    usage: "Hero de roteiros, secao de mirantes e leitura urbana.",
    status: "approved",
    location: "Penha / Zona Norte, Rio de Janeiro",
    tags: ["penha", "zona-norte", "panorama", "mirante"]
  }
];

export function getMediaAsset(id: string) {
  return mediaAssets.find((asset) => asset.id === id) ?? mediaAssets[0];
}

export function getMediaAssets(ids: string[]) {
  return ids.map(getMediaAsset);
}
