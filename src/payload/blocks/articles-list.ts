import type { Block } from 'payload';

export const ArticlesList: Block = {
  slug: 'articlesList',
  interfaceName: 'PayloadArticlesListBlock',
  fields: [
    {
      name: 'articles',
      type: 'relationship',
      relationTo: 'articles',
      virtual: true,
      hasMany: true,
      admin: {
        readOnly: true,
      },
      hooks: {
        afterRead: [
          async ({ req, req: { payload } }) => {
            const response = await payload.find({
              collection: 'articles',
              where: { featured: { not_equals: true } },
              user: req.user,
              req,
            });

            return response?.docs?.length ? response.docs : [];
          },
        ],
      },
    },
  ],
};
