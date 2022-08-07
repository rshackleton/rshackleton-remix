module.exports = {
  client: {
    service: {
      name: 'sanity',
      url: `https://u7tariz5.api.sanity.io/v1/graphql/production/default`,
    },
    excludes: ['node_modules/**/*'],
    includes: ['**/*.gql', '**/*.ts'],
  },
};
