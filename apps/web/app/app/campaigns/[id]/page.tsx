"use client";

import { GET_CAMPAIGN_QUERY } from "@repo/clients";
import { useParams } from "next/navigation";
import { useQuery } from "@apollo/client";

export default function CampaignPage() {
  const { id } = useParams();
  const { data } = useQuery(GET_CAMPAIGN_QUERY, { variables: { id } });

  if (!data) return <div>Loading...</div>;
  if (!data.campaign) return <div>Campaign not found</div>;
  return (
    <div className="max-w-7xl w-full">Campaign ID: {data.campaign.name}</div>
  );
}
