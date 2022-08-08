import { MdLink } from 'react-icons/md';

export default {
  icon: MdLink,
  name: 'link',
  title: 'Link',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'type',
      title: 'Type',
      type: 'string',
      initialValue: 'url',
      options: {
        layout: 'radio',
        list: ['url', 'reference'],
      },
    },
    {
      name: 'toRef',
      title: 'To Reference',
      type: 'reference',
      to: [{ type: 'article' }, { type: 'home' }, { type: 'contentpage' }],
      hidden: ({ parent }: any) => parent?.type !== 'reference',
    },
    {
      name: 'toUrl',
      title: 'To URL',
      type: 'string',
      hidden: ({ parent }: any) => parent?.type !== 'url',
    },
  ],
};
