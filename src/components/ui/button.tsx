'use client';

import { mergeProps } from '@base-ui-components/react/merge-props';
import { useRender } from '@base-ui-components/react/use-render';
import { type VariantProps, cva } from 'class-variance-authority';

import { cn } from '@/utils/cn';

const buttonVariants = cva(
  'inline-flex shrink-0 items-center justify-center rounded-sm font-medium no-underline transition',
  {
    variants: {
      variant: {
        primary: 'bg-green-11 text-green-1 hover:bg-green-12 hover:text-green-2',
        secondary:
          'border border-gold-6 bg-gold-3 text-gold-11 hover:border-gold-8 hover:bg-gold-4 hover:text-gold-12',
        tertiary: 'hover:bg-gold-4 hover:text-gold-12',
      },
      size: {
        sm: 'h-8 gap-1 text-xs',
        md: 'h-9 gap-1.5 text-sm',
        lg: 'h-10 gap-2 text-base',
      },
      iconPosition: {
        left: 'flex-row-reverse',
        right: 'flex-row',
        center: 'flex-row',
        none: 'flex-row',
      },
    },
    compoundVariants: [
      {
        iconPosition: 'none',
        size: 'sm',
        className: 'px-3',
      },
      {
        iconPosition: 'none',
        size: 'md',
        className: 'px-4',
      },
      {
        iconPosition: 'none',
        size: 'lg',
        className: 'px-5',
      },
      {
        iconPosition: 'left',
        size: 'sm',
        className: 'pr-3 pl-2',
      },
      {
        iconPosition: 'left',
        size: 'md',
        className: 'pr-4 pl-3',
      },
      {
        iconPosition: 'left',
        size: 'lg',
        className: 'pr-5 pl-4',
      },
      {
        iconPosition: 'right',
        size: 'sm',
        className: 'pr-2 pl-3',
      },
      {
        iconPosition: 'right',
        size: 'md',
        className: 'pr-3 pl-4',
      },
      {
        iconPosition: 'right',
        size: 'lg',
        className: 'pr-4 pl-5',
      },
      {
        iconPosition: 'center',
        size: 'sm',
        className: 'size-8',
      },
      {
        iconPosition: 'center',
        size: 'md',
        className: 'size-9',
      },
      {
        iconPosition: 'center',
        size: 'lg',
        className: 'size-10',
      },
    ],
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      iconPosition: 'none',
    },
  },
);

type Props = useRender.ComponentProps<'button'> & VariantProps<typeof buttonVariants>;

export function Button({
  className,
  iconPosition,
  render = <button />,
  size,
  variant,
  ...props
}: Props) {
  const defaultProps: Props = {
    className: cn(buttonVariants({ variant, size, iconPosition }), className),
  };

  const { renderElement } = useRender({ render, props: mergeProps(defaultProps, props) });

  return renderElement();
}
