import { Button } from "@repo/components";

import type { RemoveAllTemporaryButtonProps } from "./types";
import type { FactionCard } from "../../../types";

export const RemoveAllTemporaryButton = ({
  factions,
  onRemove,
  show,
}: RemoveAllTemporaryButtonProps) => {
  if (!show) return null;

  const handleRemoveTemporaryCard = (faction: FactionCard) => {
    if (faction.isTemporary) {
      onRemove(faction.id);
    }
  };

  return (
    <Button
      key="faction-remove-temporary"
      className="w-full"
      mode="secondary"
      onClick={() => factions.forEach(handleRemoveTemporaryCard)}
    >
      Clear Temporary
    </Button>
  );
};
