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
      label: 'Arrow Right',
      value: 'arrowRight',
    },
    {
      label: 'Bluesky',
      value: 'bluesky',
    },
    {
      label: 'Close',
      value: 'close',
    },
    {
      label: 'Fiverr',
      value: 'fiverr',
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
