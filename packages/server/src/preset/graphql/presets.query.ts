import { UnauthenticatedError } from '../../api/graphql/graphqlErrors';
import { QueryPresetsArgs, Resolvers } from '../../api/graphql/resolverTypes';

export const presetsQuery: Resolvers = {
  Query: {
    presets: async (_, { input }: QueryPresetsArgs, { applicationContext, userContext }) => {
      if (!userContext?.id) {
        throw new UnauthenticatedError();
      }
      return applicationContext.presetService.search(userContext.id, {
        limit: input?.limit ?? undefined,
        offset: input?.offset ?? undefined,
      });
    },
  },
};
