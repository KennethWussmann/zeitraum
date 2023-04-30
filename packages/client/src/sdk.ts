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

export type CreateUpdateTimeSpan = {
  end?: InputMaybe<Scalars['DateTime']>;
  note?: InputMaybe<Scalars['String']>;
  start: Scalars['DateTime'];
  tags: Array<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createTimeSpan: TimeSpan;
  deleteTimeSpan: Scalars['Boolean'];
  updateTimeSpan: TimeSpan;
};

export type MutationCreateTimeSpanArgs = {
  input: CreateUpdateTimeSpan;
};

export type MutationDeleteTimeSpanArgs = {
  id: Scalars['ID'];
};

export type MutationUpdateTimeSpanArgs = {
  id: Scalars['ID'];
  input: CreateUpdateTimeSpan;
};

export type Query = {
  __typename?: 'Query';
  me: User;
  tags: TagList;
  timeSpan: TimeSpan;
  timeSpans: TimeSpanList;
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

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  updatedAt: Scalars['DateTime'];
  username: Scalars['String'];
};

export type TagFragmentFragment = { __typename?: 'Tag'; id: string; createdAt: any; updatedAt: any; name: string };

export type TagsQueryVariables = Exact<{
  input?: InputMaybe<TagSearch>;
}>;

export type TagsQuery = {
  __typename?: 'Query';
  tags: {
    __typename?: 'TagList';
    total: number;
    items: Array<{ __typename?: 'Tag'; id: string; createdAt: any; updatedAt: any; name: string }>;
  };
};

export type CreateTimeSpanMutationVariables = Exact<{
  data: CreateUpdateTimeSpan;
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
  input?: InputMaybe<TimeSpanSearch>;
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
  data: CreateUpdateTimeSpan;
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

export type MeQuery = { __typename?: 'Query'; me: { __typename?: 'User'; id: string; createdAt: any; updatedAt: any } };

export const TagFragmentFragmentDoc = `
    fragment TagFragment on Tag {
  id
  createdAt
  updatedAt
  name
}
    `;
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
export const TagsDocument = `
    query tags($input: TagSearch) {
  tags(input: $input) {
    total
    items {
      ...TagFragment
    }
  }
}
    ${TagFragmentFragmentDoc}`;
export const CreateTimeSpanDocument = `
    mutation createTimeSpan($data: CreateUpdateTimeSpan!) {
  createTimeSpan(input: $data) {
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
    query timeSpans($input: TimeSpanSearch) {
  timeSpans(input: $input) {
    total
    items {
      ...TimeSpanFragment
    }
  }
}
    ${TimeSpanFragmentFragmentDoc}`;
export const UpdateTimeSpanDocument = `
    mutation updateTimeSpan($id: ID!, $data: CreateUpdateTimeSpan!) {
  updateTimeSpan(id: $id, input: $data) {
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
    tags(variables?: TagsQueryVariables, options?: C): Promise<ExecutionResult<TagsQuery, E>> {
      return requester<TagsQuery, TagsQueryVariables>(TagsDocument, variables, options) as Promise<
        ExecutionResult<TagsQuery, E>
      >;
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
