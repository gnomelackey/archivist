import { gql } from "@apollo/client";

export const REMOVE_FACTION_MUTATION = gql`
  mutation RemoveFaction($campaign: ID!, $faction: ID!) {
    removeFaction(campaign: $campaign, faction: $faction)
  }
`;
