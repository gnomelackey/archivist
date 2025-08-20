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
    "\n  mutation CreateSeed($type: String!, $value: String!) {\n    createSeed(type: $type, value: $value) {\n      id\n      type\n      value\n    }\n  }\n": typeof types.CreateSeedDocument,
    "\n  query GetCampaign($id: ID!) {\n    campaign(id: $id) {\n      id\n      name\n      description\n    }\n  }\n": typeof types.GetCampaignDocument,
    "\n  query GetCampaigns {\n    campaigns {\n      id\n      name\n      description\n    }\n  }\n": typeof types.GetCampaignsDocument,
    "\n  query GetSeed($id: ID!) {\n    seed(id: $id) {\n      id\n      type\n      value\n    }\n  }\n": typeof types.GetSeedDocument,
    "\n  query GetSeeds {\n    seeds {\n      id\n      type\n      value\n    }\n  }\n": typeof types.GetSeedsDocument,
    "\n  query GetSeedsByType($type: String!) {\n    seedsByType(type: $type) {\n      id\n      type\n      value\n    }\n  }\n": typeof types.GetSeedsByTypeDocument,
    "\n  query GetSeedsByTypes($types: [String!]!) {\n    seedsByTypes(types: $types)\n  }\n": typeof types.GetSeedsByTypesDocument,
};
const documents: Documents = {
    "\n  mutation CreateCampaign($name: String!, $description: String) {\n    createCampaign(name: $name, description: $description) {\n      id\n      name\n      description\n    }\n  }\n": types.CreateCampaignDocument,
    "\n  mutation CreateSeed($type: String!, $value: String!) {\n    createSeed(type: $type, value: $value) {\n      id\n      type\n      value\n    }\n  }\n": types.CreateSeedDocument,
    "\n  query GetCampaign($id: ID!) {\n    campaign(id: $id) {\n      id\n      name\n      description\n    }\n  }\n": types.GetCampaignDocument,
    "\n  query GetCampaigns {\n    campaigns {\n      id\n      name\n      description\n    }\n  }\n": types.GetCampaignsDocument,
    "\n  query GetSeed($id: ID!) {\n    seed(id: $id) {\n      id\n      type\n      value\n    }\n  }\n": types.GetSeedDocument,
    "\n  query GetSeeds {\n    seeds {\n      id\n      type\n      value\n    }\n  }\n": types.GetSeedsDocument,
    "\n  query GetSeedsByType($type: String!) {\n    seedsByType(type: $type) {\n      id\n      type\n      value\n    }\n  }\n": types.GetSeedsByTypeDocument,
    "\n  query GetSeedsByTypes($types: [String!]!) {\n    seedsByTypes(types: $types)\n  }\n": types.GetSeedsByTypesDocument,
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
export function graphql(source: "\n  query GetSeed($id: ID!) {\n    seed(id: $id) {\n      id\n      type\n      value\n    }\n  }\n"): (typeof documents)["\n  query GetSeed($id: ID!) {\n    seed(id: $id) {\n      id\n      type\n      value\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetSeeds {\n    seeds {\n      id\n      type\n      value\n    }\n  }\n"): (typeof documents)["\n  query GetSeeds {\n    seeds {\n      id\n      type\n      value\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetSeedsByType($type: String!) {\n    seedsByType(type: $type) {\n      id\n      type\n      value\n    }\n  }\n"): (typeof documents)["\n  query GetSeedsByType($type: String!) {\n    seedsByType(type: $type) {\n      id\n      type\n      value\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetSeedsByTypes($types: [String!]!) {\n    seedsByTypes(types: $types)\n  }\n"): (typeof documents)["\n  query GetSeedsByTypes($types: [String!]!) {\n    seedsByTypes(types: $types)\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;