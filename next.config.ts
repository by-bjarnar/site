import process from 'node:process';

import { withPayload } from '@payloadcms/next/withPayload';
import type { NextConfig } from 'next';

const production = process.env.NODE_ENV === 'production';
const domain = process.env.VERCEL_ENV === 'preview' ? process.env.VERCEL_URL : process.env.DOMAIN;

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: production ? 'https' : 'http',
        hostname: production && domain ? domain : 'localhost',
        pathname: '/api/**',
      },
    ],
  },
};

export default withPayload(nextConfig, { devBundleServerPackages: false });
