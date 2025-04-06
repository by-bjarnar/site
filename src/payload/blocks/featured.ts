import type { Block, FieldHook } from 'payload';

import type { PayloadFeaturedBlock } from '@/payload/payload-types';

const setFeaturedArticles: FieldHook<any, any, PayloadFeaturedBlock> = async (args) => {
  const {
    req: { payload },
    operation,
    siblingData,
  } = args;

  if (operation === 'create' || operation === 'update') {
    await payload.update({
      collection: 'articles',
      where: { featured: { equals: true } },
      data: { featured: false },
    });
    await payload.update({
      collection: 'articles',
      where: { id: { in: siblingData?.articles } },
      data: { featured: true },
    });
  }
};

export const Featured: Block = {
  slug: 'featured',
  interfaceName: 'PayloadFeaturedBlock',
  fields: [
    {
      name: 'articles',
      type: 'relationship',
      relationTo: 'articles',
      hasMany: true,
      hooks: {
        beforeChange: [setFeaturedArticles],
      },
    },
  ],
};
