import { Button, Input, TextArea } from "@repo/components";

export const CreateCampaignModal = ({ open }: { open: boolean }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Create New Campaign</h2>
        <form>
          <Input id="name" label="Campaign Name" />
          <TextArea id="description" label="Description" />
          <div className="flex justify-end">
            <Button>Cancel</Button>
            <Button type="submit">Create</Button>
          </div>
        </form>
      </div>
    </div>
  );
};
