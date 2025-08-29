import { Button } from "@repo/components";
import { useMutation } from "@apollo/client";
import { REMOVE_FACTION_MUTATION } from "@repo/clients";
import { useParams } from "next/navigation";

import type { RemoveButtonProps } from "./types";
import type { FactionCard } from "../../../types";

export const RemoveButton = ({ faction, onRemove }: RemoveButtonProps) => {
  const { id: campaignId } = useParams();

  const [removeFaction] = useMutation(REMOVE_FACTION_MUTATION, {
    onCompleted: () => {
      onRemove(faction.id, 'success');
    },
    onError: () => {
      onRemove(faction.id, 'error');
    },
  });

  const handleRemoveCard = (faction: FactionCard) => {
    const variables = { campaign: campaignId, faction: faction.id };

    onRemove(faction.id, 'pending');
    removeFaction({ variables });
  };

  return (
    <Button
      type="button"
      variant="outline"
      mode="error"
      onClick={() => handleRemoveCard(faction)}
    >
      Remove
    </Button>
  );
};
