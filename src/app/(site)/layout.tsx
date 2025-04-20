import type { Metadata } from 'next';
import { unstable_cache } from 'next/cache';
import { Instrument_Sans, Instrument_Serif } from 'next/font/google';
import Link from 'next/link';
import Script from 'next/script';
import type { GlobalSlug } from 'payload';
import { getPayload } from 'payload';

import { Footer } from '@/components/footer';
import { env } from '@/env/client';
import type { PayloadFooterGlobal, PayloadNavigationGlobal } from '@/payload/payload-types';
import payloadConfig from '@/payload/payload.config';
import { cn } from '@/utils/cn';
import { linkProps } from '@/utils/link';

import './globals.css';

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-instrument-sans',
});

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
});

export const metadata: Metadata = {
  title: 'By Bjarnar',
  description:
    'Will Bjarnar is a freelance writer, film critic, and Emmy Award-winning video editor whose work has been featured in various outlets including Next Best Picture, InSession Film, Geek Vibes Nation, and Screensphere.',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
    other: [
      { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
      { url: '/icon-mask.png', type: 'image/png', sizes: '512x512' },
      { url: '/icon-512.png', type: 'image/png', sizes: '512x512' },
    ],
  },
};

const fetchGlobal = async (slug: GlobalSlug) => {
  const payload = await getPayload({ config: payloadConfig });

  return payload.findGlobal({ slug });
};

const fetchCachedGlobal = <T,>(slug: GlobalSlug) =>
  unstable_cache(fetchGlobal, [slug], {
    tags: [`global_${slug}`],
  })(slug) as Promise<T>;

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { links } = await fetchCachedGlobal<PayloadNavigationGlobal>('navigation');
  const footer = await fetchCachedGlobal<PayloadFooterGlobal>('footer');

  return (
    <html
      lang="en"
      className={cn(
        instrumentSans.variable,
        instrumentSerif.variable,
        'h-full scroll-p-4 scroll-smooth! bg-gold-2 text-gold-11 antialiased',
      )}
    >
      <body className="flex h-full flex-1 flex-col">
        <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 p-4 md:flex-row md:p-6">
          <aside className="w-full shrink-0 border-b border-gold-6 pb-2 md:max-w-56 md:border-r md:border-b-0 md:pr-6 md:pb-0">
            <div className="sticky top-6 flex w-full items-baseline justify-between after:hidden md:flex-col md:items-start md:justify-normal after:md:absolute after:md:-top-6 after:md:-right-[25px] after:md:block after:md:h-6 after:md:border-r-2 after:md:border-gold-2 after:md:content-['']">
              <div className="flex flex-col gap-6">
                <Link href="/">
                  <h1 className="flex items-baseline gap-1 text-lg italic md:flex-col md:text-5xl">
                    By Bjarnar
                  </h1>
                </Link>
                <p className="balanced hidden text-gold-11 md:block">
                  A collection of writings by <br /> Will Bjarnar.
                </p>
              </div>
              <hr className="my-6 hidden w-full border-t-2 border-dotted border-t-gold-6 md:block" />
              <ul className="flex gap-2 md:flex-col md:text-base">
                {links?.map((link) => (
                  <li key={link.id}>
                    <Link
                      {...linkProps(link)}
                      className="text-gold-11 hover:border-b-green-11 hover:text-green-11"
                    >
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
          <main>{children}</main>
        </div>
        <Footer {...footer} />
        <Script
          src={env.NEXT_PUBLIC_UMAMI_SRC}
          data-website-id={env.NEXT_PUBLIC_UMAMI_ID}
          data-domains={env.NEXT_PUBLIC_DOMAIN}
        />
      </body>
    </html>
  );
}
