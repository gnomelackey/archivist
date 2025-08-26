import { gql } from "@apollo/client";

import { FACTION_ALLIANCE_FRAGMENT } from "./alliance";
import { FACTION_CONFLICT_FRAGMENT } from "./conflict";
import { FACTION_COORDINATES_FRAGMENT } from "./coords";
import { FACTION_SEED_FRAGMENT } from "./seed";
import { FACTION_BASE_FRAGMENT } from "./faction.base";

export const FACTION_RELATIONS_FRAGMENT = gql`
  fragment FactionRelationsFragment on Faction {
    ...FactionBaseFragment
    coordinates {
      ...FactionCoordinatesFragment
    }
    resources {
      ...FactionSeedFragment
    }
    goals {
      ...FactionSeedFragment
    }
    conflicts {
      ...FactionConflictFragment
    }
    alliances {
      ...FactionAllianceFragment
    }
  }

  ${FACTION_ALLIANCE_FRAGMENT}
  ${FACTION_CONFLICT_FRAGMENT}
  ${FACTION_SEED_FRAGMENT}
  ${FACTION_COORDINATES_FRAGMENT}
  ${FACTION_BASE_FRAGMENT}
`;
