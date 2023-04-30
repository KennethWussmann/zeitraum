import { UnauthenticatedError } from '../../graphqlErrors';
import { MutationDeleteTimeSpanArgs, Resolvers } from '../../resolverTypes';

export const deleteTimeSpanMutation: Resolvers = {
  Mutation: {
    deleteTimeSpan: async (_, { id }: MutationDeleteTimeSpanArgs, { userContext, applicationContext }) => {
      if (!userContext) {
        throw new UnauthenticatedError();
      }
      await applicationContext.timeSpanService.delete(userContext.id, id);
      return true;
    },
  },
};
