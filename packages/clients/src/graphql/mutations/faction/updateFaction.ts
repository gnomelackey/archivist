import { gql } from "@apollo/client";

import { FACTION_RELATIONS_FRAGMENT } from "../../fragments";

export const UPDATE_FACTION_MUTATION = gql`
  mutation UpdateFaction($campaign: ID!, $faction: ID!, $data: FactionCreateInput!) {
    updateFaction(campaign: $campaign, faction: $faction, data: $data) {
      ...FactionRelationsFragment
    }
  }

  ${FACTION_RELATIONS_FRAGMENT}
`;
