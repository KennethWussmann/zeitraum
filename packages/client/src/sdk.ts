/* eslint-disable */
import { ExecutionResult } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type CreatePreset = {
  name: Scalars['String'];
  note?: InputMaybe<Scalars['String']>;
  tags: Array<Scalars['String']>;
};

export type CreateTimeSpan = {
  end?: InputMaybe<Scalars['DateTime']>;
  note?: InputMaybe<Scalars['String']>;
  start: Scalars['DateTime'];
  /** Stop the longest running time span before creating the new one. */
  stopPreviousRunning?: InputMaybe<Scalars['Boolean']>;
  tags: Array<Scalars['String']>;
};

export type CreateTimeSpanFromPreset = {
  end?: InputMaybe<Scalars['DateTime']>;
  presetId: Scalars['ID'];
  start: Scalars['DateTime'];
  /** Stop the longest running time span before creating the new one. */
  stopPreviousRunning?: InputMaybe<Scalars['Boolean']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /**
   * Close a time span that does not have an end time yet.
   * When invoked without id it will close the time span that is running longest.
   * Optionally you can provide an end time to close the time span at a specific time.
   */
  closeTimeSpan: TimeSpan;
  /**
   * Create a new preset.
   * Presets are templates for time spans.
   */
  createPreset: Preset;
  /** Create a new time span */
  createTimeSpan: TimeSpan;
  /** Create a new time span from a preset */
  createTimeSpanFromPreset: TimeSpan;
  /**
   * Delete a preset by id.
   * Time spans that were created from this preset will not be deleted.
   */
  deletePreset: Scalars['Boolean'];
  /** Delete a time span by id */
  deleteTimeSpan: Scalars['Boolean'];
  /** Update a preset by id */
  updatePreset: Preset;
  /** Update the sort order of multiple presets at once */
  updatePresetSorting: Array<Preset>;
  /** Update a time span by id */
  updateTimeSpan: TimeSpan;
};

export type MutationCloseTimeSpanArgs = {
  end?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['ID']>;
};

export type MutationCreatePresetArgs = {
  input: CreatePreset;
};

export type MutationCreateTimeSpanArgs = {
  input: CreateTimeSpan;
};

export type MutationCreateTimeSpanFromPresetArgs = {
  input: CreateTimeSpanFromPreset;
};

export type MutationDeletePresetArgs = {
  id: Scalars['ID'];
};

export type MutationDeleteTimeSpanArgs = {
  id: Scalars['ID'];
};

export type MutationUpdatePresetArgs = {
  id: Scalars['ID'];
  input: UpdatePreset;
};

export type MutationUpdatePresetSortingArgs = {
  input: Array<UpdatePresetSorting>;
};

export type MutationUpdateTimeSpanArgs = {
  id: Scalars['ID'];
  input: UpdateTimeSpan;
};

/** A preset is a template for time spans. */
export type Preset = {
  __typename?: 'Preset';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  name: Scalars['String'];
  note?: Maybe<Scalars['String']>;
  sortIndex: Scalars['Int'];
  tags: Array<Tag>;
  updatedAt: Scalars['DateTime'];
};

export type PresetList = {
  __typename?: 'PresetList';
  items: Array<Preset>;
  total: Scalars['Int'];
};

export type PresetSearch = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  /**
   * Get the currently authenticated user.
   * Currently Zeitraum supports single-user only.
   */
  me: User;
  /** Get a preset by id */
  preset: Preset;
  /**
   * Get all presets.
   * Presets are sorted by sortIndex in descending order.
   * Use the sortIndex to change the order of presets.
   */
  presets: PresetList;
  /**
   * Get all tags.
   * Tags are sorted by name in ascending order.
   */
  tags: TagList;
  /** Get a time span by id */
  timeSpan: TimeSpan;
  /**
   * Get all time spans.
   * Time spans are sorted by start time in descending order.
   */
  timeSpans: TimeSpanList;
  /** Software version of the server. */
  version: Scalars['String'];
};

export type QueryPresetArgs = {
  id: Scalars['ID'];
};

