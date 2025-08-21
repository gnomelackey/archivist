import { gql } from "@apollo/client";

export const REMOVE_FACTIONS_MUTATION = gql`
  mutation RemoveFactions($campaign: ID!, $factions: [ID!]!) {
    removeFactions(campaign: $campaign, factions: $factions)
  }
`;
