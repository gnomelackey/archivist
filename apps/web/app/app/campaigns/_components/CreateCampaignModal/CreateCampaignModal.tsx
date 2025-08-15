import { ChangeEvent, useState } from "react";

import { graphqlClient, CREATE_CAMPAIGN_MUTATION } from "@repo/clients";
import { Button, Input, Modal, TextArea } from "@repo/components";

import type { CreateCampaignModalProps } from "./types";

export const CreateCampaignModal = ({
  open,
  onClose,
}: CreateCampaignModalProps) => {
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  const handleClose = () => {
    setName("");
    setDescription("");
    onClose();
  };

  const handleCreateCampaign = async () => {
    await graphqlClient.mutate({
      mutation: CREATE_CAMPAIGN_MUTATION,
      variables: { name, description },
    });

    handleClose();
  };

  const footer = (
    <div className="flex justify-end space-x-2 w-full">
      <Button mode="secondary" onClick={handleClose}>
        Cancel
      </Button>
      <Button mode="secondary" variant="fill" onClick={handleCreateCampaign}>
        Confirm
      </Button>
    </div>
  );

  return (
    <Modal title="Create New Campaign" size="lg" open={open} footer={footer}>
      <form className="flex flex-col space-y-4">
        <Input
          id="name"
          label="Campaign Name"
          value={name}
          onChange={handleNameChange}
        />
        <TextArea
          id="description"
          label="Description"
          value={description}
          onChange={handleDescriptionChange}
        />
      </form>
    </Modal>
  );
};
