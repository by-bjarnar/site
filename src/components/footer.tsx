import Link from 'next/link';

import { Icons } from '@/icons';
import { linkProps } from '@/lib/utils/link';
import type { PayloadFooterGlobal } from '@/payload/payload-types';

export function Footer({ socialLinks }: PayloadFooterGlobal) {
  return (
    <footer className="mx-4 flex items-center justify-center border-t border-gold-6 py-4 md:mx-6 md:py-6">
      <ul className="flex flex-row gap-1">
        {socialLinks?.map(({ icon, ...link }) => (
          <li key={link.id} className="rounded-sm hover:bg-gold-3">
            <Link
              {...linkProps(link)}
              className="flex items-center justify-center border-0 p-2 text-gold-10 hover:text-gold-11"
            >
              <span className="sr-only">{link.text}</span>
              {icon ? <Icons name={icon} className="size-5" /> : null}
            </Link>
          </li>
        ))}
      </ul>
    </footer>
  );
}
