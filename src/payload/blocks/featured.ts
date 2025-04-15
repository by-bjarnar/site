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
      hooks: {
        afterChange: [
          async ({ value, req, req: { payload } }) => {
            await payload.update({
              collection: 'articles',
              where: { featured: { equals: true } },
              data: { featured: false },
              req,
            });
            await payload.update({
              collection: 'articles',
              where: { id: { in: value } },
              data: { featured: true },
              req,
            });
          },
        ],
      },
    },
  ],
};
