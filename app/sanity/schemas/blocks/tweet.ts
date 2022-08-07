import { FaTwitter } from 'react-icons/fa';

export default {
  icon: FaTwitter,
  name: 'tweet',
  title: 'Tweet',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'url',
      title: 'URL',
      type: 'url',
    },
  ],
};
