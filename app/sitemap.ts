import type { MetadataRoute } from "next";
import { flatSiteMapItems } from "@/lib/navigation/site-map";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ecotuca.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return flatSiteMapItems.map((item) => ({
    url: `${baseUrl}${item.href}`,
    lastModified: now,
    changeFrequency: item.href.startsWith("/app") ? "weekly" : "monthly",
    priority: item.href === "/" ? 1 : item.href.startsWith("/cadastro") || item.href.startsWith("/roteiros") ? 0.8 : 0.6
  }));
}
