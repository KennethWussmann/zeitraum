import { UnauthenticatedError } from '../../api/graphql/graphqlErrors';
import { MutationDeleteTimeSpanArgs, Resolvers } from '../../api/graphql/resolverTypes';

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
