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
          SELECT U."username", COALESCE(COUNT(ts."userId"), 0) as amount
          FROM "User" U
            LEFT JOIN "TimeSpan" ts ON U.id = ts."userId"
          WHERE ts."start" <= NOW()
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
          WITH TimeSpent AS (
            SELECT U.id AS user_id,
                  T.id AS tag_id,
                  EXTRACT(EPOCH FROM (COALESCE(TS."end", NOW()) - TS.start)) as time_spent_seconds
            FROM "TimeSpan" TS
            JOIN "TagsOnTimeSpans" TOT ON TS.id = TOT."timeSpanId"
            JOIN "Tag" T ON TOT."tagId" = T.id
            JOIN "User" U on U.id = TS."userId"
            WHERE TS."start" <= NOW()
          )
          SELECT U."username",
                T.name as tag_name,
                COALESCE(SUM(TS.time_spent_seconds), 0)::float as time_spent_seconds
          FROM "User" U
            CROSS JOIN "Tag" T
            LEFT JOIN TimeSpent TS ON TS.user_id = U.id AND TS.tag_id = T.id
          GROUP BY U."username", T.name;
        `,
      );

  public getStartTimePerTag = async () =>
    z
      .array(
        z.object({
          username: z.string(),
          tag_name: z.string(),
          start_time_seconds: z.number(),
        }),
      )
      .parse(
        await this.prisma.$queryRaw`
          SELECT "User".username,
                "Tag".name AS tag_name,
                COALESCE(extract(epoch from MAX("TimeSpan".start)), 0)::float AS start_time_seconds
          FROM "User"
            CROSS JOIN "Tag"
            LEFT JOIN "TagsOnTimeSpans" ON "TagsOnTimeSpans"."tagId" = "Tag".id
            LEFT JOIN "TimeSpan" ON "TimeSpan".id = "TagsOnTimeSpans"."timeSpanId" AND "TimeSpan"."end" IS NULL
          WHERE "User".id = "Tag"."userId" AND ("TimeSpan"."start" <= NOW() OR "TimeSpan"."start" IS NULL)
          GROUP BY "User".username, "Tag".name
          ORDER BY "User".username, "Tag".name;
        `,
      );

  public getTimeSpentPerUser = async () =>
    z
      .array(
        z.object({
          username: z.string(),
          time_spent_seconds: z.number(),
        }),
      )
      .parse(
        await this.prisma.$queryRaw`
          SELECT U."username", COALESCE(SUM(EXTRACT(EPOCH FROM (COALESCE(ts."end", NOW()) - ts.start))), 0)::float AS time_spent_seconds
          FROM public."User" U
            LEFT JOIN public."TimeSpan" ts ON U.id = ts."userId"
          WHERE ts."start" <= NOW()
          GROUP BY U."username";
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
          SELECT U.username, T.name AS tag_name, COALESCE(COUNT(TOT."timeSpanId"), 0)::bigint AS usage_count
          FROM "User" U
            CROSS JOIN "Tag" T
            LEFT JOIN "TimeSpan" TS on TS."userId" = U.id
            LEFT JOIN "TagsOnTimeSpans" TOT ON TOT."timeSpanId" = TS.id AND TOT."tagId" = T.id
          WHERE TS."start" <= NOW()
          GROUP BY U.username, T.name;
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
          SELECT U."username", COALESCE(count(ts."userId"), 0)::bigint as amount
          FROM "User" U
            LEFT JOIN "TimeSpan" ts ON U.id = ts."userId" AND ts."end" IS NULL
          WHERE ts."start" <= NOW()
          GROUP BY U."username";
        `,
      );
}
