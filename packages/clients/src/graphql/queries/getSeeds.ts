import { gql } from "@apollo/client";

export const GET_SEEDS_QUERY = gql`
  query GetSeeds {
    seeds {
      id
      type
      value
      user
      createdAt
      updatedAt
    }
  }
`;
