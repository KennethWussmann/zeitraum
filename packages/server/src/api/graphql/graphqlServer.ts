import { makeExecutableSchema } from '@graphql-tools/schema';
import { ApolloServer } from '@apollo/server';
import { typeDefs as scalarTypeDefs } from 'graphql-scalars';
import { loadSchema } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { Logger } from '@zeitraum/commons';
import { ApplicationContext } from '../../applicationContext';
import { Resolvers } from './resolverTypes';
import { GraphQLContext, UserContext } from './graphqlContext';
import { mergeResolvers } from '@graphql-tools/merge';
import { UnauthenticatedError } from './graphqlErrors';
import { versionQuery } from './resolvers/misc/version.query';
import { timeSpanResolver } from '../../timeSpan/graphql/timeSpan.resolver';
import { timeSpanQuery } from '../../timeSpan/graphql/timeSpan.query';
import { timeSpansQuery } from '../../timeSpan/graphql/timeSpans.query';
import { createTimeSpanMutation } from '../../timeSpan/graphql/createTimeSpan.mutation';
import { deleteTimeSpanMutation } from '../../timeSpan/graphql/deleteTimeSpan.mutation';
import { updateTimeSpanMutation } from '../../timeSpan/graphql/updateTimeSpan.mutation';
import { closeTimeSpanMutation } from '../../timeSpan/graphql/closeTimeSpan.mutation';
import { tagResolver } from '../../tag/graphql/tag.resolver';
import { tagsQuery } from '../../tag/graphql/tags.query';
import { userResolver } from './resolvers/user/user.resolver';
import { meQuery } from './resolvers/user/me.query';
import { presetResolver } from '../../preset/graphql/preset.resolver';
import { presetQuery } from '../../preset/graphql/preset.query';
import { presetsQuery } from '../../preset/graphql/presets.query';
import { createPresetMutation } from '../../preset/graphql/createPreset.mutation';
import { deletePresetMutation } from '../../preset/graphql/deletePreset.mutation';
import { updatePresetMutation } from '../../preset/graphql/updatePreset.mutation';
import { updatePresetSortingMutation } from '../../preset/graphql/updatePresetSorting.mutation';

export class GraphQLServer {
  private readonly resolverBuilders: Resolvers = [
    versionQuery,

    timeSpanResolver,
    timeSpanQuery,
    timeSpansQuery,
    createTimeSpanMutation,
    deleteTimeSpanMutation,
    updateTimeSpanMutation,
    closeTimeSpanMutation,

    tagResolver,
    tagsQuery,

    presetResolver,
    presetQuery,
    presetsQuery,
    createPresetMutation,
    deletePresetMutation,
    updatePresetMutation,
    updatePresetSortingMutation,

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

  buildContext = async (token: string | undefined): Promise<GraphQLContext> => {
    this.logger.debug('Authorizing GraphQL request');
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
      typeDefs: [
        await loadSchema('**/schema.graphql', {
          loaders: [new GraphQLFileLoader()],
        }),
        scalarTypeDefs,
      ],
    });
    const server = new ApolloServer({
      schema,
      introspection: false,
      logger: this.logger,
    });
    await server.start();
    return { server, schema };
  };
}
