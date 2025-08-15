"use client";

import { useState } from "react";

import { Button } from "@repo/components";

import { CreateCampaignModal } from "./_components/CreateCampaignModal";
import { BookShelf } from "./_components/BookShelf/BookShelf";

export default function CampaignsPage() {
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen((prev) => !prev);
  };

  return (
    <>
      <div className="flex flex-col">
        <BookShelf />
        <Button
          className="absolute right-10 bottom-10"
          onClick={handleOpenModal}
        >
          Create New Campaign
        </Button>
      </div>
      <CreateCampaignModal open={modalOpen} onClose={handleOpenModal} />
    </>
  );
}
