import { UnauthenticatedError } from '../../api/graphql/graphqlErrors';
import { MutationCreateTimeSpanArgs, Resolvers } from '../../api/graphql/resolverTypes';

export const createTimeSpanMutation: Resolvers = {
  Mutation: {
    createTimeSpan: async (_, { input }: MutationCreateTimeSpanArgs, { userContext, applicationContext }) => {
      if (!userContext) {
        throw new UnauthenticatedError();
      }
      return await applicationContext.timeSpanService.create(userContext.id, input);
    },
  },
};
