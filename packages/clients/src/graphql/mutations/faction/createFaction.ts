import { gql } from "@apollo/client";

import { FACTION_BASE_FRAGMENT } from "../../fragments";

export const CREATE_FACTION_MUTATION = gql`
  mutation CreateFaction($campaign: ID!, $faction: FactionCreateInput!) {
    createFaction(campaign: $campaign, faction: $faction) {
      ...FactionBaseFragment
    }
  }

  ${FACTION_BASE_FRAGMENT}
`;
