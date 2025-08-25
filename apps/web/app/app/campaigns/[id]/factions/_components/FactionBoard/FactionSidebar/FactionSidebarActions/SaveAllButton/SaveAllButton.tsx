import { Button } from "@repo/components";
import { useMutation } from "@apollo/client";
import {
  CREATE_FACTIONS_MUTATION,
  GET_FACTIONS_WITH_COORDINATES,
} from "@repo/clients";
import { CoordinateLocationEnum } from "@repo/enums";
import { useParams } from "next/navigation";

import type { SaveAllButtonProps } from "./types";
import type { FactionCard } from "../../../types";

export const SaveAllButton = ({
  factions,
  onSave,
  show,
}: SaveAllButtonProps) => {
  const { id: campaignId } = useParams();

  const [createFactions] = useMutation(CREATE_FACTIONS_MUTATION, {
    refetchQueries: [GET_FACTIONS_WITH_COORDINATES],
  });

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

  const handleCreateAll = () => {
    const temporaryCards = factions.filter((f) => f.isTemporary);

    if (!temporaryCards.length) return;

    createFactions({
      onCompleted: (data) => {
        data.createFactions.forEach(onSave);
      },
      variables: {
        campaign: campaignId,
        factions: temporaryCards.map(handleFactionMapping),
      },
    });
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
