import { gql } from "@apollo/client";

export const GET_SEED_QUERY = gql`
  query GetSeed($id: ID!) {
    seed(id: $id) {
      id
      type
      value
    }
  }
`;
