import type { ComponentProps, JSX } from 'react';

import { IconBluesly } from '@/lib/components/icons/bluesky';
import { IconInstagram } from '@/lib/components/icons/instagram';
import { IconLetterboxd } from '@/lib/components/icons/letterboxd';
import { IconTikTok } from '@/lib/components/icons/tiktok';
import { IconX } from '@/lib/components/icons/x';
import type { PayloadIconField } from '@/payload/payload-types';

type IconFunction = (props: ComponentProps<'svg'>) => JSX.Element;

const icons: Record<NonNullable<PayloadIconField>, IconFunction> = {
  bluesky: IconBluesly,
  instagram: IconInstagram,
  letterboxd: IconLetterboxd,
  tiktok: IconTikTok,
  x: IconX,
};

type Props = ComponentProps<'svg'> & {
  name: keyof typeof icons;
};

export function Icons({ name, ...props }: Props) {
  const Icon = icons[name];

  if (!Icon) {
    return null;
  }

  return <Icon {...props} />;
}
