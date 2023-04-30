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

export type CreateUpdateTimeSpanInput = {
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
  input: CreateUpdateTimeSpanInput;
};

export type MutationDeleteTimeSpanArgs = {
  id: Scalars['ID'];
};

export type MutationUpdateTimeSpanArgs = {
  id: Scalars['ID'];
  input: CreateUpdateTimeSpanInput;
};

export type Query = {
  __typename?: 'Query';
  me: User;
  timeSpans: TimeSpanList;
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

export type TimeSpan = {
  __typename?: 'TimeSpan';
  createdAt: Scalars['DateTime'];
  end?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  note?: Maybe<Scalars['String']>;
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
  tags?: InputMaybe<Array<Scalars['String']>>;
  toInclusive?: InputMaybe<Scalars['DateTime']>;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  updatedAt: Scalars['DateTime'];
};

export type TagFragmentFragment = { __typename?: 'Tag'; id: string; createdAt: any; updatedAt: any; name: string };

export type CreateTimeSpanMutationVariables = Exact<{
  data: CreateUpdateTimeSpanInput;
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
  tags: Array<{ __typename?: 'Tag'; id: string; createdAt: any; updatedAt: any; name: string }>;
};

export type UpdateTimeSpanMutationVariables = Exact<{
  id: Scalars['ID'];
  data: CreateUpdateTimeSpanInput;
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
  tags {
    ...TagFragment
  }
}
    ${TagFragmentFragmentDoc}`;
export const CreateTimeSpanDocument = `
    mutation createTimeSpan($data: CreateUpdateTimeSpanInput!) {
  createTimeSpan(input: $data) {
    ...TimeSpanFragment
  }
}
    ${TimeSpanFragmentFragmentDoc}`;
export const DeleteTimeSpanDocument = `
    mutation DeleteTimeSpan($id: ID!) {
  deleteTimeSpan(id: $id)
}
    `;
export const UpdateTimeSpanDocument = `
    mutation UpdateTimeSpan($id: ID!, $data: CreateUpdateTimeSpanInput!) {
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
    DeleteTimeSpan(
      variables: DeleteTimeSpanMutationVariables,
      options?: C,
    ): Promise<ExecutionResult<DeleteTimeSpanMutation, E>> {
      return requester<DeleteTimeSpanMutation, DeleteTimeSpanMutationVariables>(
        DeleteTimeSpanDocument,
        variables,
        options,
      ) as Promise<ExecutionResult<DeleteTimeSpanMutation, E>>;
    },
    UpdateTimeSpan(
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
