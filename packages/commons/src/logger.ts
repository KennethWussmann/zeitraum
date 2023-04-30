import { createLogger as createWinstonLogger, format } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import { Console, ConsoleTransportInstance } from 'winston/lib/winston/transports';
import { z } from 'zod';

export { Logger } from 'winston';

export const logLevelSchema = z
  .union([z.literal('debug'), z.literal('info'), z.literal('warn'), z.literal('error'), z.literal('fatal')])
  .default('info');
export type LogLevel = z.infer<typeof logLevelSchema>;

type LoggerProperties = {
  level?: LogLevel;
  logDestination?: string;
  meta?: Record<string, unknown>;
};

const getLogLevel = (): LogLevel => {
  const parsingResult = logLevelSchema.safeParse(process.env.LOG_LEVEL);
  if (!parsingResult.success) {
    return 'info';
  }
  return parsingResult.data;
};

export const createLogger = ({ level, logDestination = process.env.LOG_DESTINATION, meta }: LoggerProperties = {}) =>
  createWinstonLogger({
    level: level ?? getLogLevel(),
    format: format.combine(format.timestamp(), format.json()),
    defaultMeta: meta,
    transports: [
      new Console(),
      logDestination
        ? new DailyRotateFile({
            filename: '%DATE%.log',
            dirname: logDestination,
            utc: true,
            zippedArchive: true,
          })
        : undefined,
    ].filter((t): t is ConsoleTransportInstance | DailyRotateFile => !!t),
  });
