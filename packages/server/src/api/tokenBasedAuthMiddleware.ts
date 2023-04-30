import { Logger } from '@zeitraum/commons';
import { NextFunction, Request, Response } from 'express';

export const tokenBasedAuthMiddleware =
  (logger: Logger, ...validTokens: (string | undefined)[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.replace('Bearer ', '');
    if (!token || typeof token !== 'string') {
      logger.warn('Received request without token');
      res.status(401);
      res.send({
        success: false,
      });
      return;
    }

    const isValidToken = validTokens
      .filter((token): token is string => !!token)
      .some((validToken) => validToken === token);

    if (!isValidToken) {
      logger.warn('Received request with invalid token', { token });
      res.status(401);
      res.send({
        success: false,
      });
      return;
    }
    logger.debug('Request passed auth');
    next();
  };
