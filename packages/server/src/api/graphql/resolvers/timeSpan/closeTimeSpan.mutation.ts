import { UnauthenticatedError } from '../../graphqlErrors';
import { MutationCloseTimeSpanArgs, Resolvers } from '../../resolverTypes';

export const closeTimeSpanMutation: Resolvers = {
  Mutation: {
    closeTimeSpan: async (_, { id }: MutationCloseTimeSpanArgs, { userContext, applicationContext }) => {
      if (!userContext) {
        throw new UnauthenticatedError();
      }
      return applicationContext.timeSpanService.close(userContext.id, id);
    },
  },
};