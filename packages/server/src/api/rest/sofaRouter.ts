import { Logger } from '@zeitraum/commons';
import { Router } from 'express';
import { GraphQLSchema } from 'graphql';
import { useSofa } from 'sofa-api';
import { tokenBasedAuthMiddleware } from '../tokenBasedAuthMiddleware';
import { GraphQLServer } from '../graphql/graphqlServer';
import { findTokenFromGlobalRequest } from '../utils';
import { applicationName } from '../../configuration';

enum Tag {
  TimeSpan = 'TimeSpan',
  Preset = 'Preset',
  Tag = 'Tag',
  User = 'User',
  Misc = 'Misc',
}

const restBasePath = '/api';

export class SofaRouter {
  router: Router;

  constructor(
    logger: Logger,
    schema: GraphQLSchema,
    graphqlServer: GraphQLServer,
    apiTokens: string[],
    version: string,
    baseUrl: string | undefined,
  ) {
    this.router = Router();
    this.router.use(tokenBasedAuthMiddleware(logger, ...apiTokens));
    this.router.use(
      restBasePath,
      useSofa({
        basePath: restBasePath,
        schema,
        swaggerUI: {
          endpoint: '/docs',
        },
        openAPI: {
          endpoint: '/openapi.json',
          info: {
            title: applicationName,
            description: `REST API for ${applicationName} Server version ${version}`,
            version,
          },
          components: {
            securitySchemes: {
              bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
              },
            },
          },
          security: [
            {
              bearerAuth: [],
            },
          ],
          tags: Object.values(Tag).map((name) => ({ name })),
          servers: baseUrl ? [{ url: baseUrl }] : undefined,
        },
        routes: {
          'Mutation.createTimeSpan': {
            method: 'POST',
            path: `${restBasePath}/time-spans`,
            tags: [Tag.TimeSpan],
          },
          'Mutation.deleteTimeSpan': {
            method: 'DELETE',
            path: `${restBasePath}/time-spans/:id`,
            tags: [Tag.TimeSpan],
          },
          'Mutation.closeTimeSpan': {
            method: 'PATCH',
            path: `${restBasePath}/time-spans/:id/close`,
            tags: [Tag.TimeSpan],
          },
          'Mutation.updateTimeSpan': {
            method: 'PUT',
            path: `${restBasePath}/time-spans/:id`,
            tags: [Tag.TimeSpan],
          },
          'Query.timeSpan': {
            method: 'GET',
            path: `${restBasePath}/time-spans/:id`,
            tags: [Tag.TimeSpan],
          },
          'Query.timeSpans': {
            method: 'GET',
            path: `${restBasePath}/time-spans`,
            tags: [Tag.TimeSpan],
          },
          'Mutation.createPreset': {
            method: 'POST',
            path: `${restBasePath}/presets`,
            tags: [Tag.Preset],
          },
          'Mutation.deletePreset': {
            method: 'DELETE',
            path: `${restBasePath}/presets/:id`,
            tags: [Tag.Preset],
          },
          'Mutation.updatePreset': {
            method: 'PUT',
            path: `${restBasePath}/presets/:id`,
            tags: [Tag.Preset],
          },
          'Mutation.updatePresetSorting': {
            method: 'PATCH',
            path: `${restBasePath}/presets/sort`,
            tags: [Tag.Preset],
          },
          'Query.preset': {
            method: 'GET',
            path: `${restBasePath}/presets/:id`,
            tags: [Tag.Preset],
          },
          'Query.presets': {
            method: 'GET',
            path: `${restBasePath}/presets`,
            tags: [Tag.Preset],
          },
          'Query.tags': {
            method: 'GET',
            path: `${restBasePath}/tags`,
            tags: [Tag.Tag],
          },
          'Query.tag': {
            method: 'GET',
            path: `${restBasePath}/tags/:id`,
            tags: [Tag.Tag],
          },
          'Mutation.createTag': {
            method: 'POST',
            path: `${restBasePath}/tags`,
            tags: [Tag.Tag],
          },
          'Query.me': {
            method: 'GET',
            path: `${restBasePath}/me`,
            tags: [Tag.User],
          },
          'Query.version': {
            method: 'GET',
            path: `${restBasePath}/version`,
            tags: [Tag.Misc],
          },
        },
        context: async ({ request }) => await graphqlServer.buildContext(findTokenFromGlobalRequest(request)),
      }),
    );
  }
}
