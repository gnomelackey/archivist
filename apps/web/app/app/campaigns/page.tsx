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
    <div className="max-w-7xl w-full">
      <div className="flex flex-col">
        <CampaignList />
        <Button
          className="absolute right-10 bottom-10"
          onClick={handleOpenModal}
        >
          Create New Campaign
        </Button>
      </div>
      <CreateCampaignModal open={modalOpen} onClose={handleOpenModal} />
    </div>
  );
}
