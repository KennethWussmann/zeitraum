import express, { Application } from 'express';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServer } from '@apollo/server';
import { Logger } from '@zeitraum/commons';
import { ApplicationContext } from '../applicationContext';
import { Server } from 'http';

export class ApiServer {
  private httpServer: Server | undefined = undefined;
  constructor(private logger: Logger, private applicationContext: ApplicationContext, private serverPort: number) {}

  private createApp = (apolloServer: ApolloServer): Application => {
    const app = express();
    app.use(express.json());
    app.use(
      '/graphql',
      expressMiddleware(apolloServer, {
        context: ({ req }) => this.applicationContext.graphqlServer.buildContext(req.headers),
      }),
    );
    return app;
  };

  startServer = async () => {
    const apolloServer = await this.applicationContext.graphqlServer.start();
    const app = this.createApp(apolloServer);
    this.httpServer = app.listen(this.serverPort, () => {
      this.logger.info(`API server started on port ${this.serverPort}`);
    });
  };

  stopServer = async () => {
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
