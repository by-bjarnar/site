import type { Field } from 'payload';

export const iconField: Field = {
  name: 'icon',
  type: 'select',
  interfaceName: 'PayloadIconField',
  admin: {
    isClearable: true,
  },
  options: [
    {
      label: 'Bluesky',
      value: 'bluesky',
    },
    {
      label: 'Instagram',
      value: 'instagram',
    },
    {
      label: 'Letterboxd',
      value: 'letterboxd',
    },
    {
      label: 'TikTok',
      value: 'tiktok',
    },
    {
      label: 'X',
      value: 'x',
    },
  ],
};
