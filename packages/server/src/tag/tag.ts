import { Tag as TagRelation, User as UserRelation } from '@prisma/client';

export type Tag = TagRelation & {
  user: UserRelation;
};
