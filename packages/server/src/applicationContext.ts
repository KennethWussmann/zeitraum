import { Logger, createLogger } from '@zeitraum/commons';
import { PrismaClient } from '@prisma/client';
import { GraphQLServer } from './api/graphql/graphqlServer';
import { ApiServer } from './api/apiServer';
import { Configuration, loadConfiguration } from './configuration';
import { UserService } from './user/userService';
import { TimeSpanService } from './timeSpan/timeSpanService';
import { TagService } from './tag/tagService';
import { MetricsRouter } from './api/rest/metricsRouter';
import { TimeSpanMetricService } from './timeSpan/timeSpanMetricService';

export class ApplicationContext {
  public readonly configuration!: Configuration;
  public readonly rootLogger: Logger;
  public readonly prismaClient: PrismaClient;
  public readonly userService: UserService;
  public readonly tagService: TagService;
  public readonly timeSpanService: TimeSpanService;
  public readonly timeSpanMetricService: TimeSpanMetricService;
  public readonly graphqlServer: GraphQLServer;
  public readonly metricsRouter: MetricsRouter;
  public readonly apiServer: ApiServer;

  constructor(configuration: Configuration = loadConfiguration()) {
    this.configuration = configuration;
    this.rootLogger = createLogger();
    this.prismaClient = new PrismaClient();
    this.userService = new UserService(this.prismaClient);
    this.tagService = new TagService(this.prismaClient);
    this.timeSpanService = new TimeSpanService(this.prismaClient, this.tagService);
    this.timeSpanMetricService = new TimeSpanMetricService(this.prismaClient);
    this.graphqlServer = new GraphQLServer(
      this.rootLogger.child({ name: 'graphqlServer' }),
      this,
      this.configuration.API_TOKENS,
    );
    this.metricsRouter = new MetricsRouter(
      this.rootLogger.child({ name: 'metricsRouter' }),
      this.prismaClient,
      this.timeSpanMetricService,
      this.configuration.API_TOKENS,
    );
    this.apiServer = new ApiServer(this.rootLogger.child({ name: 'apiServer' }), this, this.configuration.PORT);
  }
}
