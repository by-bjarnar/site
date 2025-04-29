import type { ComponentProps } from 'react';

import { cn } from '@/utils/cn';

type Props = ComponentProps<'textarea'>;

export function Textarea({ className, ...props }: Props) {
  return <textarea rows={4} {...props} className={cn('px-2 py-1.25', className)} />;
}
