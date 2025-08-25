import { gql } from "@apollo/client";

import { COMPLETE_FACTION_FRAGEMENT } from "./fragments/faction.complete";
import { COMPLETE_SEED_FRAGMENT } from "./fragments/seed.complete";
import { COMPLETE_COORDINATES_FRAGMENT } from "./fragments/coords.complete";

export const GET_FACTIONS_WITH_COORDINATES = gql`
  query GetFactionsWithCoordinates($campaign: ID!, $location: String!) {
    factionsWithCoordinates(campaign: $campaign, location: $location) {
      ...CompleteFactionFragment
      coordinates {
        ...CompleteCoordinatesFragment
      }
      resources {
        ...CompleteSeedFragment
      }
      goals {
        ...CompleteSeedFragment
      }
    }
  }

  ${COMPLETE_SEED_FRAGMENT}
  ${COMPLETE_COORDINATES_FRAGMENT}
  ${COMPLETE_FACTION_FRAGEMENT}
`;
