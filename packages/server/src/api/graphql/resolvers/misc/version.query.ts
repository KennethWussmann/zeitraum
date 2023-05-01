import { Resolvers } from '../../resolverTypes';

export const versionQuery: Resolvers = {
  Query: {
    version: (_, __, { applicationContext }) => applicationContext.configuration.VERSION,
  },
};
