import { UnauthenticatedError } from '../../graphqlErrors';
import { QueryTimeSpansArgs, Resolvers } from '../../resolverTypes';

export const timeSpansQuery: Resolvers = {
  Query: {
    timeSpans: async (_, { input }: QueryTimeSpansArgs, { applicationContext, userContext }) => {
      if (!userContext?.id) {
        throw new UnauthenticatedError();
      }
      return applicationContext.timeSpanService.search(userContext.id, {
        fromInclusive: input?.fromInclusive ?? undefined,
        toInclusive: input?.toInclusive ?? undefined,
        limit: input?.limit ?? undefined,
        offset: input?.offset ?? undefined,
        running: input?.running ?? undefined,
        tags: input?.tags ?? undefined,
      });
    },
  },
};
