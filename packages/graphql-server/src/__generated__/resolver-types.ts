import type * as Types from './schema-types';
import type { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import type { Campaign, Coordinates, Faction, Seed, User } from '@repo/db';
import type { ArchivistGraphQLContext } from '../context';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };


export type ResolverTypeWrapper<T> = Promise<T> | T | import('@repo/db').PrismaPromise<T>;


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
) => Types.Maybe<TTypes> | Promise<Types.Maybe<TTypes>>;

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
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Types.Scalars['Boolean']['output']>;
  Campaign: ResolverTypeWrapper<Campaign>;
  Coordinates: ResolverTypeWrapper<Coordinates>;
  CoordinatesInput: Types.CoordinatesInput;
  DateTime: ResolverTypeWrapper<Types.Scalars['DateTime']['output']>;
  Faction: ResolverTypeWrapper<Faction>;
  FactionInput: Types.FactionInput;
  Float: ResolverTypeWrapper<Types.Scalars['Float']['output']>;
  ID: ResolverTypeWrapper<Types.Scalars['ID']['output']>;
  JSONObject: ResolverTypeWrapper<Types.Scalars['JSONObject']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  Seed: ResolverTypeWrapper<Seed>;
  SeedType: ResolverTypeWrapper<Omit<Types.SeedType, 'seeds'> & { seeds: Array<ResolversTypes['Seed']> }>;
  String: ResolverTypeWrapper<Types.Scalars['String']['output']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Types.Scalars['Boolean']['output'];
  Campaign: Campaign;
  Coordinates: Coordinates;
  CoordinatesInput: Types.CoordinatesInput;
  DateTime: Types.Scalars['DateTime']['output'];
  Faction: Faction;
  FactionInput: Types.FactionInput;
  Float: Types.Scalars['Float']['output'];
  ID: Types.Scalars['ID']['output'];
  JSONObject: Types.Scalars['JSONObject']['output'];
  Mutation: {};
  Query: {};
  Seed: Seed;
  SeedType: Omit<Types.SeedType, 'seeds'> & { seeds: Array<ResolversParentTypes['Seed']> };
  String: Types.Scalars['String']['output'];
};

export type CampaignResolvers<ContextType = ArchivistGraphQLContext, ParentType extends ResolversParentTypes['Campaign'] = ResolversParentTypes['Campaign']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  description?: Resolver<Types.Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CoordinatesResolvers<ContextType = ArchivistGraphQLContext, ParentType extends ResolversParentTypes['Coordinates'] = ResolversParentTypes['Coordinates']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  faction?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  height?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  location?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  width?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  x?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  y?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type FactionResolvers<ContextType = ArchivistGraphQLContext, ParentType extends ResolversParentTypes['Faction'] = ResolversParentTypes['Faction']> = {
  campaign?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  color?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  coordinates?: Resolver<Types.Maybe<Array<Types.Maybe<ResolversTypes['Coordinates']>>>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  description?: Resolver<Types.Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  race?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface JsonObjectScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSONObject'], any> {
  name: 'JSONObject';
}

export type MutationResolvers<ContextType = ArchivistGraphQLContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  _empty?: Resolver<Types.Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createCampaign?: Resolver<ResolversTypes['Campaign'], ParentType, ContextType, RequireFields<Types.MutationCreateCampaignArgs, 'name'>>;
  createFaction?: Resolver<ResolversTypes['Faction'], ParentType, ContextType, RequireFields<Types.MutationCreateFactionArgs, 'campaign' | 'faction'>>;
  createFactions?: Resolver<Array<ResolversTypes['Faction']>, ParentType, ContextType, RequireFields<Types.MutationCreateFactionsArgs, 'campaign' | 'factions'>>;
  createSeed?: Resolver<ResolversTypes['Seed'], ParentType, ContextType, RequireFields<Types.MutationCreateSeedArgs, 'type' | 'value'>>;
  removeFaction?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<Types.MutationRemoveFactionArgs, 'campaign' | 'faction'>>;
  removeFactions?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType, RequireFields<Types.MutationRemoveFactionsArgs, 'campaign' | 'factions'>>;
};

export type QueryResolvers<ContextType = ArchivistGraphQLContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  _empty?: Resolver<Types.Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  campaign?: Resolver<Types.Maybe<ResolversTypes['Campaign']>, ParentType, ContextType, RequireFields<Types.QueryCampaignArgs, 'id'>>;
  campaigns?: Resolver<Array<ResolversTypes['Campaign']>, ParentType, ContextType>;
  faction?: Resolver<Types.Maybe<ResolversTypes['Faction']>, ParentType, ContextType, RequireFields<Types.QueryFactionArgs, 'id'>>;
  factionWithCoordinates?: Resolver<ResolversTypes['Faction'], ParentType, ContextType, RequireFields<Types.QueryFactionWithCoordinatesArgs, 'id' | 'location'>>;
  factions?: Resolver<Array<ResolversTypes['Faction']>, ParentType, ContextType, RequireFields<Types.QueryFactionsArgs, 'campaign'>>;
  factionsWithCoordinates?: Resolver<Array<ResolversTypes['Faction']>, ParentType, ContextType, RequireFields<Types.QueryFactionsWithCoordinatesArgs, 'campaign' | 'location'>>;
  seed?: Resolver<Types.Maybe<ResolversTypes['Seed']>, ParentType, ContextType, RequireFields<Types.QuerySeedArgs, 'id'>>;
  seeds?: Resolver<Array<ResolversTypes['Seed']>, ParentType, ContextType>;
  seedsByType?: Resolver<Array<ResolversTypes['Seed']>, ParentType, ContextType, RequireFields<Types.QuerySeedsByTypeArgs, 'type'>>;
  seedsByTypes?: Resolver<ResolversTypes['JSONObject'], ParentType, ContextType, RequireFields<Types.QuerySeedsByTypesArgs, 'types'>>;
};

export type SeedResolvers<ContextType = ArchivistGraphQLContext, ParentType extends ResolversParentTypes['Seed'] = ResolversParentTypes['Seed']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SeedTypeResolvers<ContextType = ArchivistGraphQLContext, ParentType extends ResolversParentTypes['SeedType'] = ResolversParentTypes['SeedType']> = {
  seeds?: Resolver<Array<ResolversTypes['Seed']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = ArchivistGraphQLContext> = {
  Campaign?: CampaignResolvers<ContextType>;
  Coordinates?: CoordinatesResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  Faction?: FactionResolvers<ContextType>;
  JSONObject?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Seed?: SeedResolvers<ContextType>;
  SeedType?: SeedTypeResolvers<ContextType>;
};

