import { Logger } from '@zeitraum/commons';
import { Response, Router } from 'express';
import { tokenBasedAuthMiddleware } from '../tokenBasedAuthMiddleware';
import { TimeSpanService } from '../../timeSpan/timeSpanService';
import { rootUserId } from '../../user/userService';

export class ICalRouter {
  router: Router;

  constructor(private logger: Logger, private timeSpanService: TimeSpanService, private apiTokens: string[]) {
    this.router = Router();
    this.router.use(tokenBasedAuthMiddleware(this.logger, ...this.apiTokens));

    this.router.get('/calendar/admin.ics', async (_, res: Response) => {
      res.status(200);
      res.setHeader('Content-Type', 'text/calendar');
      res.send(await this.timeSpanService.createICal(rootUserId));
    });
  }
}
