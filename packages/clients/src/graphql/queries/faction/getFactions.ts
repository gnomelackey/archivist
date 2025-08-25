import { gql } from "@apollo/client";

import { COMPLETE_FACTION_FRAGEMENT } from "./fragments/faction.complete";

export const GET_FACTIONS_QUERY = gql`
  query GetFactions($campaign: ID!) {
    factions(campaign: $campaign) {
      ...CompleteFactionFragment
    }
  }

  ${COMPLETE_FACTION_FRAGEMENT}
`;
