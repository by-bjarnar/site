import type { SerializedParagraphNode } from '@payloadcms/richtext-lexical';

import type { JSXConverter } from '@/components/rich-text';
import { cn } from '@/utils/cn';

export const paragraphConverter: JSXConverter<SerializedParagraphNode> = ({
  additionalClass,
  node,
  nodesToJSX,
  overrideClass,
  parent,
}) => {
  const children = nodesToJSX({ nodes: node.children, parent });

  if (!children.length) {
    return <br />;
  }

  return (
    <p className={overrideClass || cn('my-3 first:mt-0 last:mb-0', additionalClass)}>{children}</p>
  );
};
