export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  JSONObject: { input: any; output: any; }
};

export type Campaign = {
  __typename?: 'Campaign';
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user: Scalars['String']['output'];
};

export type Coordinates = {
  __typename?: 'Coordinates';
  createdAt: Scalars['DateTime']['output'];
  faction: Scalars['String']['output'];
  height: Scalars['Float']['output'];
  id: Scalars['String']['output'];
  location: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  width: Scalars['Float']['output'];
  x: Scalars['Float']['output'];
  y: Scalars['Float']['output'];
};

export type CoordinatesInput = {
  height: Scalars['Float']['input'];
  location: Scalars['String']['input'];
  width: Scalars['Float']['input'];
  x: Scalars['Float']['input'];
  y: Scalars['Float']['input'];
};

export type Faction = {
  __typename?: 'Faction';
  alliances?: Maybe<Array<Maybe<FactionAlliance>>>;
  campaign: Scalars['String']['output'];
  color: Scalars['String']['output'];
  conflicts?: Maybe<Array<Maybe<FactionConflict>>>;
  coordinates?: Maybe<Array<Maybe<Coordinates>>>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  goals?: Maybe<Array<Maybe<Seed>>>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  race: Scalars['String']['output'];
  resources?: Maybe<Array<Maybe<Seed>>>;
  updatedAt: Scalars['DateTime']['output'];
};

export type FactionAlliance = {
  __typename?: 'FactionAlliance';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  partyA: Scalars['String']['output'];
  partyB: Scalars['String']['output'];
  reason?: Maybe<Scalars['String']['output']>;
  seed: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type FactionConflict = {
  __typename?: 'FactionConflict';
  aggressor: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  defender: Scalars['String']['output'];
  id: Scalars['String']['output'];
  reason?: Maybe<Scalars['String']['output']>;
  seed: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type FactionInput = {
  color: Scalars['String']['input'];
  coordinates?: InputMaybe<CoordinatesInput>;
  description?: InputMaybe<Scalars['String']['input']>;
  descriptors?: InputMaybe<Array<Scalars['String']['input']>>;
  name: Scalars['String']['input'];
  race: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  _empty?: Maybe<Scalars['String']['output']>;
  createCampaign: Campaign;
  createFaction: Faction;
  createFactions: Array<Faction>;
  createSeed: Seed;
  removeFaction: Scalars['String']['output'];
  removeFactions: Array<Scalars['String']['output']>;
};


export type MutationCreateCampaignArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};


export type MutationCreateFactionArgs = {
  campaign: Scalars['ID']['input'];
  faction: FactionInput;
};


export type MutationCreateFactionsArgs = {
  campaign: Scalars['ID']['input'];
  factions: Array<FactionInput>;
};


export type MutationCreateSeedArgs = {
  type: Scalars['String']['input'];
  value: Scalars['String']['input'];
};


export type MutationRemoveFactionArgs = {
  campaign: Scalars['ID']['input'];
  faction: Scalars['ID']['input'];
};


export type MutationRemoveFactionsArgs = {
  campaign: Scalars['ID']['input'];
  factions: Array<Scalars['ID']['input']>;
};

export type Query = {
  __typename?: 'Query';
  _empty?: Maybe<Scalars['String']['output']>;
  campaign?: Maybe<Campaign>;
  campaigns: Array<Campaign>;
  faction?: Maybe<Faction>;
  factionWithCoordinates: Faction;
  factions: Array<Faction>;
  factionsWithCoordinates: Array<Faction>;
  seed?: Maybe<Seed>;
  seeds: Array<Seed>;
  seedsByType: Array<Seed>;
  seedsByTypes: Scalars['JSONObject']['output'];
};


export type QueryCampaignArgs = {
  id: Scalars['ID']['input'];
};


export type QueryFactionArgs = {
  id: Scalars['ID']['input'];
};


export type QueryFactionWithCoordinatesArgs = {
  id: Scalars['ID']['input'];
  location: Scalars['String']['input'];
};


export type QueryFactionsArgs = {
  campaign: Scalars['ID']['input'];
};


export type QueryFactionsWithCoordinatesArgs = {
  campaign: Scalars['ID']['input'];
  location: Scalars['String']['input'];
};


export type QuerySeedArgs = {
  id: Scalars['ID']['input'];
};


export type QuerySeedsByTypeArgs = {
  type: Scalars['String']['input'];
};


export type QuerySeedsByTypesArgs = {
  types: Array<Scalars['String']['input']>;
};

export type Seed = {
  __typename?: 'Seed';
  createdAt: Scalars['DateTime']['output'];
  factionAlliances?: Maybe<Array<Maybe<FactionAlliance>>>;
  factionConflicts?: Maybe<Array<Maybe<FactionConflict>>>;
  id: Scalars['String']['output'];
  type: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type SeedType = {
  __typename?: 'SeedType';
  seeds: Array<Seed>;
  type: Scalars['String']['output'];
};
