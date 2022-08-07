import { MdArticle } from 'react-icons/md';

export default {
  icon: MdArticle,
  name: 'article',
  title: 'Article',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
    },
    {
      name: 'date',
      title: 'Date',
      type: 'date',
    },
    {
      name: 'banner',
      title: 'Banner',
      type: 'image',
    },
    {
      name: 'summary',
      title: 'Summary',
      type: 'text',
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        { type: 'articleSummary' },
        { type: 'block' },
        { type: 'code' },
        { type: 'image' },
        { type: 'tweet' },
      ],
    },
  ],
};
