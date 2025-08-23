"use client";

import { GET_CAMPAIGNS_QUERY, type Campaign } from "@repo/clients";
import { useQuery } from "@apollo/client";
import Link from "next/link";

export const CampaignList = () => {
  const { data, loading, error } = useQuery(GET_CAMPAIGNS_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching campaigns</p>;

  const campaigns = data?.campaigns || [];

  if (campaigns.length === 0) {
    return <p>No campaigns found. Create a new one!</p>;
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-4 flex-wrap">
        {campaigns.map((campaign: Campaign) => (
          <Link
            key={campaign.id}
            className="text-transparent w-50 h-50 p-4 rounded flex flex-col justify-end border border-primary bg-primary-100"
            href="/app/campaigns/[id]"
            as={`/app/campaigns/${campaign.id}`}
          >
            <h6 className="text-sm font-semibold text-primary-600 w-42 text-ellipsis overflow-hidden">
              {campaign.name}
            </h6>
            <p className="text-sm text-primary-fg">{campaign.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};
