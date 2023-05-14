import { Tag as TagRelation, TagsOnPresets as TagsOnPresetsRelation, Preset as PresetRelation } from '@prisma/client';
import { Tag } from '../tag/tag';

export type Preset = PresetRelation & {
  TagsOnPresets: { tag: Tag }[];
};

export type TagsOnPresets = TagsOnPresetsRelation & {
  tag: TagRelation;
  Preset: PresetRelation;
};
