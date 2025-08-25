import { gql } from "@apollo/client";

import { COMPLETE_FACTION_FRAGEMENT } from "./fragments/faction.complete";

export const GET_FACTION_QUERY = gql`
  query GetFaction($id: ID!) {
    faction(id: $id) {
      ...CompleteFactionFragment
    }
  }

  ${COMPLETE_FACTION_FRAGEMENT}
`;
