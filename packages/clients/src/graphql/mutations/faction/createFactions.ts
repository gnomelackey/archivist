import { gql } from "@apollo/client";

import { FACTION_BASE_FRAGMENT } from "../../fragments";

export const CREATE_FACTIONS_MUTATION = gql`
  mutation CreateFactions($campaign: ID!, $factions: [FactionInput!]!) {
    createFactions(campaign: $campaign, factions: $factions) {
      ...FactionBaseFragment
    }
  }

  ${FACTION_BASE_FRAGMENT}
`;
