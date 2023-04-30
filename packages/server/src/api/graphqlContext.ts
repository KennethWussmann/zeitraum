import { Logger } from '@zeitraum/commons';
import { ApplicationContext } from '../applicationContext';
import { User } from '../timeSpan/timeSpan';

export type GraphQLContext = {
  applicationContext: ApplicationContext;
  userContext?: UserContext;
  logger: Logger;
};

export class UserContext {
  id: string;
  constructor(public user: User) {
    this.id = user.id;
  }
}
