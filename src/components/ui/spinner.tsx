import type { ComponentProps } from 'react';

import { cn } from '@/utils/cn';

export function Spinner({ className, ...props }: ComponentProps<'span'>) {
  return (
    <span
      {...props}
      className={cn(
        'size-3 animate-spin rounded-full border-[1.5px] border-gold-6 border-t-gold-8',
        className,
      )}
    />
  );
}
