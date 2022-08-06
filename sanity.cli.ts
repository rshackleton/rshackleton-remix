import { createCliConfig } from 'sanity/cli';
import config from './app/sanity/sanity.config';

export default createCliConfig({
  api: {
    projectId: config.projectId,
    dataset: config.dataset,
  },
});
