import Link from 'next/link';

import { PayloadImage } from '@/components/ui/payload-image';
import type { PayloadFeaturedBlock } from '@/payload/payload-types';
import { articleLinkProps } from '@/utils/article';
import { formatDate } from '@/utils/format';

export function FeaturedBlock({ articles }: PayloadFeaturedBlock) {
  const featured = articles?.filter((article) => typeof article !== 'string');

  return (
    <ul className="grid w-full grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-6">
      {featured?.map((article, i) => (
        <li
          key={article.id}
          className="col-span-2 md:first:col-span-4 lg:col-span-2 lg:first:col-span-3 lg:nth-2:col-span-3"
        >
          <div className="mb-2 flex items-baseline justify-between gap-2 border-t-2 border-dotted border-gold-6 pt-2 font-sans text-sm font-medium">
            <p>{article.urlMetadata?.site}</p>
            <time dateTime={article.published || undefined}>{formatDate(article.published)}</time>
          </div>
          {article.image && typeof article.image !== 'string' ? (
            <PayloadImage
              {...article.image}
              data-index={i}
              className="mb-4 h-48 w-full object-cover md:h-64 data-[index=1]:md:h-48 data-[index=2]:md:h-48 data-[index=3]:md:h-48 data-[index=4]:md:h-48 data-[index=1]:lg:h-64"
            />
          ) : null}
          <Link {...articleLinkProps(article)} className="mb-2 block text-2xl underline-offset-8">
            <h2 className="text-inherit">{article.title}</h2>
          </Link>
          <p>{article.description}</p>
        </li>
      ))}
    </ul>
  );
}
