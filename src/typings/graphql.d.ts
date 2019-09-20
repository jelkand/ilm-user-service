import { GraphQLResolveInfo } from 'graphql';
import { IUserDbObject } from './src/db/models/';
export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

export type IAuthUser = {
  __typename?: 'AuthUser',
  jti?: Maybe<Scalars['ID']>,
  id?: Maybe<Scalars['ID']>,
  isAdmin?: Maybe<Scalars['Boolean']>,
  iat?: Maybe<Scalars['Int']>,
  exp?: Maybe<Scalars['Int']>,
};

export type IMutation = {
  __typename?: 'Mutation',
  register?: Maybe<IUser>,
  login?: Maybe<IUser>,
  logout?: Maybe<Scalars['Boolean']>,
};


export type IMutationRegisterArgs = {
  email: Scalars['String'],
  password: Scalars['String']
};


export type IMutationLoginArgs = {
  email: Scalars['String'],
  password: Scalars['String']
};


export type IMutationLogoutArgs = {
  token: Scalars['String']
};

export type IQuery = {
  __typename?: 'Query',
  user?: Maybe<IUser>,
  verifyToken?: Maybe<IAuthUser>,
};


export type IQueryUserArgs = {
  id: Scalars['ID']
};


export type IQueryVerifyTokenArgs = {
  token: Scalars['String']
};

export type IUser = {
  __typename?: 'User',
  id?: Maybe<Scalars['ID']>,
  email?: Maybe<Scalars['String']>,
  isAdmin?: Maybe<Scalars['Boolean']>,
  createdAt?: Maybe<Scalars['String']>,
  updatedAt?: Maybe<Scalars['String']>,
};
export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;


export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

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
) => Maybe<TTypes>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type IResolversTypes = ResolversObject<{
  Query: ResolverTypeWrapper<{}>,
  ID: ResolverTypeWrapper<Scalars['ID']>,
  User: ResolverTypeWrapper<IUserDbObject>,
  String: ResolverTypeWrapper<Scalars['String']>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  AuthUser: ResolverTypeWrapper<IAuthUser>,
  Int: ResolverTypeWrapper<Scalars['Int']>,
  Mutation: ResolverTypeWrapper<{}>,
}>;

/** Mapping between all available schema types and the resolvers parents */
export type IResolversParentTypes = ResolversObject<{
  Query: {},
  ID: Scalars['ID'],
  User: IUserDbObject,
  String: Scalars['String'],
  Boolean: Scalars['Boolean'],
  AuthUser: IAuthUser,
  Int: Scalars['Int'],
  Mutation: {},
}>;

export type IAuthUserResolvers<ContextType = any, ParentType extends IResolversParentTypes['AuthUser'] = IResolversParentTypes['AuthUser']> = ResolversObject<{
  jti?: Resolver<Maybe<IResolversTypes['ID']>, ParentType, ContextType>,
  id?: Resolver<Maybe<IResolversTypes['ID']>, ParentType, ContextType>,
  isAdmin?: Resolver<Maybe<IResolversTypes['Boolean']>, ParentType, ContextType>,
  iat?: Resolver<Maybe<IResolversTypes['Int']>, ParentType, ContextType>,
  exp?: Resolver<Maybe<IResolversTypes['Int']>, ParentType, ContextType>,
}>;

export type IMutationResolvers<ContextType = any, ParentType extends IResolversParentTypes['Mutation'] = IResolversParentTypes['Mutation']> = ResolversObject<{
  register?: Resolver<Maybe<IResolversTypes['User']>, ParentType, ContextType, RequireFields<IMutationRegisterArgs, 'email' | 'password'>>,
  login?: Resolver<Maybe<IResolversTypes['User']>, ParentType, ContextType, RequireFields<IMutationLoginArgs, 'email' | 'password'>>,
  logout?: Resolver<Maybe<IResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<IMutationLogoutArgs, 'token'>>,
}>;

export type IQueryResolvers<ContextType = any, ParentType extends IResolversParentTypes['Query'] = IResolversParentTypes['Query']> = ResolversObject<{
  user?: Resolver<Maybe<IResolversTypes['User']>, ParentType, ContextType, RequireFields<IQueryUserArgs, 'id'>>,
  verifyToken?: Resolver<Maybe<IResolversTypes['AuthUser']>, ParentType, ContextType, RequireFields<IQueryVerifyTokenArgs, 'token'>>,
}>;

export type IUserResolvers<ContextType = any, ParentType extends IResolversParentTypes['User'] = IResolversParentTypes['User']> = ResolversObject<{
  id?: Resolver<Maybe<IResolversTypes['ID']>, ParentType, ContextType>,
  email?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  isAdmin?: Resolver<Maybe<IResolversTypes['Boolean']>, ParentType, ContextType>,
  createdAt?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  updatedAt?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
}>;

export type IResolvers<ContextType = any> = ResolversObject<{
  AuthUser?: IAuthUserResolvers<ContextType>,
  Mutation?: IMutationResolvers<ContextType>,
  Query?: IQueryResolvers<ContextType>,
  User?: IUserResolvers<ContextType>,
}>;


