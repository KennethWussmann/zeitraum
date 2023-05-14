import { PrismaClient } from '@prisma/client';
import { Preset } from './preset';
import { CreatePreset, PresetSearch, UpdatePreset, UpdatePresetSorting } from '../api/graphql/resolverTypes';
import { randomUUID } from 'crypto';
import { TagService } from '../tag/tagService';
import { NotFoundError } from '../api/graphql/graphqlErrors';

export class PresetService {
  constructor(private prisma: PrismaClient, private tagService: TagService) {}

  public findById = async (userId: string, id: string): Promise<Preset | null> =>
    this.prisma.preset.findFirst({
      where: {
        id,
        userId,
      },
      include: {
        user: true,
        TagsOnPresets: {
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

  public findByIds = async (userId: string, ids: string[]): Promise<Preset[]> =>
    this.prisma.preset.findMany({
      where: {
        id: { in: ids },
        userId,
      },
      include: {
        user: true,
        TagsOnPresets: {
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

  public create = async (userId: string, data: CreatePreset): Promise<Preset> => {
    const preset = await this.prisma.preset.create({
      data: {
        id: randomUUID(),
        name: data.name,
        note: data.note,
        userId,
      },
    });

    const tagsOnPresets = await this.createTagAssignments(userId, preset.id, data.tags);

    return {
      ...preset,
      TagsOnPresets: tagsOnPresets,
    };
  };

  private createTagAssignments = async (userId: string, presetId: string, tagNames: string[]) => {
    const tags = await this.tagService.findByNamesAndCreateMissing(userId, ...tagNames);
    return await this.prisma.$transaction(
      tags.map((tag) =>
        this.prisma.tagsOnPresets.create({
          data: {
            tagId: tag.id,
            presetId,
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

  public update = async (userId: string, presetId: string, data: UpdatePreset): Promise<Preset> => {
    const oldPreset = await this.findById(userId, presetId);
    if (!oldPreset) {
      throw new NotFoundError(`Preset with id ${presetId} not found.`);
    }

    const preset = await this.prisma.preset.update({
      data: {
        id: presetId,
        name: data.name,
        note: data.note ?? null,
        sortIndex: data.sortIndex,
        userId,
      },
      where: { id: presetId },
      include: {
        user: true,
      },
    });

    // delete all current assignments and create new ones.
    // not very efficient, but simple and works for now.
    await this.prisma.tagsOnPresets.deleteMany({
      where: {
        tagId: {
          in: oldPreset.TagsOnPresets.map((tagOnPreset) => tagOnPreset.tag.id),
        },
        presetId,
      },
    });
    const tagsOnPresets = await this.createTagAssignments(userId, presetId, data.tags);

    return {
      ...preset,
      TagsOnPresets: tagsOnPresets,
    };
  };

  public updateSorting = async (userId: string, sorting: UpdatePresetSorting[]): Promise<Preset[]> => {
    const presets = await this.findByIds(
      userId,
      sorting.map((s) => s.id),
    );
    if (presets.length !== sorting.length) {
      throw new NotFoundError('Not all presets found.');
    }

    const updatedPresets = await this.prisma.$transaction(
      sorting.map((s) =>
        this.prisma.preset.update({
          data: {
            id: s.id,
            sortIndex: s.sortIndex,
          },
          where: { id: s.id },
          include: {
            user: true,
            TagsOnPresets: {
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
      ),
    );

    return updatedPresets;
  };

  public delete = async (userId: string, presetId: string): Promise<void> => {
    const oldPreset = await this.findById(userId, presetId);
    if (!oldPreset) {
      throw new NotFoundError(`Preset with id ${presetId} not found.`);
    }

    await this.prisma.$transaction([
      this.prisma.tagsOnPresets.deleteMany({
        where: {
          presetId,
        },
      }),
      this.prisma.preset.delete({
        where: { id: presetId },
        include: {
          TagsOnPresets: true,
        },
      }),
    ]);
  };

  public search = async (
    userId: string,
    { limit = 100, offset = 0 }: PresetSearch = {},
  ): Promise<{ items: Preset[]; total: number }> => {
    const [total, items] = await this.prisma.$transaction([
      this.prisma.preset.count({
        where: {
          userId,
        },
      }),
      this.prisma.preset.findMany({
        where: {
          userId,
        },
        take: limit ?? undefined,
        skip: offset ?? undefined,
        orderBy: {
          sortIndex: 'desc',
        },
        include: {
          user: true,
          TagsOnPresets: {
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
}
