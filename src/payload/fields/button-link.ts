import type { Field } from 'payload';

import { iconField } from '@/payload/fields/icon';
import { linkGroup } from '@/payload/fields/link';

export const fields: Field[] = [
  {
    type: 'row',
    fields: [
      {
        name: 'variant',
        type: 'select',
        interfaceName: 'PayloadButtonVariantField',
        admin: {
          width: '50%',
        },
        required: true,
        defaultValue: 'primary',
        options: [
          {
            label: 'Primary',
            value: 'primary',
          },
          {
            label: 'Secondary',
            value: 'secondary',
          },
          {
            label: 'Tertiary',
            value: 'tertiary',
          },
        ],
      },
      {
        name: 'size',
        type: 'select',
        interfaceName: 'PayloadButtonSizeField',
        admin: {
          width: '50%',
        },
        required: true,
        defaultValue: 'md',
        options: [
          {
            label: 'Small',
            value: 'sm',
          },
          {
            label: 'Medium',
            value: 'md',
          },
          {
            label: 'Large',
            value: 'lg',
          },
        ],
      },
    ],
  },
  {
    type: 'row',
    fields: [
      iconField,
      {
        name: 'iconPosition',
        type: 'select',
        interfaceName: 'PayloadButtonIconPositionField',
        admin: {
          condition: (_, siblingData) => !!siblingData?.icon,
          width: '50%',
        },
        required: true,
        defaultValue: 'none',
        options: [
          {
            label: 'Left',
            value: 'left',
          },
          {
            label: 'Right',
            value: 'right',
          },
          {
            label: 'Center',
            value: 'center',
          },
        ],
      },
    ],
  },
  linkGroup,
];

export const buttonLinkGroup: Field = {
  name: 'buttonLink',
  type: 'group',
  interfaceName: 'PayloadButtonLinkGroupField',
  fields,
};

export const buttonLinkArray: Field = {
  name: 'buttonLinks',
  type: 'array',
  interfaceName: 'PayloadButtonLinkArrayField',
  admin: {
    components: {
      RowLabel: {
        path: '@/payload/components/row-label.tsx',
        exportName: 'RowLabel',
        clientProps: {
          path: 'link.text',
          fallback: 'Button Link',
        },
      },
    },
  },
  fields,
};
