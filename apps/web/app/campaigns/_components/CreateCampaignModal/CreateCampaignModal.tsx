import { Button, Input, Modal, TextArea } from "@repo/components";

export const CreateCampaignModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  return (
    <Modal title="Create New Campaign" open={open}>
      <form className="flex flex-col space-y-4">
        <Input id="name" label="Campaign Name" />
        <TextArea id="description" label="Description" />
        <div className="flex justify-end space-x-2">
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit">Create</Button>
        </div>
      </form>
    </Modal>
  );
};
