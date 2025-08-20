import { gql } from "@apollo/client";

export const CREATE_FACTION_MUTATION = gql`
  mutation CreateFaction(
    $campaign: ID!
    $name: String!
    $race: String!
    $color: String!
    $description: String
  ) {
    createFaction(
      campaign: $campaign
      name: $name
      race: $race
      color: $color
      description: $description
    ) {
      id
      name
      race
      description
      color
    }
  }
`;
