import { PrismaClient } from '@prisma/client';
import { CreateUpdateTimeSpanInput } from '../api/resolverTypes';
import { TagService } from '../api/tag/tagService';
import { randomUUID } from 'crypto';
import { TimeSpan } from './timeSpan';
import { UserInputError } from '../api/graphqlErrors';

export class TimeSpanService {
  constructor(private prisma: PrismaClient, private tagService: TagService) {}

  public findById = async (id: string): Promise<TimeSpan | null> =>
    this.prisma.timeSpan.findUnique({
      where: { id },
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

  public create = async (userId: string, data: CreateUpdateTimeSpanInput): Promise<TimeSpan> => {
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

  public update = async (userId: string, timeSpanId: string, data: CreateUpdateTimeSpanInput): Promise<TimeSpan> => {
    const oldTimeSpan = await this.findById(timeSpanId);

    if (!oldTimeSpan || oldTimeSpan.userId !== userId) {
      throw new UserInputError(`TimeSpan with id ${timeSpanId} not found.`);
    }

    const timeSpan = await this.prisma.timeSpan.update({
      data: {
        id: timeSpanId,
        start: data.start,
        end: data.end,
        note: data.note,
        userId,
      },
      where: { id: timeSpanId },
      include: {
        user: true,
      },
    });

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

  public delete = async (userId: string, timeSpanId: string): Promise<void> => {
    const oldTimeSpan = await this.findById(timeSpanId);
    if (!oldTimeSpan || oldTimeSpan.userId !== userId) {
      throw new UserInputError(`TimeSpan with id ${timeSpanId} not found.`);
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
}
