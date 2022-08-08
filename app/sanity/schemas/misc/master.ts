import { MdSettings } from 'react-icons/md';

export default {
  icon: MdSettings,
  name: 'master',
  title: 'Master',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'navigation',
      title: 'Navigation',
      type: 'array',
      of: [{ type: 'link' }],
    },
  ],
};
