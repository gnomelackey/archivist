import { Button } from "@repo/components";
import { useMutation } from "@apollo/client";
import {
  CREATE_FACTIONS_MUTATION,
  GET_FACTIONS_FOR_BOARD,
} from "@repo/clients";
import { useParams } from "next/navigation";

import type { SaveAllButtonProps } from "./types";
import { handleFactionMapping } from "../../utils";

export const SaveAllButton = ({
  factions,
  onSave,
  show,
}: SaveAllButtonProps) => {
  const { id: campaignId } = useParams();

  const [createFactions] = useMutation(CREATE_FACTIONS_MUTATION, {
    refetchQueries: [GET_FACTIONS_FOR_BOARD],
  });

  if (!show) return null;

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
