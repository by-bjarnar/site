import type { SerializedHorizontalRuleNode } from '@payloadcms/richtext-lexical';

import type { JSXConverter } from '@/components/rich-text';
import { cn } from '@/lib/utils/cn';

export const horizontalRuleConverter: JSXConverter<SerializedHorizontalRuleNode> = ({
  additionalClass,
  overrideClass,
}) => (
  <hr
    className={
      overrideClass || cn('my-6 border-t border-t-gold-6 first:mt-0 last:mb-0', additionalClass)
    }
  />
);