export type QueryPresetsArgs = {
  input?: InputMaybe<PresetSearch>;
};

export type QueryTagsArgs = {
  input?: InputMaybe<TagSearch>;
};

export type QueryTimeSpanArgs = {
  id: Scalars['ID'];
};

export type QueryTimeSpansArgs = {
  input?: InputMaybe<TimeSpanSearch>;
};

/**
 * A tag is a label that can be attached to time spans and presets.
 * They can be structured in any shape or form to categorize time tracking.
 */
export type Tag = {
  __typename?: 'Tag';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type TagList = {
  __typename?: 'TagList';
  items: Array<Tag>;
  total: Scalars['Int'];
};

export type TagSearch = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  query?: InputMaybe<Scalars['String']>;
};

/**
 * A time span is a period of time between a start and an end time.
 * Time spans can be tagged to categorize time tracking.
 */
export type TimeSpan = {
  __typename?: 'TimeSpan';
  createdAt: Scalars['DateTime'];
  end?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  note?: Maybe<Scalars['String']>;
  running: Scalars['Boolean'];
  start: Scalars['DateTime'];
  tags: Array<Tag>;
  updatedAt: Scalars['DateTime'];
};

export type TimeSpanList = {
  __typename?: 'TimeSpanList';
  items: Array<TimeSpan>;
  total: Scalars['Int'];
};

export type TimeSpanSearch = {
  fromInclusive?: InputMaybe<Scalars['DateTime']>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  running?: InputMaybe<Scalars['Boolean']>;
  tags?: InputMaybe<Array<Scalars['String']>>;
  toInclusive?: InputMaybe<Scalars['DateTime']>;
};

export type UpdatePreset = {
  name: Scalars['String'];
  /** Setting the note to null will remove it */
  note?: InputMaybe<Scalars['String']>;
  sortIndex: Scalars['Int'];
  tags: Array<Scalars['String']>;
};

export type UpdatePresetSorting = {
  id: Scalars['ID'];
  sortIndex: Scalars['Int'];
};

/** Only non-null fields will be updated. */
export type UpdateTimeSpan = {
  end?: InputMaybe<Scalars['DateTime']>;
  note?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['DateTime']>;
  tags?: InputMaybe<Array<Scalars['String']>>;
};

/** A user is a person that has full access to Zeitraum. */
export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  updatedAt: Scalars['DateTime'];
  username: Scalars['String'];
};

export type VersionQueryVariables = Exact<{ [key: string]: never }>;

export type VersionQuery = { __typename?: 'Query'; version: string };

export type CreatePresetMutationVariables = Exact<{
  input: CreatePreset;
}>;

export type CreatePresetMutation = {
  __typename?: 'Mutation';
  createPreset: {
    __typename?: 'Preset';
    id: string;
    createdAt: any;
    updatedAt: any;
    sortIndex: number;
    name: string;
    note?: string | null;
    tags: Array<{ __typename?: 'Tag'; id: string; createdAt: any; updatedAt: any; name: string }>;
  };
};

export type DeletePresetMutationVariables = Exact<{
  id: Scalars['ID'];
}>;

export type DeletePresetMutation = { __typename?: 'Mutation'; deletePreset: boolean };

export type PresetFragmentFragment = {
  __typename?: 'Preset';
  id: string;
  createdAt: any;
  updatedAt: any;
  sortIndex: number;
  name: string;
  note?: string | null;
  tags: Array<{ __typename?: 'Tag'; id: string; createdAt: any; updatedAt: any; name: string }>;
};

export type PresetQueryVariables = Exact<{
  id: Scalars['ID'];
}>;

export type PresetQuery = {
  __typename?: 'Query';
  preset: {
    __typename?: 'Preset';
    id: string;
    createdAt: any;
    updatedAt: any;
    sortIndex: number;
    name: string;
    note?: string | null;
    tags: Array<{ __typename?: 'Tag'; id: string; createdAt: any; updatedAt: any; name: string }>;
  };
};

export type PresetsQueryVariables = Exact<{
  search?: InputMaybe<PresetSearch>;
}>;

