import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { Context } from 'graphql/context';
export type Maybe<T> = T | undefined;
export type InputMaybe<T> = T | undefined;
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
  DateTime: any;
};

export type Announcement = {
  __typename?: 'Announcement';
  body: Scalars['String'];
  createdAt: Scalars['DateTime'];
  fellowship?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  title: Scalars['String'];
};

export type AnnouncementsQueryInput = {
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<AnnouncementsQueryWhereInput>;
};

export type AnnouncementsQueryResult = {
  __typename?: 'AnnouncementsQueryResult';
  data: Array<Announcement>;
  total: Scalars['Int'];
};

export type AnnouncementsQueryWhereInput = {
  body?: InputMaybe<StringWhereInput>;
  fellowship?: InputMaybe<StringWhereInput>;
  title?: InputMaybe<StringWhereInput>;
};

export type Project = {
  __typename?: 'Project';
  description: Scalars['String'];
  iconUrl: Scalars['String'];
  id: Scalars['Int'];
  name: Scalars['String'];
  users: Array<User>;
};

export type Query = {
  __typename?: 'Query';
  announcements?: Maybe<AnnouncementsQueryResult>;
  ping?: Maybe<Scalars['String']>;
  project?: Maybe<Project>;
  user?: Maybe<User>;
  users: UsersQueryResult;
};


export type QueryAnnouncementsArgs = {
  input?: InputMaybe<AnnouncementsQueryInput>;
};


export type QueryProjectArgs = {
  id: Scalars['Int'];
};


export type QueryUserArgs = {
  id: Scalars['Int'];
};


export type QueryUsersArgs = {
  input?: InputMaybe<UsersQueryInput>;
};

export type StringWhereInput = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<StringWhereInput>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  avatarUrl: Scalars['String'];
  bio?: Maybe<Scalars['String']>;
  fellowship?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  name: Scalars['String'];
  projects: Array<Project>;
};

export type UsersQueryInput = {
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UsersQueryWhereInput>;
};

export type UsersQueryResult = {
  __typename?: 'UsersQueryResult';
  data: Array<User>;
  total: Scalars['Int'];
};

export type UsersQueryWhereInput = {
  bio?: InputMaybe<StringWhereInput>;
  fellowship?: InputMaybe<StringWhereInput>;
  name?: InputMaybe<StringWhereInput>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
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
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Announcement: ResolverTypeWrapper<Announcement>;
  AnnouncementsQueryInput: AnnouncementsQueryInput;
  AnnouncementsQueryResult: ResolverTypeWrapper<AnnouncementsQueryResult>;
  AnnouncementsQueryWhereInput: AnnouncementsQueryWhereInput;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Project: ResolverTypeWrapper<Project>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  StringWhereInput: StringWhereInput;
  User: ResolverTypeWrapper<User>;
  UsersQueryInput: UsersQueryInput;
  UsersQueryResult: ResolverTypeWrapper<UsersQueryResult>;
  UsersQueryWhereInput: UsersQueryWhereInput;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Announcement: Announcement;
  AnnouncementsQueryInput: AnnouncementsQueryInput;
  AnnouncementsQueryResult: AnnouncementsQueryResult;
  AnnouncementsQueryWhereInput: AnnouncementsQueryWhereInput;
  Boolean: Scalars['Boolean'];
  DateTime: Scalars['DateTime'];
  Int: Scalars['Int'];
  Project: Project;
  Query: {};
  String: Scalars['String'];
  StringWhereInput: StringWhereInput;
  User: User;
  UsersQueryInput: UsersQueryInput;
  UsersQueryResult: UsersQueryResult;
  UsersQueryWhereInput: UsersQueryWhereInput;
}>;

export type AnnouncementResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Announcement'] = ResolversParentTypes['Announcement']> = ResolversObject<{
  body?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  fellowship?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AnnouncementsQueryResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['AnnouncementsQueryResult'] = ResolversParentTypes['AnnouncementsQueryResult']> = ResolversObject<{
  data?: Resolver<Array<ResolversTypes['Announcement']>, ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type ProjectResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Project'] = ResolversParentTypes['Project']> = ResolversObject<{
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  iconUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  announcements?: Resolver<Maybe<ResolversTypes['AnnouncementsQueryResult']>, ParentType, ContextType, Partial<QueryAnnouncementsArgs>>;
  ping?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  project?: Resolver<Maybe<ResolversTypes['Project']>, ParentType, ContextType, RequireFields<QueryProjectArgs, 'id'>>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>;
  users?: Resolver<ResolversTypes['UsersQueryResult'], ParentType, ContextType, Partial<QueryUsersArgs>>;
}>;

export type UserResolvers<ContextType = Context, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  avatarUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  bio?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  fellowship?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  projects?: Resolver<Array<ResolversTypes['Project']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UsersQueryResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['UsersQueryResult'] = ResolversParentTypes['UsersQueryResult']> = ResolversObject<{
  data?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = Context> = ResolversObject<{
  Announcement?: AnnouncementResolvers<ContextType>;
  AnnouncementsQueryResult?: AnnouncementsQueryResultResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  Project?: ProjectResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UsersQueryResult?: UsersQueryResultResolvers<ContextType>;
}>;

