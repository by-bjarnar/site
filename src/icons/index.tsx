import type { ComponentProps, JSX } from 'react';

import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';

import { IconArrowRight } from '@/icons/arrow-right';
import { IconBluesly } from '@/icons/bluesky';
import { IconFiverr } from '@/icons/fiverr';
import { IconInstagram } from '@/icons/instagram';
import { IconLetterboxd } from '@/icons/letterboxd';
import { IconTikTok } from '@/icons/tiktok';
import { IconX } from '@/icons/x';
import type { PayloadIconField } from '@/payload/payload-types';
import { cn } from '@/utils/cn';

type IconFunction = (props: ComponentProps<'svg'>) => JSX.Element;

const icons: Record<NonNullable<PayloadIconField>, IconFunction> = {
  arrowRight: IconArrowRight,
  bluesky: IconBluesly,
  fiverr: IconFiverr,
  instagram: IconInstagram,
  letterboxd: IconLetterboxd,
  tiktok: IconTikTok,
  x: IconX,
};

const iconVariants = cva('shrink-0', {
  variants: {
    size: {
      sm: 'size-3.5',
      md: 'size-4',
      lg: 'size-4.5',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

interface Props extends Omit<ComponentProps<'svg'>, 'children'>, VariantProps<typeof iconVariants> {
  name: NonNullable<PayloadIconField>;
}

export function Icons({ className, name, size, ...props }: Props) {
  const Icon = icons[name];

  return <Icon {...props} className={cn(iconVariants({ size }), className)} />;
}
