import { PrismaClient } from '@prisma/client';
import { randomUUID } from 'crypto';
import { Tag } from '../../timeSpan/timeSpan';

export class TagService {
  constructor(private prisma: PrismaClient) {}

  public findByNames = async (userId: string, ...names: string[]) =>
    this.prisma.tag.findMany({ where: { name: { in: names.map((name) => name.toLowerCase()) }, userId } });

  public create = async (userId: string, ...names: string[]): Promise<Tag[]> =>
    Promise.all(
      names.map((name) =>
        this.prisma.tag.create({
          data: {
            id: randomUUID(),
            name: name.toLowerCase(),
            userId,
          },
          include: {
            user: true,
          },
        }),
      ),
    );

  public findByNamesAndCreateMissing = async (userId: string, ...names: string[]) => {
    const existingTags = await this.findByNames(userId, ...names);
    const missingTags = names.filter((name) => !existingTags.some((tag) => tag.name === name.toLowerCase()));
    const createdTags = await this.create(userId, ...missingTags);
    return [...existingTags, ...createdTags];
  };
}
