import { Logger } from '@zeitraum/commons';
import { Request, Response, Router } from 'express';
import { Gauge, Registry, collectDefaultMetrics } from 'prom-client';
import { tokenBasedAuthMiddleware } from '../tokenBasedAuthMiddleware';
import { TimeSpanMetricService } from '../../timeSpan/timeSpanMetricService';

const prefix = 'zeitraum_';

export class MetricsRouter {
  router: Router;
  private register = new Registry();
  private timeSpansCountTotal = new Gauge({
    name: `${prefix}time_spans_count_total`,
    help: 'Amount of time spans per user',
    labelNames: ['username'],
  });
  private timeSpentPerTag = new Gauge({
    name: `${prefix}time_spent_per_tag_seconds`,
    help: 'Amount of time spent per tag in seconds',
    labelNames: ['username', 'tag'],
  });
  private tagUsageCount = new Gauge({
    name: `${prefix}tag_usage_count`,
    help: 'Amount time spans per tag',
    labelNames: ['username', 'tag'],
  });
  private timeSpansOpenCount = new Gauge({
    name: `${prefix}time_spans_open_count`,
    help: 'Amount time spans without an end time',
    labelNames: ['username'],
  });

  constructor(
    private logger: Logger,
    private timeSpanMetricService: TimeSpanMetricService,
    private apiTokens: string[],
  ) {
    collectDefaultMetrics({ register: this.register, prefix });
    [this.timeSpansCountTotal, this.timeSpentPerTag, this.tagUsageCount, this.timeSpansOpenCount].map((metric) =>
      this.register.registerMetric(metric),
    );

    this.router = Router();
    this.router.use(tokenBasedAuthMiddleware(this.logger, ...this.apiTokens));
    this.router.get('/metrics', async (_: Request, res: Response) => {
      res.setHeader('Content-Type', this.register.contentType);
      try {
        await this.updateMetrics();
        res.send(await this.register.metrics());
      } catch (error: any) {
        logger.error(`Error while collecting metrics: ${error.message}`, { error });
        res.status(500).send('Error while collecting metrics');
      }
    });
  }

  private updateMetrics = async () => {
    (await this.timeSpanMetricService.getCountPerUser()).forEach(({ username, amount }) =>
      this.timeSpansCountTotal.set({ username }, amount),
    );
    (await this.timeSpanMetricService.getTimeSpentPerTag()).forEach(({ username, tag_name: tag, time_spent_seconds }) =>
      this.timeSpentPerTag.set({ username, tag }, time_spent_seconds),
    );
    (await this.timeSpanMetricService.getTagUsageCount()).forEach(({ username, tag_name: tag, usage_count }) =>
      this.tagUsageCount.set({ username, tag }, usage_count),
    );
    (await this.timeSpanMetricService.getOpenCountPerUser()).forEach(({ username, amount }) =>
      this.timeSpansOpenCount.set({ username }, amount),
    );
  };
}
