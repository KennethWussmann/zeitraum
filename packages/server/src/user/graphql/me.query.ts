import { GraphQLContext } from '../../api/graphql/graphqlContext';
import { Resolvers } from '../../api/graphql/resolverTypes';
import { InternalServerError, UnauthenticatedError } from '../../api/graphql/graphqlErrors';

export const meQuery: Resolvers = {
  Query: {
    me: async (_, __, { userContext, applicationContext, logger }: GraphQLContext) => {
      logger.debug('Me query', { userContext });
      if (!userContext?.id) {
        throw new UnauthenticatedError();
      }
      const user = await applicationContext.userService.findById(userContext.id);
      if (!user) {
        throw new InternalServerError('Root user does not exist!');
      }
      logger.debug('User found', { user });
      return user;
    },
  },
};
