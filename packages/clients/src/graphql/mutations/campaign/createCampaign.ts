import { gql } from "@apollo/client";

export const CREATE_CAMPAIGN_MUTATION = gql`
  mutation CreateCampaign($name: String!, $description: String) {
    createCampaign(name: $name, description: $description) {
      id
      name
      description
    }
  }
`;