export type PresetsQuery = {
  __typename?: 'Query';
  presets: {
    __typename?: 'PresetList';
    total: number;
    items: Array<{
      __typename?: 'Preset';
      id: string;
      createdAt: any;
      updatedAt: any;
      sortIndex: number;
      name: string;
      note?: string | null;
      tags: Array<{ __typename?: 'Tag'; id: string; createdAt: any; updatedAt: any; name: string }>;
    }>;
  };
};

export type UpdatePresetMutationVariables = Exact<{
  id: Scalars['ID'];
  input: UpdatePreset;
}>;

export type UpdatePresetMutation = {
  __typename?: 'Mutation';
  updatePreset: {
    __typename?: 'Preset';
    id: string;
    createdAt: any;
    updatedAt: any;
    sortIndex: number;
    name: string;
    note?: string | null;
    tags: Array<{ __typename?: 'Tag'; id: string; createdAt: any; updatedAt: any; name: string }>;
  };
};

export type UpdatePresetSortingMutationVariables = Exact<{
  input: Array<UpdatePresetSorting> | UpdatePresetSorting;
}>;

export type UpdatePresetSortingMutation = {
  __typename?: 'Mutation';
  updatePresetSorting: Array<{
    __typename?: 'Preset';
    id: string;
    createdAt: any;
    updatedAt: any;
    sortIndex: number;
    name: string;
    note?: string | null;
    tags: Array<{ __typename?: 'Tag'; id: string; createdAt: any; updatedAt: any; name: string }>;
  }>;
};

export type TagFragmentFragment = { __typename?: 'Tag'; id: string; createdAt: any; updatedAt: any; name: string };

export type TagsQueryVariables = Exact<{
  search?: InputMaybe<TagSearch>;
}>;

export type TagsQuery = {
  __typename?: 'Query';
  tags: {
    __typename?: 'TagList';
    total: number;
    items: Array<{ __typename?: 'Tag'; id: string; createdAt: any; updatedAt: any; name: string }>;
  };
};

export type CloseTimeSpanMutationVariables = Exact<{
  id?: InputMaybe<Scalars['ID']>;
  end?: InputMaybe<Scalars['DateTime']>;
}>;

export type CloseTimeSpanMutation = {
  __typename?: 'Mutation';
  closeTimeSpan: {
    __typename?: 'TimeSpan';
    id: string;
    createdAt: any;
    updatedAt: any;
    start: any;
    end?: any | null;
    note?: string | null;
    running: boolean;
    tags: Array<{ __typename?: 'Tag'; id: string; createdAt: any; updatedAt: any; name: string }>;
  };
};

export type CreateTimeSpanMutationVariables = Exact<{
  input: CreateTimeSpan;
}>;

export type CreateTimeSpanMutation = {
  __typename?: 'Mutation';
  createTimeSpan: {
    __typename?: 'TimeSpan';
    id: string;
    createdAt: any;
    updatedAt: any;
    start: any;
    end?: any | null;
    note?: string | null;
    running: boolean;
    tags: Array<{ __typename?: 'Tag'; id: string; createdAt: any; updatedAt: any; name: string }>;
  };
};

export type CreateTimeSpanFromPresetMutationVariables = Exact<{
  input: CreateTimeSpanFromPreset;
}>;

export type CreateTimeSpanFromPresetMutation = {
  __typename?: 'Mutation';
  createTimeSpanFromPreset: {
    __typename?: 'TimeSpan';
    id: string;
    createdAt: any;
    updatedAt: any;
    start: any;
    end?: any | null;
    note?: string | null;
    running: boolean;
    tags: Array<{ __typename?: 'Tag'; id: string; createdAt: any; updatedAt: any; name: string }>;
  };
};

export type DeleteTimeSpanMutationVariables = Exact<{
  id: Scalars['ID'];
}>;

export type DeleteTimeSpanMutation = { __typename?: 'Mutation'; deleteTimeSpan: boolean };

export type TimeSpanFragmentFragment = {
  __typename?: 'TimeSpan';
  id: string;
  createdAt: any;
  updatedAt: any;
  start: any;
  end?: any | null;
  note?: string | null;
  running: boolean;
  tags: Array<{ __typename?: 'Tag'; id: string; createdAt: any; updatedAt: any; name: string }>;
};

