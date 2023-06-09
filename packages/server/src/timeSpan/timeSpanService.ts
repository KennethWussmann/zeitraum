import { Prisma, PrismaClient } from '@prisma/client';
import { TagService } from '../tag/tagService';
import { randomUUID } from 'crypto';
import { TimeSpan } from './timeSpan';
import { CreateTimeSpan, CreateTimeSpanFromPreset, TimeSpanSearch, UpdateTimeSpan } from '../api/graphql/resolverTypes';
import { NotFoundError } from '../api/graphql/graphqlErrors';
import ical from 'ical-generator';
import { applicationName } from '../configuration';
import { PresetService } from '../preset/presetService';

export class TimeSpanService {
  constructor(private prisma: PrismaClient, private tagService: TagService, private presetService: PresetService) {}

  public findById = async (userId: string, id: string): Promise<TimeSpan | null> =>
    this.prisma.timeSpan.findFirst({
      where: {
        id,
        userId,
      },
      include: {
        user: true,
        TagsOnTimeSpans: {
          include: {
            tag: {
              include: {
                user: true,
              },
            },
          },
        },
      },
    });

  public findLongestRunningTimeSpan = async (userId: string): Promise<TimeSpan | null> =>
    this.prisma.timeSpan.findFirst({
      where: { userId, end: null },
      orderBy: { start: 'asc' },
      take: 1,
      include: {
        user: true,
        TagsOnTimeSpans: {
          include: {
            tag: {
              include: {
                user: true,
              },
            },
          },
        },
      },
    });

  public create = async (userId: string, data: CreateTimeSpan): Promise<TimeSpan> => {
    if (data.stopPreviousRunning === true) {
      try {
        await this.close(userId);
      } catch {
        // ignore that no running time span was found
      }
    }

    const timeSpan = await this.prisma.timeSpan.create({
      data: {
        id: randomUUID(),
        start: data.start,
        end: data.end,
        note: data.note,
        userId,
      },
    });

    const tagsOnTimeSpans = await this.createTagAssignments(userId, timeSpan.id, data.tags);

    return {
      ...timeSpan,
      TagsOnTimeSpans: tagsOnTimeSpans,
    };
  };

  public createFromPreset = async (userId: string, data: CreateTimeSpanFromPreset): Promise<TimeSpan> => {
    if (data.stopPreviousRunning === true) {
      try {
        await this.close(userId);
      } catch {
        // ignore that no running time span was found
      }
    }

    const preset = await this.presetService.findById(userId, data.presetId);
    if (!preset) {
      throw new NotFoundError(`Preset with id ${data.presetId} not found.`);
    }

    return await this.create(userId, {
      start: data.start,
      end: data.end,
      note: preset.note,
      tags: preset.TagsOnPresets.map((rel) => rel.tag.name),
    });
  };

  private createTagAssignments = async (userId: string, timeSpanId: string, tagNames: string[]) => {
    const tags = await this.tagService.findByNamesAndCreateMissing(userId, ...tagNames);
    return await this.prisma.$transaction(
      tags.map((tag) =>
        this.prisma.tagsOnTimeSpans.create({
          data: {
            tagId: tag.id,
            timeSpanId,
          },
          include: {
            tag: {
              include: {
                user: true,
              },
            },
          },
        }),
      ),
    );
  };

  public update = async (userId: string, timeSpanId: string, data: UpdateTimeSpan): Promise<TimeSpan> => {
    const oldTimeSpan = await this.findById(userId, timeSpanId);
    if (!oldTimeSpan) {
      throw new NotFoundError(`TimeSpan with id ${timeSpanId} not found.`);
    }

    const timeSpan = await this.prisma.timeSpan.update({
      data: {
        id: timeSpanId,
        start: data.start ?? oldTimeSpan.start,
        end: data.end ?? oldTimeSpan.end,
        note: data.note ?? oldTimeSpan.note,
        userId,
      },
      where: { id: timeSpanId },
      include: {
        user: true,
      },
    });

    // user did not change tags, so we can skip the rest
    if (!data.tags) {
      return {
        ...timeSpan,
        TagsOnTimeSpans: oldTimeSpan.TagsOnTimeSpans,
      };
    }

    // delete all current assignments and create new ones.
    // not very efficient, but simple and works for now.
    await this.prisma.tagsOnTimeSpans.deleteMany({
      where: {
        tagId: {
          in: oldTimeSpan.TagsOnTimeSpans.map((tagOnTimeSpan) => tagOnTimeSpan.tag.id),
        },
        timeSpanId,
      },
    });
    const tagsOnTimeSpans = await this.createTagAssignments(userId, timeSpanId, data.tags);

    return {
      ...timeSpan,
      TagsOnTimeSpans: tagsOnTimeSpans,
    };
  };

