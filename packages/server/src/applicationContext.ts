import { createLogger } from '@zeitraum/commons';
import { PrismaClient } from '@prisma/client';
import { GraphQLServer } from './api/graphqlServer';
import { ApiServer } from './api/apiServer';
import { loadConfiguration } from './configuration';
import { UserService } from './user/userService';
import { TimeSpanService } from './timeSpan/timeSpanService';
import { TagService } from './api/tag/tagService';

export class ApplicationContext {
  public readonly configuration = loadConfiguration();
  public readonly rootLogger = createLogger();
  public readonly prismaClient = new PrismaClient();
  public readonly graphqlServer = new GraphQLServer(
    this.rootLogger.child({ name: 'graphqlServer' }),
    this,
    this.configuration.API_TOKENS,
  );
  public readonly apiServer = new ApiServer(
    this.rootLogger.child({ name: 'apiServer' }),
    this,
    this.configuration.PORT,
  );
  public readonly userService = new UserService(this.prismaClient);
  public readonly tagService = new TagService(this.prismaClient);
  public readonly timeSpanService = new TimeSpanService(this.prismaClient, this.tagService);
}
