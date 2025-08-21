import { gql } from "@apollo/client";

export const CREATE_FACTIONS_MUTATION = gql`
  mutation CreateFactions($campaign: ID!, $factions: [FactionInput!]!) {
    createFactions(campaign: $campaign, factions: $factions) {
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
        location
      }
    }
  }
`;
