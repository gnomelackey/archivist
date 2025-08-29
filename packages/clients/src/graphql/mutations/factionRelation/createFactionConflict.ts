import { gql } from "@apollo/client";

import { FACTION_RELATIONS_FRAGMENT } from "../../fragments";

export const CREATE_FACTION_CONFLICT_MUTATION = gql`
  mutation CreateFactionConflict($campaign: ID!, $input: FactionConflictInput!) {
    createFactionConflict(campaign: $campaign, input: $input) {
      ...FactionRelationsFragment
    }
  }

  ${FACTION_RELATIONS_FRAGMENT}
`;
