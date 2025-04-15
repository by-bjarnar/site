import type { ComponentProps, JSX } from 'react';

import { IconBluesly } from '@/icons/bluesky';
import { IconInstagram } from '@/icons/instagram';
import { IconLetterboxd } from '@/icons/letterboxd';
import { IconTikTok } from '@/icons/tiktok';
import { IconX } from '@/icons/x';
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
