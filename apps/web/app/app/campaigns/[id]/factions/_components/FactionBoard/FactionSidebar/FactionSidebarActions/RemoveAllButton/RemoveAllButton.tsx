import { Button } from "@repo/components";
import { useMutation } from "@apollo/client";
import { REMOVE_FACTIONS_MUTATION } from "@repo/clients";
import { useParams } from "next/navigation";

import type { RemoveAllButtonProps } from "./types";
import type { FactionCard } from "../../../types";

export const RemoveAllButton = ({
  factions,
  onRemove,
  show,
}: RemoveAllButtonProps) => {
  const { id: campaignId } = useParams();

  const [removeFactions] = useMutation(REMOVE_FACTIONS_MUTATION);

  if (!show) return null;

  const handleRemoveTemporaryCard = (faction: FactionCard) => {
    if (faction.isTemporary) {
      onRemove(faction.id);
    }
  };

  const handleRemoveAll = () => {
    const [permanentCards, temporaryCards] = factions.reduce(
      (acc: [Array<FactionCard>, Array<FactionCard>], f) =>
        !f.isTemporary ? [[...acc[0], f], acc[1]] : [acc[0], [...acc[1], f]],
      [[], []]
    );

    if (permanentCards.length) {
      removeFactions({
        onCompleted: () => {
          temporaryCards.forEach(handleRemoveTemporaryCard);
        },
        variables: {
          campaign: campaignId,
          factions: permanentCards.map(({ id }) => id),
        },
      });
    } else {
      temporaryCards.forEach(handleRemoveTemporaryCard);
    }
  };

  return (
    <Button
      key="faction-remove-all"
      className="w-full"
      mode="secondary"
      onClick={handleRemoveAll}
    >
      Remove All
    </Button>
  );
};
