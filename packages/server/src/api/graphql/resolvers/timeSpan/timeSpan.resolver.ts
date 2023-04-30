import { TimeSpan } from '../../../../timeSpan/timeSpan';
import { Resolvers } from '../../resolverTypes';

export const timeSpanResolver: Resolvers = {
  TimeSpan: {
    running: (parent: TimeSpan) => parent.end === null,
    tags: (parent: TimeSpan) => parent.TagsOnTimeSpans.map((rel) => rel.tag),
  },
};
