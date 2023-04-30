import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

export class TimeSpanMetricService {
  constructor(private prisma: PrismaClient) {}

  public getCountPerUser = async () =>
    z
      .array(
        z.object({
          username: z.string(),
          amount: z.bigint().transform(Number),
        }),
      )
      .parse(
        await this.prisma.$queryRaw`
          SELECT U."username", count(*) as amount
          FROM "TimeSpan" ts
            JOIN "User" U on U.id = ts."userId"
          GROUP BY U."username";
        `,
      );

  public getTimeSpentPerTag = async () =>
    z
      .array(
        z.object({
          username: z.string(),
          tag_name: z.string(),
          time_spent_seconds: z.number(),
        }),
      )
      .parse(
        await this.prisma.$queryRaw`
          SELECT U."username",
            t.name as tag_name,
            SUM(EXTRACT(EPOCH FROM (COALESCE(ts.end, NOW()) - ts.start)))::int as time_spent_seconds
          FROM "TimeSpan" ts
            JOIN "TagsOnTimeSpans" tts ON ts.id = tts."timeSpanId"
            JOIN "Tag" t ON tts."tagId" = t.id
            JOIN "User" U on U.id = ts."userId"
          GROUP BY U."username", t.name;
        `,
      );

  public getTagUsageCount = async () =>
    z
      .array(
        z.object({
          username: z.string(),
          tag_name: z.string(),
          usage_count: z.bigint().transform(Number),
        }),
      )
      .parse(
        await this.prisma.$queryRaw`
          SELECT U.username, T.name AS tag_name, COUNT(*) AS usage_count
          FROM "TagsOnTimeSpans"
            JOIN "TimeSpan" TS on TS.id = "TagsOnTimeSpans"."timeSpanId"
            JOIN "Tag" T on T.id = "TagsOnTimeSpans"."tagId"
            JOIN "User" U on TS."userId" = U.id
          GROUP BY U.username, T.id;
        `,
      );

  public getOpenCountPerUser = async () =>
    z
      .array(
        z.object({
          username: z.string(),
          amount: z.bigint().transform(Number),
        }),
      )
      .parse(
        await this.prisma.$queryRaw`
          SELECT U."username", count(*) as amount
          FROM "TimeSpan" ts
            JOIN "User" U on U.id = ts."userId"
          WHERE ts."end" IS NULL
          GROUP BY U."username";
        `,
      );
}
