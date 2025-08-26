import { gql } from "@apollo/client";

export const FACTION_ALLIANCE_FRAGMENT = gql`
  fragment FactionAllianceFragment on FactionAlliance {
    id
    reason
    seed {
      id
      value
    }
    partyA {
      id
      name
    }
    partyB {
      id
      name
    }
  }
`;
