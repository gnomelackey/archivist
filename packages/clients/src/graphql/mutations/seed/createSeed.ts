import { gql } from "@apollo/client";

export const CREATE_SEED_MUTATION = gql`
  mutation CreateSeed($type: String!, $value: String!) {
    createSeed(type: $type, value: $value) {
      id
      type
      value
    }
  }
`;
