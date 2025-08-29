import { Button } from "@repo/components";
import { useMutation } from "@apollo/client";
import { UPDATE_FACTIONS_MUTATION } from "@repo/clients";
import { useParams } from "next/navigation";

import type { SaveAllButtonProps } from "./types";
import { handleFactionMapping } from "../../../utils";

export const SaveAllButton = ({ factions, show }: SaveAllButtonProps) => {
  const { id: campaignId } = useParams();

  const [updateFaction] = useMutation(UPDATE_FACTIONS_MUTATION);

  if (!show) return null;

  const handleCreateAll = () => {
    const temporaryCards = factions.filter((f) => f.isModified);

    if (!temporaryCards.length) return;

    const variables = {
      campaign: campaignId,
      data: temporaryCards.map((f) => ({ id: f.id, ...handleFactionMapping(f) })),
    };

    updateFaction({ variables });
  };

  return (
    <Button
      key="faction-create-all"
      className="w-full"
      variant="fill"
      mode="success"
      onClick={handleCreateAll}
    >
      Save All
    </Button>
  );
};
