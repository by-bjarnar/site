import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Icons } from '@/icons';
import type { PayloadFooterGlobal } from '@/payload/payload-types';
import { linkProps } from '@/utils/link';

export function Footer({ socialLinks }: PayloadFooterGlobal) {
  return (
    <footer className="mx-4 flex items-center justify-center border-t border-gold-6 py-4 md:mx-6 md:py-6">
      <ul className="flex flex-row gap-1">
        {socialLinks?.map(({ icon, ...link }) => (
          <li key={link.id} className="rounded-sm hover:bg-gold-3">
            <Button
              iconPosition="center"
              variant="tertiary"
              render={
                <Link {...linkProps(link)} className="text-gold-11">
                  <span className="sr-only">{link.text}</span>
                  {icon ? <Icons name={icon} size="lg" /> : null}
                </Link>
              }
            />
          </li>
        ))}
      </ul>
    </footer>
  );
}
