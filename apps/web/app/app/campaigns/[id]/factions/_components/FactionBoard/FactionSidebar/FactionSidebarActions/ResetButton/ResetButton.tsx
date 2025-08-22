import { Button } from "@repo/components";

import type { ResetButtonProps } from "./types";
import type { FactionCard } from "../../../types";

export const ResetButton = ({ factions, onReset, show }: ResetButtonProps) => {
  if (!show) return null;

  const handleResetCards = (faction: FactionCard) => {
    if (faction.isTemporary) {
      onReset(faction.id);
    }
  };

  return (
    <Button
      key="faction-remove-temporary"
      className="w-full"
      mode="secondary"
      onClick={() => factions.forEach(handleResetCards)}
    >
      Reset Board
    </Button>
  );
};
