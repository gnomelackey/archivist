"use client";

import { useState } from "react";

import { Button } from "@repo/components";

import { CreateCampaignModal } from "./_components/CreateCampaignModal";
import { CampaignList } from "./_components/CampaignList/CampaignList";

export default function CampaignsPage() {
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
