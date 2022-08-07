import { MdCode } from 'react-icons/md';

export default {
  icon: MdCode,
  name: 'code',
  title: 'Code Block',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'content',
      title: 'Content',
      type: 'text',
    },
    {
      name: 'language',
      title: 'Language',
      type: 'string',
    },
    {
      name: 'sourceUrl',
      title: 'Source URL',
      type: 'url',
    },
  ],
};
