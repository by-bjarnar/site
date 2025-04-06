import { BlocksFeature, lexicalEditor } from '@payloadcms/richtext-lexical';
import type { Block } from 'payload';

import { ArticlesList } from '@/payload/blocks/articles-list';
import { Featured } from '@/payload/blocks/featured';

export const Section: Block = {
  slug: 'section',
  interfaceName: 'PayloadSectionBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          BlocksFeature({ blocks: [Featured, ArticlesList] }),
        ],
      }),
    },
  ],
};
