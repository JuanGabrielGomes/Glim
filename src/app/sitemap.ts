import type { MetadataRoute } from 'next';
import { CASE_STUDIES } from '@/lib/content';
import { SITE_URL } from '@/lib/seo';
import { SERVICE_PAGES } from '@/lib/services';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/`, changeFrequency: 'monthly', priority: 1 },
    { url: `${SITE_URL}/trabalhos`, changeFrequency: 'monthly', priority: 0.8 },
    ...CASE_STUDIES.map((item) => ({
      url: `${SITE_URL}/trabalhos/${item.slug}`,
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    })),
    ...SERVICE_PAGES.map((service) => ({
      url: `${SITE_URL}/servicos/${service.slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];
}
