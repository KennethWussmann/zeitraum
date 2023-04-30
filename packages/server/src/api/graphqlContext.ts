import { Logger } from '@zeitraum/commons';
import { ApplicationContext } from '../applicationContext';
import { rootUserId } from '../user/userService';

export type UserContext = {
  id: string;
};

export type GraphQLContext = {
  applicationContext: ApplicationContext;
  userContext?: UserContext;
  logger: Logger;
};

export const defaultUserContext: UserContext = { id: rootUserId };
