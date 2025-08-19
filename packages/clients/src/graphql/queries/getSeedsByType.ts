import { gql } from "@apollo/client";

export const GET_SEEDS_BY_TYPE_QUERY = gql`
  query GetSeedsByType($type: String!) {
    seedsByType(type: $type) {
      id
      type
      value
      user
      createdAt
      updatedAt
    }
  }
`;
