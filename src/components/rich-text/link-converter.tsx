import type { SerializedLinkNode } from '@payloadcms/richtext-lexical';
import Link from 'next/link';

import type { JSXConverter } from '@/components/rich-text';
import { cn } from '@/utils/cn';
import { linkProps } from '@/utils/link';

export const linkConverter: JSXConverter<SerializedLinkNode> = ({
  additionalClass,
  node,
  nodesToJSX,
  overrideClass,
  parent,
}) => (
  // @ts-expect-error – valid types
  <Link {...linkProps(node.fields)} className={overrideClass || cn('underline', additionalClass)}>
    {nodesToJSX({ nodes: node.children, parent })}
  </Link>
);
