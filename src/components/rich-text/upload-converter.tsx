import type { SerializedUploadNode } from '@payloadcms/richtext-lexical';

import type { JSXConverter } from '@/components/rich-text';
import { PayloadImage } from '@/components/ui/payload-image';
import { cn } from '@/utils/cn';

export const uploadConverter: JSXConverter<SerializedUploadNode> = ({
  additionalClass,
  node,
  overrideClass,
}) => {
  if (
    node.relationTo !== 'images' ||
    !node.value ||
    typeof node.value === 'string' ||
    typeof node.value === 'number'
  ) {
    return null;
  }

  return (
    <PayloadImage
      {...node.value}
      className={
        overrideClass || cn('my-6 h-72 w-full object-cover first:mt-0 last:mb-0', additionalClass)
      }
    />
  );
};