  public close = async (
    userId: string,
    timeSpanId: string | undefined = undefined,
    end: Date = new Date(),
  ): Promise<TimeSpan> => {
    const oldTimeSpan = timeSpanId
      ? await this.findById(userId, timeSpanId)
      : await this.findLongestRunningTimeSpan(userId);
    if (!oldTimeSpan) {
      throw new NotFoundError(`TimeSpan with id ${timeSpanId} not found.`);
    }
    return await this.prisma.timeSpan.update({
      data: {
        end,
      },
      where: { id: oldTimeSpan.id },
      include: {
        user: true,
        TagsOnTimeSpans: {
          include: {
            tag: {
              include: {
                user: true,
              },
            },
          },
        },
      },
    });
  };

  public delete = async (userId: string, timeSpanId: string): Promise<void> => {
    const oldTimeSpan = await this.findById(userId, timeSpanId);
    if (!oldTimeSpan) {
      throw new NotFoundError(`TimeSpan with id ${timeSpanId} not found.`);
    }

    await this.prisma.$transaction([
      this.prisma.tagsOnTimeSpans.deleteMany({
        where: {
          timeSpanId,
        },
      }),
      this.prisma.timeSpan.delete({
        where: { id: timeSpanId },
        include: {
          TagsOnTimeSpans: true,
        },
      }),
    ]);
  };

  public search = async (
    userId: string,
    { tags, fromInclusive, toInclusive, running, limit = 100, offset = 0 }: TimeSpanSearch = {},
  ): Promise<{ items: TimeSpan[]; total: number }> => {
    const tagsFound = tags && tags.length > 0 ? await this.tagService.findByNames(userId, ...tags) : [];
    const fromFilter = fromInclusive ? { gte: fromInclusive } : undefined;
    const toFilter = toInclusive ? { lte: toInclusive } : undefined;
    const where: Prisma.TimeSpanWhereInput = {
      userId,
      start: { ...fromFilter, ...toFilter },
      TagsOnTimeSpans: tagsFound.length > 0 ? { some: { tagId: { in: tagsFound.map((tag) => tag.id) } } } : undefined,
      end: running !== undefined ? (running ? { equals: null } : { not: null }) : undefined,
    };
    const [total, items] = await this.prisma.$transaction([
      this.prisma.timeSpan.count({
        where,
      }),
      this.prisma.timeSpan.findMany({
        where,
        take: limit ?? undefined,
        skip: offset ?? undefined,
        orderBy: {
          start: 'desc',
        },
        include: {
          user: true,
          TagsOnTimeSpans: {
            include: {
              tag: {
                include: {
                  user: true,
                },
              },
            },
          },
        },
      }),
    ]);
    return {
      items,
      total,
    };
  };

  public createICal = async (userId: string) => {
    const calendar = ical({
      name: applicationName,
    });

    const timeSpans = await this.prisma.timeSpan.findMany({
      where: {
        userId,
        end: { not: null },
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        user: true,
        TagsOnTimeSpans: {
          include: {
            tag: {
              include: {
                user: true,
              },
            },
          },
        },
      },
    });

    timeSpans.forEach((timeSpan) => {
      const summary =
        timeSpan.note ?? timeSpan.TagsOnTimeSpans.map((tagOnTimeSpan) => tagOnTimeSpan.tag.name).join(', ');
      const description = timeSpan.note
        ? timeSpan.TagsOnTimeSpans.map((tagOnTimeSpan) => tagOnTimeSpan.tag.name).join(', ')
        : undefined;
      calendar.createEvent({
        id: timeSpan.id,
        summary,
        description,
        start: timeSpan.start,
        end: timeSpan.end,
        created: timeSpan.createdAt,
        lastModified: timeSpan.updatedAt,
      });
    });

    return calendar.toString();
  };
}
