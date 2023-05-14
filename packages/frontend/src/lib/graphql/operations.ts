/* eslint-disable */
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: string;
};

export type CreatePreset = {
  name: Scalars['String'];
  note?: InputMaybe<Scalars['String']>;
  tags: Array<Scalars['String']>;
};

export type CreateTag = {
  name: Scalars['String'];
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
  /**
   * Tags are usually created implicitly when creating a time span or preset.
   * This mutation can be used to create tags explicitly.
   */
  createTag: Tag;
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

export type MutationCreateTagArgs = {
  input: CreateTag;
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
    createdAt: string;
    updatedAt: string;
    sortIndex: number;
    name: string;
    note?: string | null;
    tags: Array<{ __typename?: 'Tag'; id: string; createdAt: string; updatedAt: string; name: string }>;
  };
};

export type DeletePresetMutationVariables = Exact<{
  id: Scalars['ID'];
}>;

export type DeletePresetMutation = { __typename?: 'Mutation'; deletePreset: boolean };

export type PresetFragmentFragment = {
  __typename?: 'Preset';
  id: string;
  createdAt: string;
  updatedAt: string;
  sortIndex: number;
  name: string;
  note?: string | null;
  tags: Array<{ __typename?: 'Tag'; id: string; createdAt: string; updatedAt: string; name: string }>;
};

export type PresetQueryVariables = Exact<{
  id: Scalars['ID'];
}>;

export type PresetQuery = {
  __typename?: 'Query';
  preset: {
    __typename?: 'Preset';
    id: string;
    createdAt: string;
    updatedAt: string;
    sortIndex: number;
    name: string;
    note?: string | null;
    tags: Array<{ __typename?: 'Tag'; id: string; createdAt: string; updatedAt: string; name: string }>;
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
      createdAt: string;
      updatedAt: string;
      sortIndex: number;
      name: string;
      note?: string | null;
      tags: Array<{ __typename?: 'Tag'; id: string; createdAt: string; updatedAt: string; name: string }>;
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
    createdAt: string;
    updatedAt: string;
    sortIndex: number;
    name: string;
    note?: string | null;
    tags: Array<{ __typename?: 'Tag'; id: string; createdAt: string; updatedAt: string; name: string }>;
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
    createdAt: string;
    updatedAt: string;
    sortIndex: number;
    name: string;
    note?: string | null;
    tags: Array<{ __typename?: 'Tag'; id: string; createdAt: string; updatedAt: string; name: string }>;
  }>;
};

export type CreateTagMutationVariables = Exact<{
  input: CreateTag;
}>;

export type CreateTagMutation = {
  __typename?: 'Mutation';
  createTag: { __typename?: 'Tag'; id: string; createdAt: string; updatedAt: string; name: string };
};

export type TagFragmentFragment = {
  __typename?: 'Tag';
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
};

export type TagsQueryVariables = Exact<{
  search?: InputMaybe<TagSearch>;
}>;

export type TagsQuery = {
  __typename?: 'Query';
  tags: {
    __typename?: 'TagList';
    total: number;
    items: Array<{ __typename?: 'Tag'; id: string; createdAt: string; updatedAt: string; name: string }>;
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
    createdAt: string;
    updatedAt: string;
    start: string;
    end?: string | null;
    note?: string | null;
    running: boolean;
    tags: Array<{ __typename?: 'Tag'; id: string; createdAt: string; updatedAt: string; name: string }>;
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
    createdAt: string;
    updatedAt: string;
    start: string;
    end?: string | null;
    note?: string | null;
    running: boolean;
    tags: Array<{ __typename?: 'Tag'; id: string; createdAt: string; updatedAt: string; name: string }>;
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
    createdAt: string;
    updatedAt: string;
    start: string;
    end?: string | null;
    note?: string | null;
    running: boolean;
    tags: Array<{ __typename?: 'Tag'; id: string; createdAt: string; updatedAt: string; name: string }>;
  };
};

export type DeleteTimeSpanMutationVariables = Exact<{
  id: Scalars['ID'];
}>;

export type DeleteTimeSpanMutation = { __typename?: 'Mutation'; deleteTimeSpan: boolean };

