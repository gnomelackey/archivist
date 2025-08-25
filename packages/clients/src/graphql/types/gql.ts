/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  mutation CreateCampaign($name: String!, $description: String) {\n    createCampaign(name: $name, description: $description) {\n      id\n      name\n      description\n    }\n  }\n": typeof types.CreateCampaignDocument,
    "\n  mutation CreateFaction($campaign: ID!, $faction: FactionInput!) {\n    createFaction(campaign: $campaign, faction: $faction) {\n      id\n      name\n      race\n      color\n      description\n      coordinates {\n        id\n        x\n        y\n        width\n        height\n        location\n      }\n    }\n  }\n": typeof types.CreateFactionDocument,
    "\n  mutation CreateFactions($campaign: ID!, $factions: [FactionInput!]!) {\n    createFactions(campaign: $campaign, factions: $factions) {\n      id\n      name\n      race\n      color\n      description\n      coordinates {\n        id\n        x\n        y\n        width\n        height\n        location\n      }\n    }\n  }\n": typeof types.CreateFactionsDocument,
    "\n  mutation RemoveFaction($campaign: ID!, $faction: ID!) {\n    removeFaction(campaign: $campaign, faction: $faction)\n  }\n": typeof types.RemoveFactionDocument,
    "\n  mutation RemoveFactions($campaign: ID!, $factions: [ID!]!) {\n    removeFactions(campaign: $campaign, factions: $factions)\n  }\n": typeof types.RemoveFactionsDocument,
    "\n  mutation CreateSeed($type: String!, $value: String!) {\n    createSeed(type: $type, value: $value) {\n      id\n      type\n      value\n    }\n  }\n": typeof types.CreateSeedDocument,
    "\n  query GetCampaign($id: ID!) {\n    campaign(id: $id) {\n      id\n      name\n      description\n    }\n  }\n": typeof types.GetCampaignDocument,
    "\n  query GetCampaigns {\n    campaigns {\n      id\n      name\n      description\n    }\n  }\n": typeof types.GetCampaignsDocument,
    "\n  fragment CompleteCoordinatesFragment on Coordinates {\n    id\n    x\n    y\n    width\n    height\n  }\n": typeof types.CompleteCoordinatesFragmentFragmentDoc,
    "\n  fragment CompleteFactionFragment on Faction {\n    id\n    name\n    race\n    color\n    description\n  }\n": typeof types.CompleteFactionFragmentFragmentDoc,
    "\n  fragment CompleteSeedFragment on Seed {\n    id\n    value\n  }\n": typeof types.CompleteSeedFragmentFragmentDoc,
    "\n  query GetFaction($id: ID!) {\n    faction(id: $id) {\n      ...CompleteFactionFragment\n    }\n  }\n\n  \n": typeof types.GetFactionDocument,
    "\n  query GetFactionWithCoordinates($id: ID!, $location: String!) {\n    factionWithCoordinates(id: $id, location: $location) {\n      ...CompleteFactionFragment\n      coordinates {\n        ...CompleteCoordinatesFragment\n      }\n      resources {\n        ...CompleteSeedFragment\n      }\n      goals {\n        ...CompleteSeedFragment\n      }\n    }\n  }\n\n  \n  \n  \n": typeof types.GetFactionWithCoordinatesDocument,
    "\n  query GetFactions($campaign: ID!) {\n    factions(campaign: $campaign) {\n      ...CompleteFactionFragment\n    }\n  }\n\n  \n": typeof types.GetFactionsDocument,
    "\n  query GetFactionsWithCoordinates($campaign: ID!, $location: String!) {\n    factionsWithCoordinates(campaign: $campaign, location: $location) {\n      ...CompleteFactionFragment\n      coordinates {\n        ...CompleteCoordinatesFragment\n      }\n      resources {\n        ...CompleteSeedFragment\n      }\n      goals {\n        ...CompleteSeedFragment\n      }\n    }\n  }\n\n  \n  \n  \n": typeof types.GetFactionsWithCoordinatesDocument,
    "\n  query GetSeed($id: ID!) {\n    seed(id: $id) {\n      id\n      type\n      value\n    }\n  }\n": typeof types.GetSeedDocument,
    "\n  query GetSeeds {\n    seeds {\n      id\n      type\n      value\n    }\n  }\n": typeof types.GetSeedsDocument,
    "\n  query GetSeedsByType($type: String!) {\n    seedsByType(type: $type) {\n      id\n      type\n      value\n    }\n  }\n": typeof types.GetSeedsByTypeDocument,
};
const documents: Documents = {
    "\n  mutation CreateCampaign($name: String!, $description: String) {\n    createCampaign(name: $name, description: $description) {\n      id\n      name\n      description\n    }\n  }\n": types.CreateCampaignDocument,
    "\n  mutation CreateFaction($campaign: ID!, $faction: FactionInput!) {\n    createFaction(campaign: $campaign, faction: $faction) {\n      id\n      name\n      race\n      color\n      description\n      coordinates {\n        id\n        x\n        y\n        width\n        height\n        location\n      }\n    }\n  }\n": types.CreateFactionDocument,
    "\n  mutation CreateFactions($campaign: ID!, $factions: [FactionInput!]!) {\n    createFactions(campaign: $campaign, factions: $factions) {\n      id\n      name\n      race\n      color\n      description\n      coordinates {\n        id\n        x\n        y\n        width\n        height\n        location\n      }\n    }\n  }\n": types.CreateFactionsDocument,
    "\n  mutation RemoveFaction($campaign: ID!, $faction: ID!) {\n    removeFaction(campaign: $campaign, faction: $faction)\n  }\n": types.RemoveFactionDocument,
    "\n  mutation RemoveFactions($campaign: ID!, $factions: [ID!]!) {\n    removeFactions(campaign: $campaign, factions: $factions)\n  }\n": types.RemoveFactionsDocument,
    "\n  mutation CreateSeed($type: String!, $value: String!) {\n    createSeed(type: $type, value: $value) {\n      id\n      type\n      value\n    }\n  }\n": types.CreateSeedDocument,
    "\n  query GetCampaign($id: ID!) {\n    campaign(id: $id) {\n      id\n      name\n      description\n    }\n  }\n": types.GetCampaignDocument,
    "\n  query GetCampaigns {\n    campaigns {\n      id\n      name\n      description\n    }\n  }\n": types.GetCampaignsDocument,
    "\n  fragment CompleteCoordinatesFragment on Coordinates {\n    id\n    x\n    y\n    width\n    height\n  }\n": types.CompleteCoordinatesFragmentFragmentDoc,
    "\n  fragment CompleteFactionFragment on Faction {\n    id\n    name\n    race\n    color\n    description\n  }\n": types.CompleteFactionFragmentFragmentDoc,
    "\n  fragment CompleteSeedFragment on Seed {\n    id\n    value\n  }\n": types.CompleteSeedFragmentFragmentDoc,
    "\n  query GetFaction($id: ID!) {\n    faction(id: $id) {\n      ...CompleteFactionFragment\n    }\n  }\n\n  \n": types.GetFactionDocument,
    "\n  query GetFactionWithCoordinates($id: ID!, $location: String!) {\n    factionWithCoordinates(id: $id, location: $location) {\n      ...CompleteFactionFragment\n      coordinates {\n        ...CompleteCoordinatesFragment\n      }\n      resources {\n        ...CompleteSeedFragment\n      }\n      goals {\n        ...CompleteSeedFragment\n      }\n    }\n  }\n\n  \n  \n  \n": types.GetFactionWithCoordinatesDocument,
    "\n  query GetFactions($campaign: ID!) {\n    factions(campaign: $campaign) {\n      ...CompleteFactionFragment\n    }\n  }\n\n  \n": types.GetFactionsDocument,
    "\n  query GetFactionsWithCoordinates($campaign: ID!, $location: String!) {\n    factionsWithCoordinates(campaign: $campaign, location: $location) {\n      ...CompleteFactionFragment\n      coordinates {\n        ...CompleteCoordinatesFragment\n      }\n      resources {\n        ...CompleteSeedFragment\n      }\n      goals {\n        ...CompleteSeedFragment\n      }\n    }\n  }\n\n  \n  \n  \n": types.GetFactionsWithCoordinatesDocument,
    "\n  query GetSeed($id: ID!) {\n    seed(id: $id) {\n      id\n      type\n      value\n    }\n  }\n": types.GetSeedDocument,
    "\n  query GetSeeds {\n    seeds {\n      id\n      type\n      value\n    }\n  }\n": types.GetSeedsDocument,
    "\n  query GetSeedsByType($type: String!) {\n    seedsByType(type: $type) {\n      id\n      type\n      value\n    }\n  }\n": types.GetSeedsByTypeDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateCampaign($name: String!, $description: String) {\n    createCampaign(name: $name, description: $description) {\n      id\n      name\n      description\n    }\n  }\n"): (typeof documents)["\n  mutation CreateCampaign($name: String!, $description: String) {\n    createCampaign(name: $name, description: $description) {\n      id\n      name\n      description\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateFaction($campaign: ID!, $faction: FactionInput!) {\n    createFaction(campaign: $campaign, faction: $faction) {\n      id\n      name\n      race\n      color\n      description\n      coordinates {\n        id\n        x\n        y\n        width\n        height\n        location\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateFaction($campaign: ID!, $faction: FactionInput!) {\n    createFaction(campaign: $campaign, faction: $faction) {\n      id\n      name\n      race\n      color\n      description\n      coordinates {\n        id\n        x\n        y\n        width\n        height\n        location\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateFactions($campaign: ID!, $factions: [FactionInput!]!) {\n    createFactions(campaign: $campaign, factions: $factions) {\n      id\n      name\n      race\n      color\n      description\n      coordinates {\n        id\n        x\n        y\n        width\n        height\n        location\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateFactions($campaign: ID!, $factions: [FactionInput!]!) {\n    createFactions(campaign: $campaign, factions: $factions) {\n      id\n      name\n      race\n      color\n      description\n      coordinates {\n        id\n        x\n        y\n        width\n        height\n        location\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveFaction($campaign: ID!, $faction: ID!) {\n    removeFaction(campaign: $campaign, faction: $faction)\n  }\n"): (typeof documents)["\n  mutation RemoveFaction($campaign: ID!, $faction: ID!) {\n    removeFaction(campaign: $campaign, faction: $faction)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveFactions($campaign: ID!, $factions: [ID!]!) {\n    removeFactions(campaign: $campaign, factions: $factions)\n  }\n"): (typeof documents)["\n  mutation RemoveFactions($campaign: ID!, $factions: [ID!]!) {\n    removeFactions(campaign: $campaign, factions: $factions)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateSeed($type: String!, $value: String!) {\n    createSeed(type: $type, value: $value) {\n      id\n      type\n      value\n    }\n  }\n"): (typeof documents)["\n  mutation CreateSeed($type: String!, $value: String!) {\n    createSeed(type: $type, value: $value) {\n      id\n      type\n      value\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetCampaign($id: ID!) {\n    campaign(id: $id) {\n      id\n      name\n      description\n    }\n  }\n"): (typeof documents)["\n  query GetCampaign($id: ID!) {\n    campaign(id: $id) {\n      id\n      name\n      description\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetCampaigns {\n    campaigns {\n      id\n      name\n      description\n    }\n  }\n"): (typeof documents)["\n  query GetCampaigns {\n    campaigns {\n      id\n      name\n      description\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment CompleteCoordinatesFragment on Coordinates {\n    id\n    x\n    y\n    width\n    height\n  }\n"): (typeof documents)["\n  fragment CompleteCoordinatesFragment on Coordinates {\n    id\n    x\n    y\n    width\n    height\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment CompleteFactionFragment on Faction {\n    id\n    name\n    race\n    color\n    description\n  }\n"): (typeof documents)["\n  fragment CompleteFactionFragment on Faction {\n    id\n    name\n    race\n    color\n    description\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment CompleteSeedFragment on Seed {\n    id\n    value\n  }\n"): (typeof documents)["\n  fragment CompleteSeedFragment on Seed {\n    id\n    value\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetFaction($id: ID!) {\n    faction(id: $id) {\n      ...CompleteFactionFragment\n    }\n  }\n\n  \n"): (typeof documents)["\n  query GetFaction($id: ID!) {\n    faction(id: $id) {\n      ...CompleteFactionFragment\n    }\n  }\n\n  \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetFactionWithCoordinates($id: ID!, $location: String!) {\n    factionWithCoordinates(id: $id, location: $location) {\n      ...CompleteFactionFragment\n      coordinates {\n        ...CompleteCoordinatesFragment\n      }\n      resources {\n        ...CompleteSeedFragment\n      }\n      goals {\n        ...CompleteSeedFragment\n      }\n    }\n  }\n\n  \n  \n  \n"): (typeof documents)["\n  query GetFactionWithCoordinates($id: ID!, $location: String!) {\n    factionWithCoordinates(id: $id, location: $location) {\n      ...CompleteFactionFragment\n      coordinates {\n        ...CompleteCoordinatesFragment\n      }\n      resources {\n        ...CompleteSeedFragment\n      }\n      goals {\n        ...CompleteSeedFragment\n      }\n    }\n  }\n\n  \n  \n  \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetFactions($campaign: ID!) {\n    factions(campaign: $campaign) {\n      ...CompleteFactionFragment\n    }\n  }\n\n  \n"): (typeof documents)["\n  query GetFactions($campaign: ID!) {\n    factions(campaign: $campaign) {\n      ...CompleteFactionFragment\n    }\n  }\n\n  \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetFactionsWithCoordinates($campaign: ID!, $location: String!) {\n    factionsWithCoordinates(campaign: $campaign, location: $location) {\n      ...CompleteFactionFragment\n      coordinates {\n        ...CompleteCoordinatesFragment\n      }\n      resources {\n        ...CompleteSeedFragment\n      }\n      goals {\n        ...CompleteSeedFragment\n      }\n    }\n  }\n\n  \n  \n  \n"): (typeof documents)["\n  query GetFactionsWithCoordinates($campaign: ID!, $location: String!) {\n    factionsWithCoordinates(campaign: $campaign, location: $location) {\n      ...CompleteFactionFragment\n      coordinates {\n        ...CompleteCoordinatesFragment\n      }\n      resources {\n        ...CompleteSeedFragment\n      }\n      goals {\n        ...CompleteSeedFragment\n      }\n    }\n  }\n\n  \n  \n  \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetSeed($id: ID!) {\n    seed(id: $id) {\n      id\n      type\n      value\n    }\n  }\n"): (typeof documents)["\n  query GetSeed($id: ID!) {\n    seed(id: $id) {\n      id\n      type\n      value\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetSeeds {\n    seeds {\n      id\n      type\n      value\n    }\n  }\n"): (typeof documents)["\n  query GetSeeds {\n    seeds {\n      id\n      type\n      value\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetSeedsByType($type: String!) {\n    seedsByType(type: $type) {\n      id\n      type\n      value\n    }\n  }\n"): (typeof documents)["\n  query GetSeedsByType($type: String!) {\n    seedsByType(type: $type) {\n      id\n      type\n      value\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;