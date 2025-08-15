import { gql } from "@apollo/client";

export const GET_CAMPAIGN_QUERY = gql`
  query GetCampaign($id: ID!) {
    campaign(id: $id) {
      id
      name
      description
      user
      createdAt
      updatedAt
    }
  }
`;
