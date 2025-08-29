import { gql } from "@apollo/client";

export const FACTION_SEED_FRAGMENT = gql`
  fragment FactionSeedFragment on Seed {
    id
    value
  }
`;
