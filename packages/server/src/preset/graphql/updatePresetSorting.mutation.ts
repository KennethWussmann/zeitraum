import { UnauthenticatedError } from '../../api/graphql/graphqlErrors';
import { MutationUpdatePresetSortingArgs, Resolvers } from '../../api/graphql/resolverTypes';

export const updatePresetSortingMutation: Resolvers = {
  Mutation: {
    updatePresetSorting: async (_, { input }: MutationUpdatePresetSortingArgs, { userContext, applicationContext }) => {
      if (!userContext?.id) {
        throw new UnauthenticatedError();
      }
      return await applicationContext.presetService.updateSorting(userContext.id, input);
    },
  },
};
