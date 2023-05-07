import { Logger } from '@zeitraum/commons';
import { ApplicationContext } from './applicationContext';

export class Server {
  private readonly logger: Logger;
  constructor(private applicationContext: ApplicationContext = new ApplicationContext()) {
    this.logger = this.applicationContext.rootLogger.child({ name: 'server' });
  }

  private connect = (): Promise<void> => {
    return new Promise((resolve) => {
      const retryTimer: NodeJS.Timer = setInterval(async () => {
        try {
          this.logger.info('Connecting to database...');
          await this.applicationContext.prismaClient.$connect();
          clearInterval(retryTimer);
          resolve();
        } catch (error) {
          this.logger.error('Database connection failed. Retrying...', { error });
        }
      }, 1000);
    });
  };

  start = async () => {
    await this.connect();
    await this.applicationContext.apiServer.startServer();

    const shutDown = () => {
      void this.applicationContext.apiServer.stopServer().then(() => process.exit(0));
      setTimeout(() => {
        this.logger.error('Could not close connections in time, forcefully shutting down');
        process.exit(1);
      }, 10000);
    };

    process.on('SIGTERM', shutDown);
    process.on('SIGINT', shutDown);

    return shutDown;
  };
}
