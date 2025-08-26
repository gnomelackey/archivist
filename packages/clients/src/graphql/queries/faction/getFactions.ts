import { gql } from "@apollo/client";

import { FACTION_BASE_FRAGMENT } from "./fragments/faction.base";

export const GET_FACTIONS_QUERY = gql`
  query GetFactions($campaign: ID!) {
    factions(campaign: $campaign) {
      ...FactionBaseFragment
    }
  }

  ${FACTION_BASE_FRAGMENT}
`;
