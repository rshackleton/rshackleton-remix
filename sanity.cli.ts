import { createCliConfig } from 'sanity/cli';
import config from './sanity.config';

export default createCliConfig({
  api: {
    projectId: config.projectId,
    dataset: config.dataset,
  },
});
