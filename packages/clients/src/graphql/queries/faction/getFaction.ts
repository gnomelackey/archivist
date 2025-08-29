import { gql } from "@apollo/client";

import { FACTION_BASE_FRAGMENT } from "../../fragments/faction";

export const GET_FACTION_QUERY = gql`
  query GetFaction($id: ID!) {
    faction(id: $id) {
      ...FactionBaseFragment
    }
  }

  ${FACTION_BASE_FRAGMENT}
`;
