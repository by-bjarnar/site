import Link from 'next/link';

import { PayloadImage } from '@/components/ui/payload-image';
import { articleDate, articleLinkProps } from '@/lib/utils/article';
import { formatDate } from '@/lib/utils/format';
import type { PayloadFeaturedBlock } from '@/payload/payload-types';

export function FeaturedBlock({ articles }: PayloadFeaturedBlock) {
  const featured = articles?.filter((article) => typeof article !== 'string');

  return (
    <ul className="grid w-full grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-6">
      {featured?.map((article) => (
        <li
          key={article.id}
          className="col-span-2 md:first:col-span-4 lg:col-span-2 lg:first:col-span-3 lg:nth-2:col-span-3"
        >
          <div className="mb-2 flex items-baseline justify-between gap-2 border-t-2 border-dotted border-gold-6 pt-2 font-sans text-sm font-medium">
            <p>{article.urlMetadata?.site}</p>
            <time dateTime={articleDate(article) || undefined}>
              {formatDate(articleDate(article))}
            </time>
          </div>
          {article.image && typeof article.image !== 'string' ? (
            <PayloadImage {...article.image} className="mb-4 h-64 w-full object-cover" />
          ) : null}
          <h2 className="mb-2 text-2xl">
            <Link {...articleLinkProps(article)}>{article.title}</Link>
          </h2>
          <p>{article.description}</p>
        </li>
      ))}
    </ul>
  );
}
