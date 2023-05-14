import { Logger } from '@zeitraum/commons';
import { ApplicationContext } from './applicationContext';
import { createLightship, Lightship } from 'lightship';

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

  private monitorConnection = (lightship: Lightship) => {
    this.applicationContext.prismaClient.$on('beforeExit', () => {
      lightship.signalNotReady();
    });

    setInterval(async () => {
      try {
        await this.applicationContext.prismaClient.$executeRaw`SELECT 1;`;
        lightship.signalReady();
      } catch (error) {
        this.logger.error('Database connection failed. Retrying...', { error });
        lightship.signalNotReady();
      }
    }, 10000);
  };

  start = async () => {
    this.logger.info(`Starting Zeitraum server version ${this.applicationContext.configuration.VERSION}`);
    const lightship = await createLightship({
      detectKubernetes: false,
      port: this.applicationContext.configuration.HEALTH_PORT,
    });
    await this.connect();
    await this.applicationContext.apiServer.startServer(lightship);
    this.monitorConnection(lightship);
  };
}
