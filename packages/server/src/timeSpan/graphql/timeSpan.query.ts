import { NotFoundError, UnauthenticatedError } from '../../api/graphql/graphqlErrors';
import { QueryTimeSpanArgs, Resolvers } from '../../api/graphql/resolverTypes';

export const timeSpanQuery: Resolvers = {
  Query: {
    timeSpan: async (_, { id }: QueryTimeSpanArgs, { applicationContext, userContext }) => {
      if (!userContext?.id) {
        throw new UnauthenticatedError();
      }
      const timeSpan = await applicationContext.timeSpanService.findById(userContext.id, id);
      if (!timeSpan) {
        throw new NotFoundError('TimeSpan not found');
      }
      return timeSpan;
    },
  },
};
