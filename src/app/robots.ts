import type { MetadataRoute } from 'next';

import { env } from '@/env/client';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/next/', '/api/'],
    },
    sitemap: new URL('/sitemap.xml', env.NEXT_PUBLIC_SERVER_URL).toString(),
  };
}
