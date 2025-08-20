import { gql } from "@apollo/client";

export const GET_FACTIONS_QUERY = gql`
  query GetFactions($campaign: ID!) {
    factions(campaign: $campaign) {
      id
      name
      race
      description
      color
    }
  }
`;
