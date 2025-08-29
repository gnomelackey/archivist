import { gql } from "@apollo/client";

export const FACTION_CONFLICT_FRAGMENT = gql`
  fragment FactionConflictFragment on FactionConflict {
    id
    reason
    seed
    aggressor
    defender
  }
`;
