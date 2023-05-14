import { UnauthenticatedError } from '../../api/graphql/graphqlErrors';
import { MutationUpdateTimeSpanArgs, Resolvers } from '../../api/graphql/resolverTypes';

export const updateTimeSpanMutation: Resolvers = {
  Mutation: {
    updateTimeSpan: async (_, { id, input }: MutationUpdateTimeSpanArgs, { userContext, applicationContext }) => {
      if (!userContext) {
        throw new UnauthenticatedError();
      }
      return await applicationContext.timeSpanService.update(userContext.id, id, input);
    },
  },
};
