import type { SerializedLinkNode } from '@payloadcms/richtext-lexical';
import Link from 'next/link';

import type { JSXConverter } from '@/components/rich-text';
import { cn } from '@/lib/utils/cn';
import { linkProps } from '@/lib/utils/link';
import type { PayloadLinkGroupField } from '@/payload/payload-types';

export const linkConverter: JSXConverter<SerializedLinkNode> = ({
  additionalClass,
  node,
  nodesToJSX,
  overrideClass,
  parent,
}) => (
  <Link
    {...linkProps(node.fields as unknown as PayloadLinkGroupField)}
    className={overrideClass || cn(additionalClass)}
  >
    {nodesToJSX({ nodes: node.children, parent })}
  </Link>
);
