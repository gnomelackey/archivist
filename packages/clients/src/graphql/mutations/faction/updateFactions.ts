import { gql } from "@apollo/client";

import { FACTION_RELATIONS_FRAGMENT } from "../../fragments";

export const UPDATE_FACTIONS_MUTATION = gql`
  mutation UpdateFactions($campaign: ID!, $data: [FactionUpdateInput!]!) {
    updateFactions(campaign: $campaign, data: $data) {
      ...FactionRelationsFragment
    }
  }

  ${FACTION_RELATIONS_FRAGMENT}
`;
