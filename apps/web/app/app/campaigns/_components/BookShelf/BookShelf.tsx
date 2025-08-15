"use client";

import { GET_CAMPAIGNS_QUERY, type Campaign } from "@repo/clients";
import { useQuery } from "@apollo/client";
import { Book } from "./Book/Book";

export const BookShelf = () => {
  const { data, loading, error } = useQuery(GET_CAMPAIGNS_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching campaigns</p>;

  const campaigns = data?.campaigns || [];

  if (campaigns.length === 0) {
    return <p>No campaigns found. Create a new one!</p>;
  }

  return (
    <div>
      {campaigns.map((campaign: Campaign) => (
        <Book
          key={campaign.id}
          title={campaign.name}
          subtitle={campaign.description}
          width={100}
          height={300}
        />
      ))}
    </div>
  );
};
