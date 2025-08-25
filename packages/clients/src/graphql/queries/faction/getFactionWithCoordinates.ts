import { gql } from "@apollo/client";

import { COMPLETE_FACTION_FRAGEMENT } from "./fragments/faction.complete";
import { COMPLETE_COORDINATES_FRAGMENT } from "./fragments/coords.complete";
import { COMPLETE_SEED_FRAGMENT } from "./fragments/seed.complete";

export const GET_FACTION_WITH_COORDINATES = gql`
  query GetFactionWithCoordinates($id: ID!, $location: String!) {
    factionWithCoordinates(id: $id, location: $location) {
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
