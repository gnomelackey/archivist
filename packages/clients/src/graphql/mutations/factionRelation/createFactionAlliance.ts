import { gql } from "@apollo/client";

import { FACTION_RELATIONS_FRAGMENT } from "../../fragments";

export const CREATE_FACTION_ALLIANCE_MUTATION = gql`
  mutation CreateFactionAlliance($campaign: ID!, $input: FactionAllianceInput!) {
    createFactionAlliance(campaign: $campaign, input: $input) {
      ...FactionRelationsFragment
    }
  }

  ${FACTION_RELATIONS_FRAGMENT}
`;
