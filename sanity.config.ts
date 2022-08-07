import { createConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { schemaTypes } from './app/sanity/schemas';
import { structure } from './app/sanity/structure';

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
