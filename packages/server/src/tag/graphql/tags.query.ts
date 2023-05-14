import { UnauthenticatedError } from '../../api/graphql/graphqlErrors';
import { QueryTagsArgs, Resolvers } from '../../api/graphql/resolverTypes';

export const tagsQuery: Resolvers = {
  Query: {
    tags: async (_, { input }: QueryTagsArgs, { applicationContext, userContext }) => {
      if (!userContext?.id) {
        throw new UnauthenticatedError();
      }
      return applicationContext.tagService.search(userContext.id, input ?? undefined);
    },
  },
};
