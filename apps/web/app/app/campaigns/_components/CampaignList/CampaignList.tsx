"use client";

import { GET_CAMPAIGNS_QUERY, type Campaign } from "@repo/clients";
import { useQuery } from "@apollo/client";

export const CampaignList = () => {
  const { data, loading, error } = useQuery(GET_CAMPAIGNS_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching campaigns</p>;

  const campaigns = data?.campaigns || [];

  if (campaigns.length === 0) {
    return <p>No campaigns found. Create a new one!</p>;
  }

  return (
    <ul>
      {campaigns.map((campaign: Campaign) => (
        <li key={campaign.id}>{campaign.name}</li>
      ))}
    </ul>
  );
};
