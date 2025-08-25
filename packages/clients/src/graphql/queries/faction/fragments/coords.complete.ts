import { gql } from "@apollo/client";

export const COMPLETE_COORDINATES_FRAGMENT = gql`
  fragment CompleteCoordinatesFragment on Coordinates {
    id
    x
    y
    width
    height
  }
`;