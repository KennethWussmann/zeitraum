import { UnauthenticatedError } from '../../api/graphql/graphqlErrors';
import { MutationDeletePresetArgs, Resolvers } from '../../api/graphql/resolverTypes';

export const deletePresetMutation: Resolvers = {
  Mutation: {
    deletePreset: async (_, { id }: MutationDeletePresetArgs, { userContext, applicationContext }) => {
      if (!userContext) {
        throw new UnauthenticatedError();
      }
      await applicationContext.presetService.delete(userContext.id, id);
      return true;
    },
  },
};
