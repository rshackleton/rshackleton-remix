import { createConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { schemaTypes } from './schemas';
import { structure } from './structure';

export default createConfig({
  name: 'default',
  title: 'rshackleton.co.uk',

  projectId: 'u7tariz5',
  dataset: 'production',

  plugins: [deskTool({ structure })],

  schema: {
    types: schemaTypes,
  },

  basePath: '/studio',
});
