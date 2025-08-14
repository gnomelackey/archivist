"use client";

import { useState } from "react";

import { Button } from "@repo/components";
import { GetCampaignsDocument, type Campaign } from "@repo/clients";
import { useQuery } from "@apollo/client";

import { CreateCampaignModal } from "./_components/CreateCampaignModal";

const CampaignList = () => {
  const { data, loading, error } = useQuery(GetCampaignsDocument);

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

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen((prev) => !prev);
  };

  return (
    <>
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold">Welcome to the Campaigns Page</h1>
        <CampaignList />
        <Button onClick={handleOpenModal}>Create New Campaign</Button>
      </div>
      <CreateCampaignModal open={modalOpen} onClose={handleOpenModal} />
    </>
  );
}
