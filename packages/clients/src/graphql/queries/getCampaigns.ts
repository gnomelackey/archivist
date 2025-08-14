import { gql } from "@apollo/client";

export const GET_CAMPAIGNS_QUERY = gql`
  query GetCampaigns {
    campaigns {
      id
      name
      description
      user
      createdAt
      updatedAt
    }
  }
`;
