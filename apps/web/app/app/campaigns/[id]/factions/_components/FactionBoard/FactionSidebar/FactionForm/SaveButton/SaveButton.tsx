import { Button } from "@repo/components";
import { useMutation } from "@apollo/client";
import { CREATE_FACTION_MUTATION } from "@repo/clients";
import { useParams } from "next/navigation";

import type { SaveButtonProps } from "../../types";
import type { FactionCard } from "../../../types";
import { CoordinateLocationEnum } from "@repo/enums";

export const SaveButton = ({ faction, onSave, show }: SaveButtonProps) => {
  const { id: campaignId } = useParams();

  const [createFaction] = useMutation(CREATE_FACTION_MUTATION);

  if (!show) return null;

  const handleFactionMapping = (faction: FactionCard) => ({
    name: faction.data.name,
    race: faction.data.race,
    description: faction.data.description,
    color: faction.data.color,
    coordinates: {
      x: faction.x,
      y: faction.y,
      width: faction.width,
      height: faction.height,
      location: CoordinateLocationEnum.FACTION_BOARD,
    },
  });

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
      onClick={() => handleCreate(faction)}
    >
      Save
    </Button>
  );
};
