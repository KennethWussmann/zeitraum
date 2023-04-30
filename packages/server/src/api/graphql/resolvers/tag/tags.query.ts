import { UnauthenticatedError } from '../../graphqlErrors';
import { QueryTagsArgs, Resolvers } from '../../resolverTypes';

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
