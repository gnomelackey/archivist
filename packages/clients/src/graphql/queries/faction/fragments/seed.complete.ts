import { gql } from "@apollo/client";

export const COMPLETE_SEED_FRAGMENT = gql`
  fragment CompleteSeedFragment on Seed {
    id
    value
  }
`;