export type TimeSpanQueryVariables = Exact<{
  id: Scalars['ID'];
}>;

export type TimeSpanQuery = {
  __typename?: 'Query';
  timeSpan: {
    __typename?: 'TimeSpan';
    id: string;
    createdAt: any;
    updatedAt: any;
    start: any;
    end?: any | null;
    note?: string | null;
    running: boolean;
    tags: Array<{ __typename?: 'Tag'; id: string; createdAt: any; updatedAt: any; name: string }>;
  };
};

export type TimeSpansQueryVariables = Exact<{
  search?: InputMaybe<TimeSpanSearch>;
}>;

export type TimeSpansQuery = {
  __typename?: 'Query';
  timeSpans: {
    __typename?: 'TimeSpanList';
    total: number;
    items: Array<{
      __typename?: 'TimeSpan';
      id: string;
      createdAt: any;
      updatedAt: any;
      start: any;
      end?: any | null;
      note?: string | null;
      running: boolean;
      tags: Array<{ __typename?: 'Tag'; id: string; createdAt: any; updatedAt: any; name: string }>;
    }>;
  };
};

export type UpdateTimeSpanMutationVariables = Exact<{
  id: Scalars['ID'];
  input: UpdateTimeSpan;
}>;

export type UpdateTimeSpanMutation = {
  __typename?: 'Mutation';
  updateTimeSpan: {
    __typename?: 'TimeSpan';
    id: string;
    createdAt: any;
    updatedAt: any;
    start: any;
    end?: any | null;
    note?: string | null;
    running: boolean;
    tags: Array<{ __typename?: 'Tag'; id: string; createdAt: any; updatedAt: any; name: string }>;
  };
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = {
  __typename?: 'Query';
  me: { __typename?: 'User'; id: string; createdAt: any; updatedAt: any; username: string };
};

export const TagFragmentFragmentDoc = `
    fragment TagFragment on Tag {
  id
  createdAt
  updatedAt
  name
}
    `;
export const PresetFragmentFragmentDoc = `
    fragment PresetFragment on Preset {
  id
  createdAt
  updatedAt
  sortIndex
  name
  note
  tags {
    ...TagFragment
  }
}
    ${TagFragmentFragmentDoc}`;
export const TimeSpanFragmentFragmentDoc = `
    fragment TimeSpanFragment on TimeSpan {
  id
  createdAt
  updatedAt
  start
  end
  note
  running
  tags {
    ...TagFragment
  }
}
    ${TagFragmentFragmentDoc}`;
export const VersionDocument = `
    query version {
  version
}
    `;
export const CreatePresetDocument = `
    mutation createPreset($input: CreatePreset!) {
  createPreset(input: $input) {
    ...PresetFragment
  }
}
    ${PresetFragmentFragmentDoc}`;
export const DeletePresetDocument = `
    mutation deletePreset($id: ID!) {
  deletePreset(id: $id)
}
    `;
export const PresetDocument = `
    query preset($id: ID!) {
  preset(id: $id) {
    ...PresetFragment
  }
}
    ${PresetFragmentFragmentDoc}`;
export const PresetsDocument = `
    query presets($search: PresetSearch) {
  presets(input: $search) {
    total
    items {
      ...PresetFragment
    }
  }
}
    ${PresetFragmentFragmentDoc}`;
export const UpdatePresetDocument = `
    mutation updatePreset($id: ID!, $input: UpdatePreset!) {
  updatePreset(id: $id, input: $input) {
    ...PresetFragment
  }
}
    ${PresetFragmentFragmentDoc}`;
export const UpdatePresetSortingDocument = `
    mutation updatePresetSorting($input: [UpdatePresetSorting!]!) {
  updatePresetSorting(input: $input) {
    ...PresetFragment
  }
}
    ${PresetFragmentFragmentDoc}`;
export const TagsDocument = `
    query tags($search: TagSearch) {
  tags(input: $search) {
    total
    items {
      ...TagFragment
    }
  }
}
    ${TagFragmentFragmentDoc}`;
export const CloseTimeSpanDocument = `
    mutation closeTimeSpan($id: ID, $end: DateTime) {
  closeTimeSpan(id: $id, end: $end) {
    ...TimeSpanFragment
  }
}
    ${TimeSpanFragmentFragmentDoc}`;
export const CreateTimeSpanDocument = `
    mutation createTimeSpan($input: CreateTimeSpan!) {
  createTimeSpan(input: $input) {
    ...TimeSpanFragment
  }
}
    ${TimeSpanFragmentFragmentDoc}`;
export const CreateTimeSpanFromPresetDocument = `
    mutation createTimeSpanFromPreset($input: CreateTimeSpanFromPreset!) {
  createTimeSpanFromPreset(input: $input) {
    ...TimeSpanFragment
  }
}
    ${TimeSpanFragmentFragmentDoc}`;
export const DeleteTimeSpanDocument = `
    mutation deleteTimeSpan($id: ID!) {
  deleteTimeSpan(id: $id)
}
    `;
export const TimeSpanDocument = `
    query timeSpan($id: ID!) {
  timeSpan(id: $id) {
    ...TimeSpanFragment
  }
}
    ${TimeSpanFragmentFragmentDoc}`;
export const TimeSpansDocument = `
    query timeSpans($search: TimeSpanSearch) {
  timeSpans(input: $search) {
    total
    items {
      ...TimeSpanFragment
    }
  }
}
    ${TimeSpanFragmentFragmentDoc}`;
export const UpdateTimeSpanDocument = `
    mutation updateTimeSpan($id: ID!, $input: UpdateTimeSpan!) {
  updateTimeSpan(id: $id, input: $input) {
    ...TimeSpanFragment
  }
}
    ${TimeSpanFragmentFragmentDoc}`;
export const MeDocument = `
    query me {
  me {
    id
    createdAt
    updatedAt
    username
  }
}
    `;
export type Requester<C = {}, E = unknown> = <R, V>(
  doc: string,
  vars?: V,
  options?: C,
) => Promise<ExecutionResult<R, E>> | AsyncIterable<ExecutionResult<R, E>>;
export function getSdk<C, E>(requester: Requester<C, E>) {
  return {
    version(variables?: VersionQueryVariables, options?: C): Promise<ExecutionResult<VersionQuery, E>> {
      return requester<VersionQuery, VersionQueryVariables>(VersionDocument, variables, options) as Promise<
        ExecutionResult<VersionQuery, E>
      >;
    },
    createPreset(
      variables: CreatePresetMutationVariables,
      options?: C,
    ): Promise<ExecutionResult<CreatePresetMutation, E>> {
      return requester<CreatePresetMutation, CreatePresetMutationVariables>(
        CreatePresetDocument,
        variables,
        options,
      ) as Promise<ExecutionResult<CreatePresetMutation, E>>;
    },
    deletePreset(
      variables: DeletePresetMutationVariables,
      options?: C,
    ): Promise<ExecutionResult<DeletePresetMutation, E>> {
      return requester<DeletePresetMutation, DeletePresetMutationVariables>(
        DeletePresetDocument,
        variables,
        options,
      ) as Promise<ExecutionResult<DeletePresetMutation, E>>;
    },
    preset(variables: PresetQueryVariables, options?: C): Promise<ExecutionResult<PresetQuery, E>> {
      return requester<PresetQuery, PresetQueryVariables>(PresetDocument, variables, options) as Promise<
        ExecutionResult<PresetQuery, E>
      >;
    },
    presets(variables?: PresetsQueryVariables, options?: C): Promise<ExecutionResult<PresetsQuery, E>> {
      return requester<PresetsQuery, PresetsQueryVariables>(PresetsDocument, variables, options) as Promise<
        ExecutionResult<PresetsQuery, E>
      >;
    },
    updatePreset(
      variables: UpdatePresetMutationVariables,
      options?: C,
    ): Promise<ExecutionResult<UpdatePresetMutation, E>> {
      return requester<UpdatePresetMutation, UpdatePresetMutationVariables>(
        UpdatePresetDocument,
        variables,
        options,
      ) as Promise<ExecutionResult<UpdatePresetMutation, E>>;
    },
    updatePresetSorting(
      variables: UpdatePresetSortingMutationVariables,
      options?: C,
    ): Promise<ExecutionResult<UpdatePresetSortingMutation, E>> {
      return requester<UpdatePresetSortingMutation, UpdatePresetSortingMutationVariables>(
        UpdatePresetSortingDocument,
        variables,
        options,
      ) as Promise<ExecutionResult<UpdatePresetSortingMutation, E>>;
    },
    tags(variables?: TagsQueryVariables, options?: C): Promise<ExecutionResult<TagsQuery, E>> {
      return requester<TagsQuery, TagsQueryVariables>(TagsDocument, variables, options) as Promise<
        ExecutionResult<TagsQuery, E>
      >;
    },
    closeTimeSpan(
      variables?: CloseTimeSpanMutationVariables,
      options?: C,
    ): Promise<ExecutionResult<CloseTimeSpanMutation, E>> {
      return requester<CloseTimeSpanMutation, CloseTimeSpanMutationVariables>(
        CloseTimeSpanDocument,
        variables,
        options,
      ) as Promise<ExecutionResult<CloseTimeSpanMutation, E>>;
    },
    createTimeSpan(
      variables: CreateTimeSpanMutationVariables,
      options?: C,
    ): Promise<ExecutionResult<CreateTimeSpanMutation, E>> {
      return requester<CreateTimeSpanMutation, CreateTimeSpanMutationVariables>(
        CreateTimeSpanDocument,
        variables,
        options,
      ) as Promise<ExecutionResult<CreateTimeSpanMutation, E>>;
    },
    createTimeSpanFromPreset(
      variables: CreateTimeSpanFromPresetMutationVariables,
      options?: C,
    ): Promise<ExecutionResult<CreateTimeSpanFromPresetMutation, E>> {
      return requester<CreateTimeSpanFromPresetMutation, CreateTimeSpanFromPresetMutationVariables>(
        CreateTimeSpanFromPresetDocument,
        variables,
        options,
      ) as Promise<ExecutionResult<CreateTimeSpanFromPresetMutation, E>>;
    },
    deleteTimeSpan(
      variables: DeleteTimeSpanMutationVariables,
      options?: C,
    ): Promise<ExecutionResult<DeleteTimeSpanMutation, E>> {
      return requester<DeleteTimeSpanMutation, DeleteTimeSpanMutationVariables>(
        DeleteTimeSpanDocument,
        variables,
        options,
      ) as Promise<ExecutionResult<DeleteTimeSpanMutation, E>>;
    },
    timeSpan(variables: TimeSpanQueryVariables, options?: C): Promise<ExecutionResult<TimeSpanQuery, E>> {
      return requester<TimeSpanQuery, TimeSpanQueryVariables>(TimeSpanDocument, variables, options) as Promise<
        ExecutionResult<TimeSpanQuery, E>
      >;
    },
    timeSpans(variables?: TimeSpansQueryVariables, options?: C): Promise<ExecutionResult<TimeSpansQuery, E>> {
      return requester<TimeSpansQuery, TimeSpansQueryVariables>(TimeSpansDocument, variables, options) as Promise<
        ExecutionResult<TimeSpansQuery, E>
      >;
    },
    updateTimeSpan(
      variables: UpdateTimeSpanMutationVariables,
      options?: C,
    ): Promise<ExecutionResult<UpdateTimeSpanMutation, E>> {
      return requester<UpdateTimeSpanMutation, UpdateTimeSpanMutationVariables>(
        UpdateTimeSpanDocument,
        variables,
        options,
      ) as Promise<ExecutionResult<UpdateTimeSpanMutation, E>>;
    },
    me(variables?: MeQueryVariables, options?: C): Promise<ExecutionResult<MeQuery, E>> {
      return requester<MeQuery, MeQueryVariables>(MeDocument, variables, options) as Promise<
        ExecutionResult<MeQuery, E>
      >;
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
