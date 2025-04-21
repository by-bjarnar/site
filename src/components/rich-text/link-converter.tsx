import type { SerializedLinkNode } from '@payloadcms/richtext-lexical';
import Link from 'next/link';

import type { JSXConverter } from '@/components/rich-text';
import { cn } from '@/utils/cn';
import type { PayloadLinkField } from '@/utils/link';
import { linkProps } from '@/utils/link';

export const linkConverter: JSXConverter<SerializedLinkNode> = ({
  additionalClass,
  node,
  nodesToJSX,
  overrideClass,
  parent,
}) => (
  <Link
    {...linkProps(node.fields as unknown as PayloadLinkField)}
    className={overrideClass || cn('underline', additionalClass)}
  >
    {nodesToJSX({ nodes: node.children, parent })}
  </Link>
);
