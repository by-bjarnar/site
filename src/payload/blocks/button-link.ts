import type { Block } from 'payload';

import { fields } from '@/payload/fields/button-link';

export const ButtonLink: Block = {
  slug: 'button-link',
  interfaceName: 'PayloadButtonLinkBlock',
  fields: [
    {
      name: 'alignment',
      type: 'select',
      required: true,
      defaultValue: 'left',
      options: [
        {
          label: 'Left',
          value: 'left',
        },
        {
          label: 'Center',
          value: 'center',
        },
        {
          label: 'Right',
          value: 'right',
        },
      ],
    },
    ...fields,
  ],
};
