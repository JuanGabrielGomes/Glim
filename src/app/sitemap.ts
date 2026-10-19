import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';
import { SERVICE_PAGES } from '@/lib/services';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...SERVICE_PAGES.map((service) => ({
      url: `${SITE_URL}/servicos/${service.slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];
}
