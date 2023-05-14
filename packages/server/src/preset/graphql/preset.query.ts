import { NotFoundError, UnauthenticatedError } from '../../api/graphql/graphqlErrors';
import { QueryPresetArgs, Resolvers } from '../../api/graphql/resolverTypes';

export const presetQuery: Resolvers = {
  Query: {
    preset: async (_, { id }: QueryPresetArgs, { applicationContext, userContext }) => {
      if (!userContext?.id) {
        throw new UnauthenticatedError();
      }
      const preset = await applicationContext.presetService.findById(userContext.id, id);
      if (!preset) {
        throw new NotFoundError('Preset not found');
      }
      return preset;
    },
  },
};
