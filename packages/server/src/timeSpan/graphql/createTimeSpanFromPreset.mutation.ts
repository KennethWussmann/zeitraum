import { UnauthenticatedError } from '../../api/graphql/graphqlErrors';
import { MutationCreateTimeSpanFromPresetArgs, Resolvers } from '../../api/graphql/resolverTypes';

export const createTimeSpanFromPresetMutation: Resolvers = {
  Mutation: {
    createTimeSpanFromPreset: async (
      _,
      { input }: MutationCreateTimeSpanFromPresetArgs,
      { userContext, applicationContext },
    ) => {
      if (!userContext) {
        throw new UnauthenticatedError();
      }
      return await applicationContext.timeSpanService.createFromPreset(userContext.id, input);
    },
  },
};
