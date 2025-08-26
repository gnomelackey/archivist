import { gql } from "@apollo/client";

export const FACTION_BASE_FRAGMENT = gql`
  fragment FactionBaseFragment on Faction {
    id
    name
    race
    color
    description
  }
`;
