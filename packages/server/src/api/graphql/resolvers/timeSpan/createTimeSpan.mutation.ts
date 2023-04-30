import { UnauthenticatedError } from '../../graphqlErrors';
import { MutationCreateTimeSpanArgs, Resolvers } from '../../resolverTypes';

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
