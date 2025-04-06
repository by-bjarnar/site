import Link from 'next/link';

import { articleDate, articleLinkProps } from '@/lib/utils/article';
import { formatDate } from '@/lib/utils/format';
import type { PayloadArticlesListBlock } from '@/payload/payload-types';

export function ArticlesListBlock({ articles }: PayloadArticlesListBlock) {
  const filteredArticles = articles?.filter((article) => typeof article !== 'string');

  return (
    <ul className="flex flex-col gap-6">
      {filteredArticles?.map((article) => (
        <li key={article.id}>
          <Link
            {...articleLinkProps(article)}
            className="group relative isolate grid gap-1 border-0 text-gold-11 md:grid-cols-12 md:gap-4"
          >
            <span className="z-10 font-medium md:col-span-8"> {article.title}</span>
            <span className="z-10 hidden text-gold-10 group-hover:text-gold-11 md:col-span-2 md:block">
              {article.urlMetadata?.site}
            </span>
            <time
              dateTime={articleDate(article) || undefined}
              className="z-10 hidden text-right whitespace-nowrap text-gold-10 group-hover:text-gold-11 md:col-span-2 md:block"
            >
              {formatDate(articleDate(article))}
            </time>
            <span className="z-10 flex flex-row gap-2 text-sm md:hidden">
              <span className="z-10 text-gold-10 group-hover:text-gold-11 md:col-span-2">
                {article.urlMetadata?.site}
              </span>
              •
              <time
                dateTime={articleDate(article) || undefined}
                className="z-10 text-right whitespace-nowrap text-gold-10 group-hover:text-gold-11 md:col-span-2"
              >
                {formatDate(articleDate(article))}
              </time>
            </span>
            <span className="absolute -inset-x-4 -inset-y-3 rounded-sm group-hover:bg-gold-3" />
          </Link>
        </li>
      ))}
    </ul>
  );
}