export type TimeSpanFragmentFragment = {
  __typename?: 'TimeSpan';
  id: string;
  createdAt: string;
  updatedAt: string;
  start: string;
  end?: string | null;
  note?: string | null;
  running: boolean;
  tags: Array<{ __typename?: 'Tag'; id: string; createdAt: string; updatedAt: string; name: string }>;
};

export type TimeSpanQueryVariables = Exact<{
  id: Scalars['ID'];
}>;

export type TimeSpanQuery = {
  __typename?: 'Query';
  timeSpan: {
    __typename?: 'TimeSpan';
    id: string;
    createdAt: string;
    updatedAt: string;
    start: string;
    end?: string | null;
    note?: string | null;
    running: boolean;
    tags: Array<{ __typename?: 'Tag'; id: string; createdAt: string; updatedAt: string; name: string }>;
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
      createdAt: string;
      updatedAt: string;
      start: string;
      end?: string | null;
      note?: string | null;
      running: boolean;
      tags: Array<{ __typename?: 'Tag'; id: string; createdAt: string; updatedAt: string; name: string }>;
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
    createdAt: string;
    updatedAt: string;
    start: string;
    end?: string | null;
    note?: string | null;
    running: boolean;
    tags: Array<{ __typename?: 'Tag'; id: string; createdAt: string; updatedAt: string; name: string }>;
  };
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = {
  __typename?: 'Query';
  me: { __typename?: 'User'; id: string; createdAt: string; updatedAt: string; username: string };
};

export const TagFragmentFragmentDoc = gql`
  fragment TagFragment on Tag {
    id
    createdAt
    updatedAt
    name
  }
`;
export const PresetFragmentFragmentDoc = gql`
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
  ${TagFragmentFragmentDoc}
`;
export const TimeSpanFragmentFragmentDoc = gql`
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
  ${TagFragmentFragmentDoc}
`;
export const VersionDocument = gql`
  query version {
    version
  }
`;

/**
 * __useVersionQuery__
 *
 * To run a query within a React component, call `useVersionQuery` and pass it any options that fit your needs.
 * When your component renders, `useVersionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVersionQuery({
 *   variables: {
 *   },
 * });
 */
export function useVersionQuery(baseOptions?: Apollo.QueryHookOptions<VersionQuery, VersionQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<VersionQuery, VersionQueryVariables>(VersionDocument, options);
}
export function useVersionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<VersionQuery, VersionQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<VersionQuery, VersionQueryVariables>(VersionDocument, options);
}
export type VersionQueryHookResult = ReturnType<typeof useVersionQuery>;
export type VersionLazyQueryHookResult = ReturnType<typeof useVersionLazyQuery>;
export type VersionQueryResult = Apollo.QueryResult<VersionQuery, VersionQueryVariables>;
export const CreatePresetDocument = gql`
  mutation createPreset($input: CreatePreset!) {
    createPreset(input: $input) {
      ...PresetFragment
    }
  }
  ${PresetFragmentFragmentDoc}
`;
export type CreatePresetMutationFn = Apollo.MutationFunction<CreatePresetMutation, CreatePresetMutationVariables>;

