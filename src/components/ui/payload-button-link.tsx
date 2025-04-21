import type { ComponentProps } from 'react';

import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Icons } from '@/icons';
import type { PayloadButtonLinkBlock } from '@/payload/payload-types';
import { linkProps } from '@/utils/link';

export type PayloadButtonLinkProps = ComponentProps<typeof Button> &
  Omit<PayloadButtonLinkBlock, 'alignment' | 'blockName' | 'blockType' | 'id'>;

export function PayloadButtonLink({
  link,
  icon,
  iconPosition,
  size,
  ...props
}: PayloadButtonLinkProps) {
  return (
    <Button
      iconPosition={iconPosition}
      size={size}
      {...props}
      render={
        <Link {...linkProps(link)}>
          {iconPosition !== 'center' ? link.text : null}
          {icon && <Icons name={icon} size={size} />}
        </Link>
      }
    />
  );
}
