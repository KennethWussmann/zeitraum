import { Logger, createLogger } from '@zeitraum/commons';
import { PrismaClient } from '@prisma/client';
import { GraphQLServer } from './api/graphql/graphqlServer';
import { ApiServer } from './api/apiServer';
import { loadConfiguration } from './configuration';
import { UserService } from './user/userService';
import { TimeSpanService } from './timeSpan/timeSpanService';
import { TagService } from './tag/tagService';
import { MetricsRouter } from './api/rest/metricsRouter';
import { TimeSpanMetricService } from './timeSpan/timeSpanMetricService';
import { ICalRouter } from './api/rest/icalRouter';
import { PresetService } from './preset/presetService';

export class ApplicationContext {
  public readonly configuration = loadConfiguration();
  public readonly rootLogger: Logger = createLogger();
  public readonly prismaClient = new PrismaClient();
  public readonly userService = new UserService(this.prismaClient);
  public readonly tagService = new TagService(this.prismaClient);
  public readonly presetService = new PresetService(this.prismaClient, this.tagService);
  public readonly timeSpanService = new TimeSpanService(this.prismaClient, this.tagService, this.presetService);
  public readonly timeSpanMetricService = new TimeSpanMetricService(this.prismaClient);
  public readonly graphqlServer = new GraphQLServer(
    this.rootLogger.child({ name: 'graphqlServer' }),
    this,
    this.configuration.API_TOKENS,
  );
  public readonly metricsRouter = new MetricsRouter(
    this.rootLogger.child({ name: 'metricsRouter' }),
    this.prismaClient,
    this.timeSpanMetricService,
    this.configuration.API_TOKENS,
  );
  public readonly icalRouter = new ICalRouter(
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
