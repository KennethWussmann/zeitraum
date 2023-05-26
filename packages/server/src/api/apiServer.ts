import express, { Application } from 'express';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServer } from '@apollo/server';
import { Logger } from '@zeitraum/commons';
import { ApplicationContext } from '../applicationContext';
import { Server } from 'http';
import { findTokenFromExpressRequest } from './utils';
import { Lightship } from 'lightship';
import cors from 'cors';

export class ApiServer {
  private httpServer: Server | undefined = undefined;
  constructor(private logger: Logger, private applicationContext: ApplicationContext, private serverPort: number) {}

  private createApp = (apolloServer: ApolloServer): Application => {
    const app = express();
    app.use(express.json());

    if (this.applicationContext.configuration.CORS_ENABLE) {
      this.logger.debug('CORS is enabled, to disable it set CORS_ENABLE=false');
      app.use(cors());
    }

    app.use(this.applicationContext.metricsRouter.router);
    app.use(this.applicationContext.icalRouter.router);
    app.use(
      '/graphql',
      expressMiddleware(apolloServer, {
        context: ({ req }) => this.applicationContext.graphqlServer.buildContext(findTokenFromExpressRequest(req)),
      }),
    );
    return app;
  };

  startServer = async (lightship: Lightship | undefined = undefined) => {
    const { server } = await this.applicationContext.graphqlServer.start();
    const app = this.createApp(server);
    this.httpServer = app
      .listen(this.serverPort, () => {
        this.logger.info(`API server started on port ${this.serverPort}`);
        lightship?.signalReady();
      })
      .on('error', () => {
        void lightship?.shutdown();
      });

    lightship?.registerShutdownHandler(async () => {
      await this.stopServer();
    });
  };

  private stopServer = async () => {
    if (!this.httpServer) {
      return Promise.resolve();
    }
    return new Promise((resolve, reject) => {
      this.httpServer?.close((error) => {
        if (error) {
          reject(error);
        } else {
          resolve(undefined);
        }
      });
    });
  };
}
