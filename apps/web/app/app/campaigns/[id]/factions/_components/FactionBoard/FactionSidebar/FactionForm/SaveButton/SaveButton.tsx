import { Button } from "@repo/components";
import { useMutation } from "@apollo/client";
import {
  CREATE_FACTION_MUTATION,
  GET_FACTIONS_FOR_BOARD,
} from "@repo/clients";
import { useParams } from "next/navigation";

import type { SaveButtonProps } from "./types";
import type { FactionCard } from "../../../types";
import { handleFactionMapping } from "../../utils";

export const SaveButton = ({ faction, onSave, show }: SaveButtonProps) => {
  const { id: campaignId } = useParams();

  const [createFaction] = useMutation(CREATE_FACTION_MUTATION, {
    refetchQueries: [GET_FACTIONS_FOR_BOARD],
  });

  if (!show) return null;

  const handleCreate = (faction: FactionCard) => {
    createFaction({
      onCompleted: (data) => {
        onSave(data.createFaction);
      },
      variables: {
        campaign: campaignId,
        faction: handleFactionMapping(faction),
      },
    });
  };

  return (
    <Button
      type="button"
      variant="fill"
      className="flex-1"
      mode="success"
      onClick={() => handleCreate(faction)}
    >
      Save
    </Button>
  );
};
