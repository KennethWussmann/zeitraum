import { Request as ExpressRequest } from 'express';

const getHeaderValue = (headers: Record<string, string | string[] | undefined>, key: string) => {
  const value = headers[key];
  if (Array.isArray(value)) {
    return value[0];
  }
  return value;
};

export const findTokenFromExpressRequest = (req: ExpressRequest): string | undefined => {
  const token = getHeaderValue(req.headers, 'authorization')?.replace('Bearer ', '') ?? req.query.token;
  if (!token || typeof token !== 'string') {
    return undefined;
  }
  return token;
};
