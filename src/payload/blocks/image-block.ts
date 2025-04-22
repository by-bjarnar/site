import type { Block } from 'payload';

export const Image: Block = {
  slug: 'image',
  interfaceName: 'PayloadImageBlock',
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'image',
          type: 'relationship',
          relationTo: 'images',
          required: true,
          admin: {
            width: '50%',
          },
        },
        {
          name: 'position',
          type: 'select',
          required: true,
          defaultValue: 'center',
          admin: {
            width: '50%',
          },
          options: [
            {
              label: 'Center',
              value: 'center',
            },
            {
              label: 'Left',
              value: 'left',
            },
            {
              label: 'Right',
              value: 'right',
            },
          ],
        },
      ],
    },
  ],
};
