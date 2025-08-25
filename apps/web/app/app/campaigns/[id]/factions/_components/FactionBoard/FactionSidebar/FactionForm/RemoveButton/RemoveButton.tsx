import { Button } from "@repo/components";
import { useMutation } from "@apollo/client";
import {
  GET_FACTIONS_WITH_COORDINATES,
  REMOVE_FACTION_MUTATION,
} from "@repo/clients";
import { useParams } from "next/navigation";

import type { RemoveButtonProps } from "./types";
import type { FactionCard } from "../../../types";

export const RemoveButton = ({ faction, onRemove }: RemoveButtonProps) => {
  const { id: campaignId } = useParams();

  const [removeFaction] = useMutation(REMOVE_FACTION_MUTATION, {
    refetchQueries: [GET_FACTIONS_WITH_COORDINATES],
  });

  const handleRemoveTemporaryCard = (faction: FactionCard) => {
    if (faction.isTemporary) {
      onRemove(faction.id);
    }
  };

  const handleRemoveCard = (faction: FactionCard) => {
    if (!faction.isTemporary) {
      removeFaction({
        variables: { campaign: campaignId, faction: faction.id },
      });
    } else {
      handleRemoveTemporaryCard(faction);
    }
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
