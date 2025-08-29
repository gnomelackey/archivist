import { gql } from "@apollo/client";

export const FACTION_COORDINATES_FRAGMENT = gql`
  fragment FactionCoordinatesFragment on Coordinates {
    id
    x
    y
    width
    height
  }
`;