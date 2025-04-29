import type { ComponentProps } from 'react';

import { cn } from '@/utils/cn';

export function Input({ className, ...props }: ComponentProps<'input'>) {
  return <input className={cn('h-9', className)} {...props} />;
}
