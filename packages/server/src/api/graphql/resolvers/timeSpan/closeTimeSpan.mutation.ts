import { UnauthenticatedError } from '../../graphqlErrors';
import { MutationCloseTimeSpanArgs, Resolvers } from '../../resolverTypes';

export const closeTimeSpanMutation: Resolvers = {
  Mutation: {
    closeTimeSpan: async (_, { id, end }: MutationCloseTimeSpanArgs, { userContext, applicationContext }) => {
      if (!userContext) {
        throw new UnauthenticatedError();
      }
      console.log('closeTimeSpanMutation', id, end);
      return applicationContext.timeSpanService.close(userContext.id, id ?? undefined, end ?? new Date());
    },
  },
};
