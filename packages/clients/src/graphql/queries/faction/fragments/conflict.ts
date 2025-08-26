import { gql } from "@apollo/client";

export const FACTION_CONFLICT_FRAGMENT = gql`
  fragment FactionConflictFragment on FactionConflict {
    id
    reason
    seed {
      id
      value
    }
    aggressor {
      id
      name
    }
    defender {
      id
      name
    }
  }
`;
