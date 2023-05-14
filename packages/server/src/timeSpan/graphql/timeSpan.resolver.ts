import { Resolvers } from '../../api/graphql/resolverTypes';
import { TimeSpan } from '../timeSpan';

export const timeSpanResolver: Resolvers = {
  TimeSpan: {
    running: (parent: TimeSpan) => parent.end === null,
    tags: (parent: TimeSpan) => parent.TagsOnTimeSpans.map((rel) => rel.tag),
  },
};
