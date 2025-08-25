import { gql } from "@apollo/client";

export const COMPLETE_FACTION_FRAGEMENT = gql`
  fragment CompleteFactionFragment on Faction {
    id
    name
    race
    color
    description
  }
`;
