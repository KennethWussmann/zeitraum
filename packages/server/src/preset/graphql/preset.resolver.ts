import { Resolvers } from '../../api/graphql/resolverTypes';
import { Preset } from '../preset';

export const presetResolver: Resolvers = {
  Preset: {
    tags: (parent: Preset) => parent.TagsOnPresets.map((rel) => rel.tag),
  },
};
