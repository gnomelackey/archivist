import { gql } from "@apollo/client";

export const GET_SEEDS_BY_TYPES_QUERY_NAME = "GetSeedsByTypes";

export const GET_SEEDS_BY_TYPES_QUERY = gql`
  query ${GET_SEEDS_BY_TYPES_QUERY_NAME}($types: [String!]!) {
    seedsByTypes(types: $types)
  }
`;
