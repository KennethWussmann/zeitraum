import {
  Tag as TagRelation,
  TagsOnTimeSpans as TagsOnTimeSpansRelation,
  TimeSpan as TimeSpanRelation,
  User as UserRelation,
} from '@prisma/client';

export type TimeSpan = TimeSpanRelation & {
  TagsOnTimeSpans: { tag: Tag }[];
};

export type Tag = TagRelation & {
  user: UserRelation;
};

export type User = UserRelation;

export type TagsOnTimeSpans = TagsOnTimeSpansRelation & {
  tag: TagRelation;
  timeSpan: TimeSpanRelation;
};
