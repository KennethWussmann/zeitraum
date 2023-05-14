/* eslint-disable */
import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { UserModel, TimeSpanModel, TagModel, PresetModel } from './modelTypes';
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

export type CreatePreset = {
  name: Scalars['String'];
  note?: InputMaybe<Scalars['String']>;
  tags: Array<Scalars['String']>;
};

export type CreateTimeSpan = {
  end?: InputMaybe<Scalars['DateTime']>;
  note?: InputMaybe<Scalars['String']>;
  start: Scalars['DateTime'];
  tags: Array<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /**
   * Close a time span that does not have an end time yet.
   * When invoked without id it will close the time span that is running longest.
   * Optionally you can provide an end time to close the time span at a specific time.
   */
  closeTimeSpan: TimeSpan;
  createPreset: Preset;
  createTimeSpan: TimeSpan;
  deletePreset: Scalars['Boolean'];
  deleteTimeSpan: Scalars['Boolean'];
  updatePreset: Preset;
  updatePresetSorting: Array<Preset>;
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
  me: User;
  preset: Preset;
  presets: PresetList;
  tags: TagList;
  timeSpan: TimeSpan;
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

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  updatedAt: Scalars['DateTime'];
  username: Scalars['String'];
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
  CreatePreset: ResolverTypeWrapper<any>;
  CreateTimeSpan: ResolverTypeWrapper<any>;
  DateTime: ResolverTypeWrapper<any>;
  ID: ResolverTypeWrapper<any>;
  Int: ResolverTypeWrapper<any>;
  Mutation: ResolverTypeWrapper<{}>;
  Preset: ResolverTypeWrapper<PresetModel>;
  PresetList: ResolverTypeWrapper<any>;
  PresetSearch: ResolverTypeWrapper<any>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<any>;
  Tag: ResolverTypeWrapper<TagModel>;
  TagList: ResolverTypeWrapper<any>;
  TagSearch: ResolverTypeWrapper<any>;
  TimeSpan: ResolverTypeWrapper<TimeSpanModel>;
  TimeSpanList: ResolverTypeWrapper<any>;
  TimeSpanSearch: ResolverTypeWrapper<any>;
  UpdatePreset: ResolverTypeWrapper<any>;
  UpdatePresetSorting: ResolverTypeWrapper<any>;
  UpdateTimeSpan: ResolverTypeWrapper<any>;
  User: ResolverTypeWrapper<UserModel>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: any;
  CreatePreset: any;
  CreateTimeSpan: any;
  DateTime: any;
  ID: any;
  Int: any;
  Mutation: {};
  Preset: PresetModel;
  PresetList: any;
  PresetSearch: any;
  Query: {};
  String: any;
  Tag: TagModel;
  TagList: any;
  TagSearch: any;
  TimeSpan: TimeSpanModel;
  TimeSpanList: any;
  TimeSpanSearch: any;
  UpdatePreset: any;
  UpdatePresetSorting: any;
  UpdateTimeSpan: any;
  User: UserModel;
}>;

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type MutationResolvers<
  ContextType = GraphQLContext,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation'],
> = ResolversObject<{
  closeTimeSpan?: Resolver<ResolversTypes['TimeSpan'], ParentType, ContextType, Partial<MutationCloseTimeSpanArgs>>;
  createPreset?: Resolver<
    ResolversTypes['Preset'],
    ParentType,
    ContextType,
    RequireFields<MutationCreatePresetArgs, 'input'>
  >;
  createTimeSpan?: Resolver<
    ResolversTypes['TimeSpan'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateTimeSpanArgs, 'input'>
  >;
  deletePreset?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<MutationDeletePresetArgs, 'id'>
  >;
  deleteTimeSpan?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteTimeSpanArgs, 'id'>
  >;
  updatePreset?: Resolver<
    ResolversTypes['Preset'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdatePresetArgs, 'id' | 'input'>
  >;
  updatePresetSorting?: Resolver<
    Array<ResolversTypes['Preset']>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdatePresetSortingArgs, 'input'>
  >;
  updateTimeSpan?: Resolver<
    ResolversTypes['TimeSpan'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateTimeSpanArgs, 'id' | 'input'>
  >;
}>;

export type PresetResolvers<
  ContextType = GraphQLContext,
  ParentType extends ResolversParentTypes['Preset'] = ResolversParentTypes['Preset'],
> = ResolversObject<{
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  note?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sortIndex?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  tags?: Resolver<Array<ResolversTypes['Tag']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PresetListResolvers<
  ContextType = GraphQLContext,
  ParentType extends ResolversParentTypes['PresetList'] = ResolversParentTypes['PresetList'],
> = ResolversObject<{
  items?: Resolver<Array<ResolversTypes['Preset']>, ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<
  ContextType = GraphQLContext,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query'],
> = ResolversObject<{
  me?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  preset?: Resolver<ResolversTypes['Preset'], ParentType, ContextType, RequireFields<QueryPresetArgs, 'id'>>;
  presets?: Resolver<ResolversTypes['PresetList'], ParentType, ContextType, Partial<QueryPresetsArgs>>;
  tags?: Resolver<ResolversTypes['TagList'], ParentType, ContextType, Partial<QueryTagsArgs>>;
  timeSpan?: Resolver<ResolversTypes['TimeSpan'], ParentType, ContextType, RequireFields<QueryTimeSpanArgs, 'id'>>;
  timeSpans?: Resolver<ResolversTypes['TimeSpanList'], ParentType, ContextType, Partial<QueryTimeSpansArgs>>;
  version?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
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

export type TagListResolvers<
  ContextType = GraphQLContext,
  ParentType extends ResolversParentTypes['TagList'] = ResolversParentTypes['TagList'],
> = ResolversObject<{
  items?: Resolver<Array<ResolversTypes['Tag']>, ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
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
  running?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
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
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = GraphQLContext> = ResolversObject<{
  DateTime?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Preset?: PresetResolvers<ContextType>;
  PresetList?: PresetListResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Tag?: TagResolvers<ContextType>;
  TagList?: TagListResolvers<ContextType>;
  TimeSpan?: TimeSpanResolvers<ContextType>;
  TimeSpanList?: TimeSpanListResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
}>;
