import { PrismaClient } from '@prisma/client';
import { Preset } from './preset';
import { CreatePreset, UpdatePreset } from '../api/graphql/resolverTypes';
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
        name: data.name ?? oldPreset.name,
        note: data.note ?? oldPreset.note,
        userId,
      },
      where: { id: presetId },
      include: {
        user: true,
      },
    });

    // user did not change tags, so we can skip the rest
    if (!data.tags) {
      return {
        ...preset,
        TagsOnPresets: oldPreset.TagsOnPresets,
      };
    }

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
}
