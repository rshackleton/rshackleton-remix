import sanityClient from '@sanity/client';
import { GraphQLClient } from 'graphql-request';
import sanityConfig from '~/../sanity.config';

export const graphqlClient = new GraphQLClient(
  `https://${sanityConfig.projectId}.api.sanity.io/v1/graphql/${sanityConfig.dataset}/default`,
);

export const client = sanityClient({
  dataset: sanityConfig.dataset,
  projectId: sanityConfig.projectId,
  useCdn: true,
});
