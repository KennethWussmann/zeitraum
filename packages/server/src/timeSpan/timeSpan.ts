import {
  Tag as TagRelation,
  TagsOnTimeSpans as TagsOnTimeSpansRelation,
  TimeSpan as TimeSpanRelation,
} from '@prisma/client';
import { Tag } from '../tag/tag';

export type TimeSpan = TimeSpanRelation & {
  TagsOnTimeSpans: { tag: Tag }[];
};

export type TagsOnTimeSpans = TagsOnTimeSpansRelation & {
  tag: TagRelation;
  timeSpan: TimeSpanRelation;
};
