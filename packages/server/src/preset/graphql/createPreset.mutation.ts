import { UnauthenticatedError } from '../../api/graphql/graphqlErrors';
import { MutationCreatePresetArgs, Resolvers } from '../../api/graphql/resolverTypes';

export const createPresetMutation: Resolvers = {
  Mutation: {
    createPreset: async (_, { input }: MutationCreatePresetArgs, { userContext, applicationContext }) => {
      if (!userContext) {
        throw new UnauthenticatedError();
      }
      return await applicationContext.presetService.create(userContext.id, input);
    },
  },
};
