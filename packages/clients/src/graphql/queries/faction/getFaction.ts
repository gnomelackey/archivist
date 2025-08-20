import { gql } from "@apollo/client";

export const GET_FACTION_QUERY = gql`
  query GetFaction($id: ID!) {
    faction(id: $id) {
      id
      name
      race
      description
      color
    }
  }
`;