/**
 * __useCreatePresetMutation__
 *
 * To run a mutation, you first call `useCreatePresetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePresetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPresetMutation, { data, loading, error }] = useCreatePresetMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePresetMutation(
  baseOptions?: Apollo.MutationHookOptions<CreatePresetMutation, CreatePresetMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreatePresetMutation, CreatePresetMutationVariables>(CreatePresetDocument, options);
}
export type CreatePresetMutationHookResult = ReturnType<typeof useCreatePresetMutation>;
export type CreatePresetMutationResult = Apollo.MutationResult<CreatePresetMutation>;
export type CreatePresetMutationOptions = Apollo.BaseMutationOptions<
  CreatePresetMutation,
  CreatePresetMutationVariables
>;
export const DeletePresetDocument = gql`
  mutation deletePreset($id: ID!) {
    deletePreset(id: $id)
  }
`;
export type DeletePresetMutationFn = Apollo.MutationFunction<DeletePresetMutation, DeletePresetMutationVariables>;

/**
 * __useDeletePresetMutation__
 *
 * To run a mutation, you first call `useDeletePresetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePresetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePresetMutation, { data, loading, error }] = useDeletePresetMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePresetMutation(
  baseOptions?: Apollo.MutationHookOptions<DeletePresetMutation, DeletePresetMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<DeletePresetMutation, DeletePresetMutationVariables>(DeletePresetDocument, options);
}
export type DeletePresetMutationHookResult = ReturnType<typeof useDeletePresetMutation>;
export type DeletePresetMutationResult = Apollo.MutationResult<DeletePresetMutation>;
export type DeletePresetMutationOptions = Apollo.BaseMutationOptions<
  DeletePresetMutation,
  DeletePresetMutationVariables
>;
export const PresetDocument = gql`
  query preset($id: ID!) {
    preset(id: $id) {
      ...PresetFragment
    }
  }
  ${PresetFragmentFragmentDoc}
`;

/**
 * __usePresetQuery__
 *
 * To run a query within a React component, call `usePresetQuery` and pass it any options that fit your needs.
 * When your component renders, `usePresetQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePresetQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePresetQuery(baseOptions: Apollo.QueryHookOptions<PresetQuery, PresetQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<PresetQuery, PresetQueryVariables>(PresetDocument, options);
}
export function usePresetLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PresetQuery, PresetQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<PresetQuery, PresetQueryVariables>(PresetDocument, options);
}
export type PresetQueryHookResult = ReturnType<typeof usePresetQuery>;
export type PresetLazyQueryHookResult = ReturnType<typeof usePresetLazyQuery>;
export type PresetQueryResult = Apollo.QueryResult<PresetQuery, PresetQueryVariables>;
export const PresetsDocument = gql`
  query presets($search: PresetSearch) {
    presets(input: $search) {
      total
      items {
        ...PresetFragment
      }
    }
  }
  ${PresetFragmentFragmentDoc}
`;

/**
 * __usePresetsQuery__
 *
 * To run a query within a React component, call `usePresetsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePresetsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePresetsQuery({
 *   variables: {
 *      search: // value for 'search'
 *   },
 * });
 */
export function usePresetsQuery(baseOptions?: Apollo.QueryHookOptions<PresetsQuery, PresetsQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<PresetsQuery, PresetsQueryVariables>(PresetsDocument, options);
}
export function usePresetsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PresetsQuery, PresetsQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<PresetsQuery, PresetsQueryVariables>(PresetsDocument, options);
}
export type PresetsQueryHookResult = ReturnType<typeof usePresetsQuery>;
export type PresetsLazyQueryHookResult = ReturnType<typeof usePresetsLazyQuery>;
export type PresetsQueryResult = Apollo.QueryResult<PresetsQuery, PresetsQueryVariables>;
export const UpdatePresetDocument = gql`
  mutation updatePreset($id: ID!, $input: UpdatePreset!) {
    updatePreset(id: $id, input: $input) {
      ...PresetFragment
    }
  }
  ${PresetFragmentFragmentDoc}
`;
export type UpdatePresetMutationFn = Apollo.MutationFunction<UpdatePresetMutation, UpdatePresetMutationVariables>;

