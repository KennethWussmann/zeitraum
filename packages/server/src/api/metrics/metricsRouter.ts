import { Logger } from '@zeitraum/commons';
import { Request, Response, Router } from 'express';
import { Registry, collectDefaultMetrics } from 'prom-client';
import { TimeSpanService } from '../../timeSpan/timeSpanService';
import { tokenBasedAuthMiddleware } from '../tokenBasedAuthMiddleware';

const prefix = 'zeitraum_';

export class MetricsRouter {
  router: Router;
  private register = new Registry();

  constructor(private logger: Logger, private timeSpanService: TimeSpanService, private apiTokens: string[]) {
    collectDefaultMetrics({ register: this.register, prefix });
    this.timeSpanService;

    this.router = Router();
    this.router.use(tokenBasedAuthMiddleware(this.logger, ...this.apiTokens));
    this.router.get('/metrics', async (_: Request, res: Response) => {
      res.setHeader('Content-Type', 'text/plain');
      try {
        res.send(await this.register.metrics());
      } catch (error: any) {
        logger.error(`Error while collecting metrics: ${error.message}`, { error });
        res.status(500).send('Error while collecting metrics');
      }
    });
  }
}
