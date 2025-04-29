import type { PayloadArticlesCollection } from '@/payload/payload-types';

export function articleLinkProps(article: PayloadArticlesCollection) {
  const internal = article.type === 'internal';
  const href = internal ? `/articles/${article.slug}` : article.url;

  return {
    href: href || '/',
    target: internal ? undefined : '_blank',
    rel: internal ? undefined : 'noopener',
    'aria-label': article.title,
    'data-umami-event': 'Featured article',
    'data-umami-event-id': article.slug,
    'data-umami-event-url': href,
  };
}
