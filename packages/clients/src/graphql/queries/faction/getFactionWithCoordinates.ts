import { gql } from "@apollo/client";

export const GET_FACTION_WITH_COORDINATES = gql`
  query GetFactionWithCoordinates($id: ID!, $location: String!) {
    factionWithCoordinates(id: $id, location: $location) {
      id
      name
      race
      color
      description
      coordinates {
        id
        x
        y
        width
        height
      }
    }
  }
`;
