import { RichText } from '@/components/rich-text';
import type { PayloadSectionBlock } from '@/payload/payload-types';
import { slugify } from '@/utils/slugify';

export function SectionBlock({ title, content }: PayloadSectionBlock) {
  return (
    <section className="my-8 border-gold-6 not-last:border-b not-last:pb-8 first:mt-0 last:mb-0">
      <h1 id={slugify(title)} className="mb-6 text-4xl xs:text-5xl">
        {title}
      </h1>
      <RichText data={content} />
    </section>
  );
}
