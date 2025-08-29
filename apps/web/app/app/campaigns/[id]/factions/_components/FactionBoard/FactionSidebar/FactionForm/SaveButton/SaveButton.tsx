import { useCallback } from "react";

import { Button } from "@repo/components";
import { useMutation } from "@apollo/client";
import { UPDATE_FACTION_MUTATION } from "@repo/clients";
import { useParams } from "next/navigation";

import type { SaveButtonProps } from "./types";
import { handleFactionMapping } from "../../../utils";

export const SaveButton = ({ faction, show }: SaveButtonProps) => {
  const { id: campaignId } = useParams();

  const [updateFaction] = useMutation(UPDATE_FACTION_MUTATION);

  const handleUpdate = useCallback(() => {
    const variables = {
      campaign: campaignId,
      faction: faction.id,
      data: handleFactionMapping(faction),
    };

    updateFaction({ variables });
  }, [campaignId, faction, updateFaction]);

  if (!show) return null;

  return (
    <Button
      type="button"
      variant="fill"
      className="flex-1"
      mode="success"
      onClick={handleUpdate}
    >
      Save
    </Button>
  );
};