/**
 * __useUpdatePresetMutation__
 *
 * To run a mutation, you first call `useUpdatePresetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePresetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePresetMutation, { data, loading, error }] = useUpdatePresetMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdatePresetMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdatePresetMutation, UpdatePresetMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdatePresetMutation, UpdatePresetMutationVariables>(UpdatePresetDocument, options);
}
export type UpdatePresetMutationHookResult = ReturnType<typeof useUpdatePresetMutation>;
export type UpdatePresetMutationResult = Apollo.MutationResult<UpdatePresetMutation>;
export type UpdatePresetMutationOptions = Apollo.BaseMutationOptions<
  UpdatePresetMutation,
  UpdatePresetMutationVariables
>;
export const UpdatePresetSortingDocument = gql`
  mutation updatePresetSorting($input: [UpdatePresetSorting!]!) {
    updatePresetSorting(input: $input) {
      ...PresetFragment
    }
  }
  ${PresetFragmentFragmentDoc}
`;
export type UpdatePresetSortingMutationFn = Apollo.MutationFunction<
  UpdatePresetSortingMutation,
  UpdatePresetSortingMutationVariables
>;

/**
 * __useUpdatePresetSortingMutation__
 *
 * To run a mutation, you first call `useUpdatePresetSortingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePresetSortingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePresetSortingMutation, { data, loading, error }] = useUpdatePresetSortingMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdatePresetSortingMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdatePresetSortingMutation, UpdatePresetSortingMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdatePresetSortingMutation, UpdatePresetSortingMutationVariables>(
    UpdatePresetSortingDocument,
    options,
  );
}
export type UpdatePresetSortingMutationHookResult = ReturnType<typeof useUpdatePresetSortingMutation>;
export type UpdatePresetSortingMutationResult = Apollo.MutationResult<UpdatePresetSortingMutation>;
export type UpdatePresetSortingMutationOptions = Apollo.BaseMutationOptions<
  UpdatePresetSortingMutation,
  UpdatePresetSortingMutationVariables
>;
export const CreateTagDocument = gql`
  mutation createTag($input: CreateTag!) {
    createTag(input: $input) {
      ...TagFragment
    }
  }
  ${TagFragmentFragmentDoc}
`;
export type CreateTagMutationFn = Apollo.MutationFunction<CreateTagMutation, CreateTagMutationVariables>;

/**
 * __useCreateTagMutation__
 *
 * To run a mutation, you first call `useCreateTagMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTagMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTagMutation, { data, loading, error }] = useCreateTagMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateTagMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateTagMutation, CreateTagMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateTagMutation, CreateTagMutationVariables>(CreateTagDocument, options);
}
export type CreateTagMutationHookResult = ReturnType<typeof useCreateTagMutation>;
export type CreateTagMutationResult = Apollo.MutationResult<CreateTagMutation>;
export type CreateTagMutationOptions = Apollo.BaseMutationOptions<CreateTagMutation, CreateTagMutationVariables>;
export const TagsDocument = gql`
  query tags($search: TagSearch) {
    tags(input: $search) {
      total
      items {
        ...TagFragment
      }
    }
  }
  ${TagFragmentFragmentDoc}
`;

/**
 * __useTagsQuery__
 *
 * To run a query within a React component, call `useTagsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTagsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTagsQuery({
 *   variables: {
 *      search: // value for 'search'
 *   },
 * });
 */
export function useTagsQuery(baseOptions?: Apollo.QueryHookOptions<TagsQuery, TagsQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<TagsQuery, TagsQueryVariables>(TagsDocument, options);
}
export function useTagsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TagsQuery, TagsQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<TagsQuery, TagsQueryVariables>(TagsDocument, options);
}
export type TagsQueryHookResult = ReturnType<typeof useTagsQuery>;
export type TagsLazyQueryHookResult = ReturnType<typeof useTagsLazyQuery>;
export type TagsQueryResult = Apollo.QueryResult<TagsQuery, TagsQueryVariables>;
export const CloseTimeSpanDocument = gql`
  mutation closeTimeSpan($id: ID, $end: DateTime) {
    closeTimeSpan(id: $id, end: $end) {
      ...TimeSpanFragment
    }
  }
  ${TimeSpanFragmentFragmentDoc}
`;
export type CloseTimeSpanMutationFn = Apollo.MutationFunction<CloseTimeSpanMutation, CloseTimeSpanMutationVariables>;

/**
 * __useCloseTimeSpanMutation__
 *
 * To run a mutation, you first call `useCloseTimeSpanMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCloseTimeSpanMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [closeTimeSpanMutation, { data, loading, error }] = useCloseTimeSpanMutation({
 *   variables: {
 *      id: // value for 'id'
 *      end: // value for 'end'
 *   },
 * });
 */
export function useCloseTimeSpanMutation(
  baseOptions?: Apollo.MutationHookOptions<CloseTimeSpanMutation, CloseTimeSpanMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CloseTimeSpanMutation, CloseTimeSpanMutationVariables>(CloseTimeSpanDocument, options);
}
export type CloseTimeSpanMutationHookResult = ReturnType<typeof useCloseTimeSpanMutation>;
export type CloseTimeSpanMutationResult = Apollo.MutationResult<CloseTimeSpanMutation>;
export type CloseTimeSpanMutationOptions = Apollo.BaseMutationOptions<
  CloseTimeSpanMutation,
  CloseTimeSpanMutationVariables
