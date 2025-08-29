/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
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

export type FactionUpdateInput = {
  color: Scalars['String']['input'];
  coordinates?: InputMaybe<CoordinatesInput>;
  description?: InputMaybe<Scalars['String']['input']>;
  descriptors?: InputMaybe<Array<Scalars['String']['input']>>;
  id: Scalars['ID']['input'];
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
  updateFaction: Faction;
  updateFactions: Array<Faction>;
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


export type MutationUpdateFactionArgs = {
  campaign: Scalars['ID']['input'];
  data: FactionInput;
  faction: Scalars['ID']['input'];
};


export type MutationUpdateFactionsArgs = {
  campaign: Scalars['ID']['input'];
  data: Array<FactionUpdateInput>;
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

export type CreateCampaignMutationVariables = Exact<{
  name: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
}>;


export type CreateCampaignMutation = { __typename?: 'Mutation', createCampaign: { __typename?: 'Campaign', id: string, name: string, description?: string | null } };

export type CreateFactionMutationVariables = Exact<{
  campaign: Scalars['ID']['input'];
  faction: FactionInput;
}>;


export type CreateFactionMutation = { __typename?: 'Mutation', createFaction: { __typename?: 'Faction', id: string, name: string, race: string, color: string, description?: string | null, coordinates?: Array<{ __typename?: 'Coordinates', id: string, x: number, y: number, width: number, height: number, location: string } | null> | null } };

export type CreateFactionsMutationVariables = Exact<{
  campaign: Scalars['ID']['input'];
  factions: Array<FactionInput> | FactionInput;
}>;


export type CreateFactionsMutation = { __typename?: 'Mutation', createFactions: Array<{ __typename?: 'Faction', id: string, name: string, race: string, color: string, description?: string | null, coordinates?: Array<{ __typename?: 'Coordinates', id: string, x: number, y: number, width: number, height: number, location: string } | null> | null }> };

export type RemoveFactionMutationVariables = Exact<{
  campaign: Scalars['ID']['input'];
  faction: Scalars['ID']['input'];
}>;


export type RemoveFactionMutation = { __typename?: 'Mutation', removeFaction: string };

export type RemoveFactionsMutationVariables = Exact<{
  campaign: Scalars['ID']['input'];
  factions: Array<Scalars['ID']['input']> | Scalars['ID']['input'];
}>;


export type RemoveFactionsMutation = { __typename?: 'Mutation', removeFactions: Array<string> };

export type UpdateFactionMutationVariables = Exact<{
  campaign: Scalars['ID']['input'];
  faction: Scalars['ID']['input'];
  data: FactionInput;
}>;


export type UpdateFactionMutation = { __typename?: 'Mutation', updateFaction: { __typename?: 'Faction', id: string, name: string, race: string, color: string, description?: string | null, coordinates?: Array<{ __typename?: 'Coordinates', id: string, x: number, y: number, width: number, height: number, location: string } | null> | null } };

export type UpdateFactionsMutationVariables = Exact<{
  campaign: Scalars['ID']['input'];
  data: Array<FactionUpdateInput> | FactionUpdateInput;
}>;


export type UpdateFactionsMutation = { __typename?: 'Mutation', updateFactions: Array<{ __typename?: 'Faction', id: string, name: string, race: string, color: string, description?: string | null, coordinates?: Array<{ __typename?: 'Coordinates', id: string, x: number, y: number, width: number, height: number, location: string } | null> | null }> };

export type CreateSeedMutationVariables = Exact<{
  type: Scalars['String']['input'];
  value: Scalars['String']['input'];
}>;


export type CreateSeedMutation = { __typename?: 'Mutation', createSeed: { __typename?: 'Seed', id: string, type: string, value: string } };

export type GetCampaignQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetCampaignQuery = { __typename?: 'Query', campaign?: { __typename?: 'Campaign', id: string, name: string, description?: string | null } | null };

export type GetCampaignsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCampaignsQuery = { __typename?: 'Query', campaigns: Array<{ __typename?: 'Campaign', id: string, name: string, description?: string | null }> };

export type FactionAllianceFragmentFragment = { __typename?: 'FactionAlliance', id: string, reason?: string | null, seed: string, partyA: string, partyB: string };

export type FactionConflictFragmentFragment = { __typename?: 'FactionConflict', id: string, reason?: string | null, seed: string, aggressor: string, defender: string };

export type FactionCoordinatesFragmentFragment = { __typename?: 'Coordinates', id: string, x: number, y: number, width: number, height: number };

export type FactionBaseFragmentFragment = { __typename?: 'Faction', id: string, name: string, race: string, color: string, description?: string | null };

export type FactionRelationsFragmentFragment = { __typename?: 'Faction', id: string, name: string, race: string, color: string, description?: string | null, coordinates?: Array<{ __typename?: 'Coordinates', id: string, x: number, y: number, width: number, height: number } | null> | null, resources?: Array<{ __typename?: 'Seed', id: string, value: string } | null> | null, goals?: Array<{ __typename?: 'Seed', id: string, value: string } | null> | null, conflicts?: Array<{ __typename?: 'FactionConflict', id: string, reason?: string | null, seed: string, aggressor: string, defender: string } | null> | null, alliances?: Array<{ __typename?: 'FactionAlliance', id: string, reason?: string | null, seed: string, partyA: string, partyB: string } | null> | null };

export type FactionSeedFragmentFragment = { __typename?: 'Seed', id: string, value: string };

export type GetFactionQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetFactionQuery = { __typename?: 'Query', faction?: { __typename?: 'Faction', id: string, name: string, race: string, color: string, description?: string | null } | null };

export type GetFactionsQueryVariables = Exact<{
  campaign: Scalars['ID']['input'];
}>;


export type GetFactionsQuery = { __typename?: 'Query', factions: Array<{ __typename?: 'Faction', id: string, name: string, race: string, color: string, description?: string | null }> };

export type GetFactionsWithCoordinatesQueryVariables = Exact<{
  campaign: Scalars['ID']['input'];
}>;


export type GetFactionsWithCoordinatesQuery = { __typename?: 'Query', factionsWithCoordinates: Array<{ __typename?: 'Faction', id: string, name: string, race: string, color: string, description?: string | null, coordinates?: Array<{ __typename?: 'Coordinates', id: string, x: number, y: number, width: number, height: number } | null> | null, resources?: Array<{ __typename?: 'Seed', id: string, value: string } | null> | null, goals?: Array<{ __typename?: 'Seed', id: string, value: string } | null> | null, conflicts?: Array<{ __typename?: 'FactionConflict', id: string, reason?: string | null, seed: string, aggressor: string, defender: string } | null> | null, alliances?: Array<{ __typename?: 'FactionAlliance', id: string, reason?: string | null, seed: string, partyA: string, partyB: string } | null> | null }> };

export type GetSeedQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetSeedQuery = { __typename?: 'Query', seed?: { __typename?: 'Seed', id: string, type: string, value: string } | null };

export type GetSeedsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSeedsQuery = { __typename?: 'Query', seeds: Array<{ __typename?: 'Seed', id: string, type: string, value: string }> };

export type GetSeedsByTypeQueryVariables = Exact<{
  type: Scalars['String']['input'];
}>;


export type GetSeedsByTypeQuery = { __typename?: 'Query', seedsByType: Array<{ __typename?: 'Seed', id: string, type: string, value: string }> };

export const FactionBaseFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FactionBaseFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Faction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"race"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]} as unknown as DocumentNode<FactionBaseFragmentFragment, unknown>;
export const FactionCoordinatesFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FactionCoordinatesFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Coordinates"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"x"}},{"kind":"Field","name":{"kind":"Name","value":"y"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}}]}}]} as unknown as DocumentNode<FactionCoordinatesFragmentFragment, unknown>;
export const FactionSeedFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FactionSeedFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Seed"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]} as unknown as DocumentNode<FactionSeedFragmentFragment, unknown>;
export const FactionConflictFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FactionConflictFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FactionConflict"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"reason"}},{"kind":"Field","name":{"kind":"Name","value":"seed"}},{"kind":"Field","name":{"kind":"Name","value":"aggressor"}},{"kind":"Field","name":{"kind":"Name","value":"defender"}}]}}]} as unknown as DocumentNode<FactionConflictFragmentFragment, unknown>;
export const FactionAllianceFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FactionAllianceFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FactionAlliance"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"reason"}},{"kind":"Field","name":{"kind":"Name","value":"seed"}},{"kind":"Field","name":{"kind":"Name","value":"partyA"}},{"kind":"Field","name":{"kind":"Name","value":"partyB"}}]}}]} as unknown as DocumentNode<FactionAllianceFragmentFragment, unknown>;
export const FactionRelationsFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FactionRelationsFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Faction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FactionBaseFragment"}},{"kind":"Field","name":{"kind":"Name","value":"coordinates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FactionCoordinatesFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"resources"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FactionSeedFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"goals"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FactionSeedFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"conflicts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FactionConflictFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"alliances"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FactionAllianceFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FactionBaseFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Faction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"race"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FactionCoordinatesFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Coordinates"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"x"}},{"kind":"Field","name":{"kind":"Name","value":"y"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FactionSeedFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Seed"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FactionConflictFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FactionConflict"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"reason"}},{"kind":"Field","name":{"kind":"Name","value":"seed"}},{"kind":"Field","name":{"kind":"Name","value":"aggressor"}},{"kind":"Field","name":{"kind":"Name","value":"defender"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FactionAllianceFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FactionAlliance"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"reason"}},{"kind":"Field","name":{"kind":"Name","value":"seed"}},{"kind":"Field","name":{"kind":"Name","value":"partyA"}},{"kind":"Field","name":{"kind":"Name","value":"partyB"}}]}}]} as unknown as DocumentNode<FactionRelationsFragmentFragment, unknown>;
export const CreateCampaignDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateCampaign"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createCampaign"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<CreateCampaignMutation, CreateCampaignMutationVariables>;
export const CreateFactionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateFaction"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"campaign"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"faction"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FactionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createFaction"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"campaign"},"value":{"kind":"Variable","name":{"kind":"Name","value":"campaign"}}},{"kind":"Argument","name":{"kind":"Name","value":"faction"},"value":{"kind":"Variable","name":{"kind":"Name","value":"faction"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"race"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"coordinates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"x"}},{"kind":"Field","name":{"kind":"Name","value":"y"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"location"}}]}}]}}]}}]} as unknown as DocumentNode<CreateFactionMutation, CreateFactionMutationVariables>;
export const CreateFactionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateFactions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"campaign"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"factions"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FactionInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createFactions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"campaign"},"value":{"kind":"Variable","name":{"kind":"Name","value":"campaign"}}},{"kind":"Argument","name":{"kind":"Name","value":"factions"},"value":{"kind":"Variable","name":{"kind":"Name","value":"factions"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"race"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"coordinates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"x"}},{"kind":"Field","name":{"kind":"Name","value":"y"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"location"}}]}}]}}]}}]} as unknown as DocumentNode<CreateFactionsMutation, CreateFactionsMutationVariables>;
export const RemoveFactionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveFaction"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"campaign"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"faction"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeFaction"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"campaign"},"value":{"kind":"Variable","name":{"kind":"Name","value":"campaign"}}},{"kind":"Argument","name":{"kind":"Name","value":"faction"},"value":{"kind":"Variable","name":{"kind":"Name","value":"faction"}}}]}]}}]} as unknown as DocumentNode<RemoveFactionMutation, RemoveFactionMutationVariables>;
export const RemoveFactionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveFactions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"campaign"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"factions"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeFactions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"campaign"},"value":{"kind":"Variable","name":{"kind":"Name","value":"campaign"}}},{"kind":"Argument","name":{"kind":"Name","value":"factions"},"value":{"kind":"Variable","name":{"kind":"Name","value":"factions"}}}]}]}}]} as unknown as DocumentNode<RemoveFactionsMutation, RemoveFactionsMutationVariables>;
export const UpdateFactionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateFaction"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"campaign"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"faction"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FactionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateFaction"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"campaign"},"value":{"kind":"Variable","name":{"kind":"Name","value":"campaign"}}},{"kind":"Argument","name":{"kind":"Name","value":"faction"},"value":{"kind":"Variable","name":{"kind":"Name","value":"faction"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"race"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"coordinates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"x"}},{"kind":"Field","name":{"kind":"Name","value":"y"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"location"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateFactionMutation, UpdateFactionMutationVariables>;
export const UpdateFactionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateFactions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"campaign"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FactionUpdateInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateFactions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"campaign"},"value":{"kind":"Variable","name":{"kind":"Name","value":"campaign"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"race"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"coordinates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"x"}},{"kind":"Field","name":{"kind":"Name","value":"y"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"location"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateFactionsMutation, UpdateFactionsMutationVariables>;
export const CreateSeedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateSeed"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"type"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"value"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createSeed"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"type"}}},{"kind":"Argument","name":{"kind":"Name","value":"value"},"value":{"kind":"Variable","name":{"kind":"Name","value":"value"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]} as unknown as DocumentNode<CreateSeedMutation, CreateSeedMutationVariables>;
export const GetCampaignDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCampaign"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"campaign"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<GetCampaignQuery, GetCampaignQueryVariables>;
export const GetCampaignsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCampaigns"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"campaigns"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<GetCampaignsQuery, GetCampaignsQueryVariables>;
export const GetFactionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFaction"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"faction"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FactionBaseFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FactionBaseFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Faction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"race"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]} as unknown as DocumentNode<GetFactionQuery, GetFactionQueryVariables>;
export const GetFactionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFactions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"campaign"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"factions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"campaign"},"value":{"kind":"Variable","name":{"kind":"Name","value":"campaign"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FactionBaseFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FactionBaseFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Faction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"race"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]} as unknown as DocumentNode<GetFactionsQuery, GetFactionsQueryVariables>;
export const GetFactionsWithCoordinatesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFactionsWithCoordinates"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"campaign"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"factionsWithCoordinates"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"campaign"},"value":{"kind":"Variable","name":{"kind":"Name","value":"campaign"}}},{"kind":"Argument","name":{"kind":"Name","value":"location"},"value":{"kind":"StringValue","value":"faction-board","block":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FactionRelationsFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FactionBaseFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Faction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"race"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FactionCoordinatesFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Coordinates"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"x"}},{"kind":"Field","name":{"kind":"Name","value":"y"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FactionSeedFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Seed"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FactionConflictFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FactionConflict"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"reason"}},{"kind":"Field","name":{"kind":"Name","value":"seed"}},{"kind":"Field","name":{"kind":"Name","value":"aggressor"}},{"kind":"Field","name":{"kind":"Name","value":"defender"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FactionAllianceFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FactionAlliance"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"reason"}},{"kind":"Field","name":{"kind":"Name","value":"seed"}},{"kind":"Field","name":{"kind":"Name","value":"partyA"}},{"kind":"Field","name":{"kind":"Name","value":"partyB"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FactionRelationsFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Faction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FactionBaseFragment"}},{"kind":"Field","name":{"kind":"Name","value":"coordinates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FactionCoordinatesFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"resources"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FactionSeedFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"goals"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FactionSeedFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"conflicts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FactionConflictFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"alliances"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FactionAllianceFragment"}}]}}]}}]} as unknown as DocumentNode<GetFactionsWithCoordinatesQuery, GetFactionsWithCoordinatesQueryVariables>;
export const GetSeedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSeed"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"seed"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]} as unknown as DocumentNode<GetSeedQuery, GetSeedQueryVariables>;
export const GetSeedsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSeeds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"seeds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]} as unknown as DocumentNode<GetSeedsQuery, GetSeedsQueryVariables>;
export const GetSeedsByTypeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSeedsByType"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"type"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"seedsByType"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"type"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]} as unknown as DocumentNode<GetSeedsByTypeQuery, GetSeedsByTypeQueryVariables>;