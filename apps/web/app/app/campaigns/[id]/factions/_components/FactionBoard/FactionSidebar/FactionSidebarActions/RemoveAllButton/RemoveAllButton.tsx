import { Button } from "@repo/components";
import { useMutation } from "@apollo/client";
import { REMOVE_FACTIONS_MUTATION } from "@repo/clients";
import { useParams } from "next/navigation";

import type { RemoveAllButtonProps } from "./types";
import type { FactionCard } from "../../../types";

export const RemoveAllButton = ({
  factions,
  show,
  onRemove,
}: RemoveAllButtonProps) => {
  const { id: campaignId } = useParams();

  const [removeFactions] = useMutation(REMOVE_FACTIONS_MUTATION, {
    onCompleted: () => {
      factions.forEach(({ id }) => onRemove(id, 'success'));
    },
    onError: () => {
      factions.forEach(({ id }) => onRemove(id, 'error'));
    },
  });

  if (!show) return null;

  const handleRemoveAll = () => {
    const [permanentCards] = factions.reduce(
      (acc: [Array<FactionCard>, Array<FactionCard>], f) =>
        !f.isModified ? [[...acc[0], f], acc[1]] : [acc[0], [...acc[1], f]],
      [[], []]
    );

    const variables = {
      campaign: campaignId,
      factions: permanentCards.map(({ id }) => id),
    };

    factions.forEach(({ id }) => onRemove(id));
    removeFactions({ variables });
  };

  return (
    <Button
      key="faction-remove-all"
      className="w-full"
      mode="error"
      onClick={handleRemoveAll}
    >
      Remove All
    </Button>
  );
};
