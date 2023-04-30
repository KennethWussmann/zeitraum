import { GraphQLError } from 'graphql';

export class UnauthenticatedError extends GraphQLError {
  constructor() {
    super('Not authenticated', {
      extensions: { code: 'UNAUTHENTICATED' },
    });
  }
}

export class UserInputError extends GraphQLError {
  constructor(message: string) {
    super(message, {
      extensions: { code: 'BAD_USER_INPUT' },
    });
  }
}
export class InternalServerError extends GraphQLError {
  constructor(message: string) {
    super(message, {
      extensions: { code: 'INTERNAL_SERVER_ERROR' },
    });
  }
}
