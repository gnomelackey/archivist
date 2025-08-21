import { gql } from "@apollo/client";

export const GET_FACTIONS_WITH_COORDINATES = gql`
  query GetFactionsWithCoordinates($campaign: ID!, $location: String!) {
    factionsWithCoordinates(campaign: $campaign, location: $location) {
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
