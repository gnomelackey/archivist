import { gql } from "@apollo/client";

export const GET_SEEDS_BY_TYPES_QUERY = gql`
  query GetSeedsByTypes($types: [String!]!) {
    seedsByTypes(types: $types)
  }
`;
