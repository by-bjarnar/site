import { cva } from 'class-variance-authority';

import { PayloadImage } from '@/components/ui/payload-image';
import type { PayloadImageBlock } from '@/payload/payload-types';

const imageVariants = cva('first:mt-0 last:mb-0', {
  variants: {
    position: {
      center: 'my-6 h-72 w-full object-cover',
      left: 'float-left mb-3 aspect-square object-cover xs:mr-3 xs:mb-0 xs:size-52',
      right: 'float-right mb-3 aspect-square object-cover xs:mr-3 xs:mb-0 xs:size-52',
    },
  },
  defaultVariants: {
    position: 'center',
  },
});

export function ImageBlock({ image, position }: PayloadImageBlock) {
  if (typeof image === 'string') {
    return null;
  }

  return <PayloadImage {...image} className={imageVariants({ position: position })} />;
}
