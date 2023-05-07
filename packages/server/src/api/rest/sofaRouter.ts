import { Logger } from '@zeitraum/commons';
import { Response, Router } from 'express';
import { GraphQLSchema } from 'graphql';
import { OpenAPI, useSofa } from 'sofa-api';
import { tokenBasedAuthMiddleware } from '../tokenBasedAuthMiddleware';
import { GraphQLServer } from '../graphql/graphqlServer';
import { findTokenFromGlobalRequest } from '../utils';

export class SofaRouter {
  router: Router;
  private openApi: ReturnType<typeof OpenAPI>;

  constructor(
    private logger: Logger,
    version: string,
    schema: GraphQLSchema,
    private graphqlServer: GraphQLServer,
    private apiTokens: string[],
  ) {
    this.openApi = OpenAPI({
      schema,
      info: {
        title: 'Zeitraum',
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
    });

    this.router = Router();
    this.router.use(tokenBasedAuthMiddleware(this.logger, ...this.apiTokens));
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
            path: '/time-spans/:id',
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
        context: async ({ request }) => await this.graphqlServer.buildContext(findTokenFromGlobalRequest(request)),
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
