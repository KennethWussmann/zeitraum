import { UnauthenticatedError } from '../../api/graphql/graphqlErrors';
import { MutationUpdatePresetArgs, Resolvers } from '../../api/graphql/resolverTypes';

export const updatePresetMutation: Resolvers = {
  Mutation: {
    updatePreset: async (_, { id, input }: MutationUpdatePresetArgs, { userContext, applicationContext }) => {
      if (!userContext?.id) {
        throw new UnauthenticatedError();
      }
      return await applicationContext.presetService.update(userContext.id, id, input);
    },
  },
};
