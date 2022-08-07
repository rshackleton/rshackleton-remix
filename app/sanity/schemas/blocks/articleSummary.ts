import { MdArticle } from 'react-icons/md';

export default {
  icon: MdArticle,
  name: 'articleSummary',
  title: 'Article Summary',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'article',
      title: 'Article',
      type: 'reference',
      to: [{ type: 'article' }],
    },
  ],
};
