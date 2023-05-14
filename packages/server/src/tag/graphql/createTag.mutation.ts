import { InternalServerError, UnauthenticatedError } from '../../api/graphql/graphqlErrors';
import { MutationCreateTagArgs, Resolvers } from '../../api/graphql/resolverTypes';

export const createTagMutation: Resolvers = {
  Mutation: {
    createTag: async (_, { input: { name } }: MutationCreateTagArgs, { applicationContext, userContext }) => {
      if (!userContext?.id) {
        throw new UnauthenticatedError();
      }
      const tags = await applicationContext.tagService.findByNamesAndCreateMissing(userContext.id, name);
      if (tags.length === 0) {
        throw new InternalServerError('Failed to find or create tag');
      }
      return tags[0];
    },
  },
};
