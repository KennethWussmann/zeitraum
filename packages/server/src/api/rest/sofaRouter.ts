import { Logger } from '@zeitraum/commons';
import { Response, Router } from 'express';
import { GraphQLSchema } from 'graphql';
import { OpenAPI, useSofa } from 'sofa-api';
import { tokenBasedAuthMiddleware } from '../tokenBasedAuthMiddleware';
import { GraphQLServer } from '../graphql/graphqlServer';
import { findTokenFromGlobalRequest } from '../utils';
import { applicationName } from '../../configuration';

export class SofaRouter {
  router: Router;
  private openApi: ReturnType<typeof OpenAPI>;

  constructor(
    logger: Logger,
    schema: GraphQLSchema,
    graphqlServer: GraphQLServer,
    apiTokens: string[],
    version: string,
    baseUrl: string | undefined,
  ) {
    this.openApi = OpenAPI({
      schema,
      info: {
        title: applicationName,
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
      servers: baseUrl ? [{ url: baseUrl }] : undefined,
    });

    this.router = Router();
    this.router.use(tokenBasedAuthMiddleware(logger, ...apiTokens));
    this.router.use(
      '/api',
      useSofa({
        basePath: '/api',
        schema,
        routes: {
          'Mutation.createTimeSpan': {
            method: 'POST',
            path: '/time-spans',
            tags: ['TimeSpan'],
          },
          'Mutation.deleteTimeSpan': {
            method: 'DELETE',
            path: '/time-spans/:id',
            tags: ['TimeSpan'],
          },
          'Mutation.closeTimeSpan': {
            method: 'PATCH',
            path: '/time-spans/:id/close',
            tags: ['TimeSpan'],
          },
          'Mutation.updateTimeSpan': {
            method: 'PUT',
            path: '/time-spans/:id',
            tags: ['TimeSpan'],
          },
          'Query.timeSpan': {
            method: 'GET',
            path: '/time-spans/:id',
            tags: ['TimeSpan'],
          },
          'Query.timeSpans': {
            method: 'GET',
            path: '/time-spans',
            tags: ['TimeSpan'],
          },
          'Mutation.createPreset': {
            method: 'POST',
            path: '/presets',
            tags: ['Preset'],
          },
          'Mutation.deletePreset': {
            method: 'DELETE',
            path: '/presets/:id',
            tags: ['Preset'],
          },
          'Mutation.updatePreset': {
            method: 'PUT',
            path: '/presets/:id',
            tags: ['Preset'],
          },
          'Mutation.updatePresetSorting': {
            method: 'PATCH',
            path: '/presets/sort',
            tags: ['Preset'],
          },
          'Query.preset': {
            method: 'GET',
            path: '/presets/:id',
            tags: ['Preset'],
          },
          'Query.presets': {
            method: 'GET',
            path: '/presets',
            tags: ['Preset'],
          },
          'Query.tags': {
            method: 'GET',
            path: '/tags',
            tags: ['Tag'],
          },
          'Query.tag': {
            method: 'GET',
            path: '/tags/:id',
            tags: ['Tag'],
          },
          'Query.me': {
            method: 'GET',
            path: '/me',
            tags: ['User'],
          },
          'Query.version': {
            method: 'GET',
            path: '/version',
            tags: ['Misc'],
          },
        },
        context: async ({ request }) => await graphqlServer.buildContext(findTokenFromGlobalRequest(request)),
        onRoute: (info) => {
          this.openApi.addRoute(info, {
            basePath: '/api',
          });
        },
      }),
    );
    this.router.use(['/swagger.json', '/openapi.json', '/docs'], (_, res: Response) => {
      res.setHeader('Content-Type', 'application/json');
      res.send(this.openApi.get());
    });
  }
}
