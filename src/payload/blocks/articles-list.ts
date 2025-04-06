import type { Block, FieldHook } from 'payload';

const fetchNonFeaturedArticles: FieldHook = async (args) => {
  const {
    req,
    req: { payload },
    operation,
  } = args;

  if (operation === 'read') {
    const response = await payload.find({
      collection: 'articles',
      where: { featured: { not_equals: true } },
      user: req.user,
    });

    return response?.docs?.length ? response.docs : [];
  }
};

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
        afterRead: [fetchNonFeaturedArticles],
      },
    },
  ],
};
