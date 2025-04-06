import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils/cn';
import { slugify } from '@/lib/utils/slugify';

type Props = ComponentProps<'section'> & {
  title: string;
};

export function BlockSection({ children, className, title, ...props }: Props) {
  return (
    <section
      className={cn(
        'my-8 flex flex-col border-gold-6 not-last:border-b not-last:pb-8 first:mt-0 last:mb-0',
        className,
      )}
      {...props}
    >
      <h1 id={slugify(title)} className="mb-6 text-4xl xs:text-5xl">
        {title}
      </h1>
      {children}
    </section>
  );
}
