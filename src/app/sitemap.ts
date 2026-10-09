import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-url";

// /obrigado fica fora: só faz sentido depois do pagamento.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/privacidade`, changeFrequency: "yearly", priority: 0.3 },
  ];
}