>;
export const CreateTimeSpanDocument = gql`
  mutation createTimeSpan($input: CreateTimeSpan!) {
    createTimeSpan(input: $input) {
      ...TimeSpanFragment
    }
  }
  ${TimeSpanFragmentFragmentDoc}
`;
export type CreateTimeSpanMutationFn = Apollo.MutationFunction<CreateTimeSpanMutation, CreateTimeSpanMutationVariables>;

/**
 * __useCreateTimeSpanMutation__
 *
 * To run a mutation, you first call `useCreateTimeSpanMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTimeSpanMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTimeSpanMutation, { data, loading, error }] = useCreateTimeSpanMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateTimeSpanMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateTimeSpanMutation, CreateTimeSpanMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateTimeSpanMutation, CreateTimeSpanMutationVariables>(CreateTimeSpanDocument, options);
}
export type CreateTimeSpanMutationHookResult = ReturnType<typeof useCreateTimeSpanMutation>;
export type CreateTimeSpanMutationResult = Apollo.MutationResult<CreateTimeSpanMutation>;
export type CreateTimeSpanMutationOptions = Apollo.BaseMutationOptions<
  CreateTimeSpanMutation,
  CreateTimeSpanMutationVariables
>;
export const CreateTimeSpanFromPresetDocument = gql`
  mutation createTimeSpanFromPreset($input: CreateTimeSpanFromPreset!) {
    createTimeSpanFromPreset(input: $input) {
      ...TimeSpanFragment
    }
  }
  ${TimeSpanFragmentFragmentDoc}
`;
export type CreateTimeSpanFromPresetMutationFn = Apollo.MutationFunction<
  CreateTimeSpanFromPresetMutation,
  CreateTimeSpanFromPresetMutationVariables
>;

/**
 * __useCreateTimeSpanFromPresetMutation__
 *
 * To run a mutation, you first call `useCreateTimeSpanFromPresetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTimeSpanFromPresetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTimeSpanFromPresetMutation, { data, loading, error }] = useCreateTimeSpanFromPresetMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateTimeSpanFromPresetMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateTimeSpanFromPresetMutation, CreateTimeSpanFromPresetMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateTimeSpanFromPresetMutation, CreateTimeSpanFromPresetMutationVariables>(
    CreateTimeSpanFromPresetDocument,
    options,
  );
}
export type CreateTimeSpanFromPresetMutationHookResult = ReturnType<typeof useCreateTimeSpanFromPresetMutation>;
export type CreateTimeSpanFromPresetMutationResult = Apollo.MutationResult<CreateTimeSpanFromPresetMutation>;
export type CreateTimeSpanFromPresetMutationOptions = Apollo.BaseMutationOptions<
  CreateTimeSpanFromPresetMutation,
  CreateTimeSpanFromPresetMutationVariables
>;
export const DeleteTimeSpanDocument = gql`
  mutation deleteTimeSpan($id: ID!) {
    deleteTimeSpan(id: $id)
  }
`;
export type DeleteTimeSpanMutationFn = Apollo.MutationFunction<DeleteTimeSpanMutation, DeleteTimeSpanMutationVariables>;

/**
 * __useDeleteTimeSpanMutation__
 *
 * To run a mutation, you first call `useDeleteTimeSpanMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTimeSpanMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTimeSpanMutation, { data, loading, error }] = useDeleteTimeSpanMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteTimeSpanMutation(
  baseOptions?: Apollo.MutationHookOptions<DeleteTimeSpanMutation, DeleteTimeSpanMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<DeleteTimeSpanMutation, DeleteTimeSpanMutationVariables>(DeleteTimeSpanDocument, options);
}
export type DeleteTimeSpanMutationHookResult = ReturnType<typeof useDeleteTimeSpanMutation>;
export type DeleteTimeSpanMutationResult = Apollo.MutationResult<DeleteTimeSpanMutation>;
export type DeleteTimeSpanMutationOptions = Apollo.BaseMutationOptions<
  DeleteTimeSpanMutation,
  DeleteTimeSpanMutationVariables
>;
export const TimeSpanDocument = gql`
  query timeSpan($id: ID!) {
    timeSpan(id: $id) {
      ...TimeSpanFragment
    }
  }
  ${TimeSpanFragmentFragmentDoc}
`;

/**
 * __useTimeSpanQuery__
 *
 * To run a query within a React component, call `useTimeSpanQuery` and pass it any options that fit your needs.
 * When your component renders, `useTimeSpanQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTimeSpanQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useTimeSpanQuery(baseOptions: Apollo.QueryHookOptions<TimeSpanQuery, TimeSpanQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<TimeSpanQuery, TimeSpanQueryVariables>(TimeSpanDocument, options);
}
export function useTimeSpanLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TimeSpanQuery, TimeSpanQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<TimeSpanQuery, TimeSpanQueryVariables>(TimeSpanDocument, options);
}
export type TimeSpanQueryHookResult = ReturnType<typeof useTimeSpanQuery>;
export type TimeSpanLazyQueryHookResult = ReturnType<typeof useTimeSpanLazyQuery>;
export type TimeSpanQueryResult = Apollo.QueryResult<TimeSpanQuery, TimeSpanQueryVariables>;
export const TimeSpansDocument = gql`
  query timeSpans($search: TimeSpanSearch) {
    timeSpans(input: $search) {
      total
      items {
        ...TimeSpanFragment
      }
    }
  }
  ${TimeSpanFragmentFragmentDoc}
`;

/**
 * __useTimeSpansQuery__
 *
 * To run a query within a React component, call `useTimeSpansQuery` and pass it any options that fit your needs.
 * When your component renders, `useTimeSpansQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTimeSpansQuery({
 *   variables: {
 *      search: // value for 'search'
 *   },
 * });
 */
