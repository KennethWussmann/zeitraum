/* eslint-disable */
import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { UserModel, TimeSpanModel, TagModel } from './modelTypes';
import { GraphQLContext } from './graphqlContext';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: Date;
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

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo,
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo,
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Boolean: ResolverTypeWrapper<any>;
  CreateUpdateTimeSpanInput: ResolverTypeWrapper<any>;
  DateTime: ResolverTypeWrapper<any>;
  ID: ResolverTypeWrapper<any>;
  Int: ResolverTypeWrapper<any>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<any>;
  Tag: ResolverTypeWrapper<TagModel>;
  TimeSpan: ResolverTypeWrapper<TimeSpanModel>;
  TimeSpanList: ResolverTypeWrapper<any>;
  TimeSpanSearch: ResolverTypeWrapper<any>;
  User: ResolverTypeWrapper<UserModel>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: any;
  CreateUpdateTimeSpanInput: any;
  DateTime: any;
  ID: any;
  Int: any;
  Mutation: {};
  Query: {};
  String: any;
  Tag: TagModel;
  TimeSpan: TimeSpanModel;
  TimeSpanList: any;
  TimeSpanSearch: any;
  User: UserModel;
}>;

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type MutationResolvers<
  ContextType = GraphQLContext,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation'],
> = ResolversObject<{
  createTimeSpan?: Resolver<
    ResolversTypes['TimeSpan'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateTimeSpanArgs, 'input'>
  >;
  deleteTimeSpan?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteTimeSpanArgs, 'id'>
  >;
  updateTimeSpan?: Resolver<
    ResolversTypes['TimeSpan'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateTimeSpanArgs, 'id' | 'input'>
  >;
}>;

export type QueryResolvers<
  ContextType = GraphQLContext,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query'],
> = ResolversObject<{
  me?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  timeSpans?: Resolver<ResolversTypes['TimeSpanList'], ParentType, ContextType, Partial<QueryTimeSpansArgs>>;
}>;

export type TagResolvers<
  ContextType = GraphQLContext,
  ParentType extends ResolversParentTypes['Tag'] = ResolversParentTypes['Tag'],
> = ResolversObject<{
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TimeSpanResolvers<
  ContextType = GraphQLContext,
  ParentType extends ResolversParentTypes['TimeSpan'] = ResolversParentTypes['TimeSpan'],
> = ResolversObject<{
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  end?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  note?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  start?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  tags?: Resolver<Array<ResolversTypes['Tag']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TimeSpanListResolvers<
  ContextType = GraphQLContext,
  ParentType extends ResolversParentTypes['TimeSpanList'] = ResolversParentTypes['TimeSpanList'],
> = ResolversObject<{
  items?: Resolver<Array<ResolversTypes['TimeSpan']>, ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserResolvers<
  ContextType = GraphQLContext,
  ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User'],
> = ResolversObject<{
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = GraphQLContext> = ResolversObject<{
  DateTime?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Tag?: TagResolvers<ContextType>;
  TimeSpan?: TimeSpanResolvers<ContextType>;
  TimeSpanList?: TimeSpanListResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
}>;