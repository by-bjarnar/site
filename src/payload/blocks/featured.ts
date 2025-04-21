import type { Block } from 'payload';

export const Featured: Block = {
  slug: 'featured',
  interfaceName: 'PayloadFeaturedBlock',
  fields: [
    {
      name: 'articles',
      type: 'relationship',
      relationTo: 'articles',
      hasMany: true,
      required: true,
      minRows: 5,
      maxRows: 5,
    },
  ],
};
