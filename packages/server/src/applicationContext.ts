import { createLogger } from '@zeitraum/commons';
import { PrismaClient } from '@prisma/client';
import { GraphQLServer } from './api/graphql/graphqlServer';
import { ApiServer } from './api/apiServer';
import { loadConfiguration } from './configuration';
import { UserService } from './user/userService';
import { TimeSpanService } from './timeSpan/timeSpanService';
import { TagService } from './tag/tagService';
import { MetricsRouter } from './api/metrics/metricsRouter';

export class ApplicationContext {
  public readonly configuration = loadConfiguration();
  public readonly rootLogger = createLogger();
  public readonly prismaClient = new PrismaClient();
  public readonly userService = new UserService(this.prismaClient);
  public readonly tagService = new TagService(this.prismaClient);
  public readonly timeSpanService = new TimeSpanService(this.prismaClient, this.tagService);
  public readonly graphqlServer = new GraphQLServer(
    this.rootLogger.child({ name: 'graphqlServer' }),
    this,
    this.configuration.API_TOKENS,
  );
  public readonly metricsRouter = new MetricsRouter(
    this.rootLogger.child({ name: 'metricsRouter' }),
    this.timeSpanService,
    this.configuration.API_TOKENS,
  );
  public readonly apiServer = new ApiServer(
    this.rootLogger.child({ name: 'apiServer' }),
    this,
    this.configuration.PORT,
  );
}