export function useTimeSpansQuery(baseOptions?: Apollo.QueryHookOptions<TimeSpansQuery, TimeSpansQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<TimeSpansQuery, TimeSpansQueryVariables>(TimeSpansDocument, options);
}
export function useTimeSpansLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<TimeSpansQuery, TimeSpansQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<TimeSpansQuery, TimeSpansQueryVariables>(TimeSpansDocument, options);
}
export type TimeSpansQueryHookResult = ReturnType<typeof useTimeSpansQuery>;
export type TimeSpansLazyQueryHookResult = ReturnType<typeof useTimeSpansLazyQuery>;
export type TimeSpansQueryResult = Apollo.QueryResult<TimeSpansQuery, TimeSpansQueryVariables>;
export const UpdateTimeSpanDocument = gql`
  mutation updateTimeSpan($id: ID!, $input: UpdateTimeSpan!) {
    updateTimeSpan(id: $id, input: $input) {
      ...TimeSpanFragment
    }
  }
  ${TimeSpanFragmentFragmentDoc}
`;
export type UpdateTimeSpanMutationFn = Apollo.MutationFunction<UpdateTimeSpanMutation, UpdateTimeSpanMutationVariables>;

/**
 * __useUpdateTimeSpanMutation__
 *
 * To run a mutation, you first call `useUpdateTimeSpanMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTimeSpanMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTimeSpanMutation, { data, loading, error }] = useUpdateTimeSpanMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateTimeSpanMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateTimeSpanMutation, UpdateTimeSpanMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateTimeSpanMutation, UpdateTimeSpanMutationVariables>(UpdateTimeSpanDocument, options);
}
export type UpdateTimeSpanMutationHookResult = ReturnType<typeof useUpdateTimeSpanMutation>;
export type UpdateTimeSpanMutationResult = Apollo.MutationResult<UpdateTimeSpanMutation>;
export type UpdateTimeSpanMutationOptions = Apollo.BaseMutationOptions<
  UpdateTimeSpanMutation,
  UpdateTimeSpanMutationVariables
>;
export const MeDocument = gql`
  query me {
    me {
      id
      createdAt
      updatedAt
      username
    }
  }
`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
