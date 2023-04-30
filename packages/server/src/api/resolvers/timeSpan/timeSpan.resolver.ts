import { TimeSpan } from '../../../timeSpan/timeSpan';
import { Resolvers } from '../../resolverTypes';

export const timeSpanResolver: Resolvers = {
  TimeSpan: {
    tags: (parent: TimeSpan) => parent.TagsOnTimeSpans.map((rel) => rel.tag),
  },
};
