import type { Field, GlobalConfig } from 'payload';

import { Role, hasRole } from '@/payload/access';
import { iconField } from '@/payload/fields/icon';
import { linkArray } from '@/payload/fields/link';
import { revalidateGlobalAfterChange } from '@/payload/hooks/revalidate-global';
import { deepMerge } from '@/payload/utils/deep-merge';

export const Footer: GlobalConfig = {
  slug: 'footer',
  typescript: {
    interface: 'PayloadFooterGlobal',
  },
  access: {
    read: () => true,
    update: hasRole(Role.Admin),
  },
  hooks: {
    afterChange: [revalidateGlobalAfterChange],
  },
  fields: [deepMerge<Field>(linkArray, { name: 'socialLinks', fields: [iconField] })],
};
