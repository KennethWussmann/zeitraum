import { makeExecutableSchema } from '@graphql-tools/schema';
import { ApolloServer } from '@apollo/server';
import { loadSchema } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { Logger } from '@zeitraum/commons';
import { ApplicationContext } from '../applicationContext';
import { Resolvers } from './resolverTypes';
import { GraphQLContext, UserContext } from './graphqlContext';
import { meQuery } from './resolvers/user/me.query';
import { createTimeSpanMutation } from './resolvers/timeSpan/createTimeSpan.mutation';
import { timeSpanResolver } from './resolvers/timeSpan/timeSpan.resolver';
import { tagResolver } from './resolvers/tag/tag.resolver';
import { userResolver } from './resolvers/user/user.resolver';
import { updateTimeSpanMutation } from './resolvers/timeSpan/updateTimeSpan.mutation';
import { deleteTimeSpanMutation } from './resolvers/timeSpan/deleteTimeSpan.mutation';
import { mergeResolvers } from '@graphql-tools/merge';
import { tagsQuery } from './resolvers/tag/tags.query';
import { timeSpansQuery } from './resolvers/timeSpan/timeSpans.query';
import { UnauthenticatedError } from './graphqlErrors';
import { timeSpanQuery } from './resolvers/timeSpan/timeSpan.query';

export class GraphQLServer {
  private readonly resolverBuilders: Resolvers = [
    timeSpanResolver,
    timeSpanQuery,
    timeSpansQuery,
    createTimeSpanMutation,
    deleteTimeSpanMutation,
    updateTimeSpanMutation,

    tagResolver,
    tagsQuery,

    userResolver,
    meQuery,
  ];
  private readonly resolvers: Resolvers = mergeResolvers(this.resolverBuilders);

  constructor(
    private logger: Logger,
    private applicationContext: ApplicationContext,
    private validApiTokens: string[],
  ) {
    this.logger.debug('Valid API tokens', { validApiTokens });
  }

  private getHeaderValue = (headers: Record<string, string | string[] | undefined>, key: string) => {
    const value = headers[key];
    if (Array.isArray(value)) {
      return value[0];
    }
    return value;
  };

  buildContext = async (headers: Record<string, string | string[] | undefined>): Promise<GraphQLContext> => {
    this.logger.debug('Authorizing GraphQL request');
    const token = this.getHeaderValue(headers, 'authorization')?.replace('Bearer ', '');
    const authenticated = token && this.validApiTokens.includes(token);
    if (!authenticated) {
      throw new UnauthenticatedError();
    }
    const user = await this.applicationContext.userService.getRoot();
    if (!user) {
      throw new UnauthenticatedError();
    }
    this.logger.debug('Access to GraphQL granted');
    const userContext = new UserContext(user);
    return {
      applicationContext: this.applicationContext,
      userContext: userContext,
      logger: this.logger.child({ userId: userContext.id }),
    };
  };

  start = async () => {
    const schema = makeExecutableSchema({
      resolvers: this.resolvers,
      typeDefs: await loadSchema('**/schema.graphql', {
        loaders: [new GraphQLFileLoader()],
      }),
    });
    const server = new ApolloServer({
      schema,
      introspection: false,
      logger: this.logger,
    });
    await server.start();
    return server;
  };
}
