import { gql } from "@apollo/client";

import { FACTION_RELATIONS_FRAGMENT } from "./fragments/faction.relations";

export const GET_FACTIONS_FOR_BOARD = gql`
  query GetFactionsWithCoordinates($campaign: ID!) {
    factionsWithCoordinates(campaign: $campaign, location: "faction-board") {
      ...FactionRelationsFragment
    }
  }

  ${FACTION_RELATIONS_FRAGMENT}
`;
