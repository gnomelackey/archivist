import { RemoveAllButton } from "./RemoveAllButton";
import { RemoveAllTemporaryButton } from "./RemoveAllTemporaryButton";
import { SaveAllButton } from "./CreateAllButton";
import type { FactionFormSideBarActionsProps } from "./types";

export const FactionFormSideBarActions = ({
  factions,
  onRemove,
  onSave,
  show,
}: FactionFormSideBarActionsProps) => {
  if (!show) return null;

  const showRemoveAllTemporary = factions.some((f) => f.isTemporary);

  return (
    <div className="sticky flex flex-col gap-2 top-0 bg-palette-600 p-6 pb-6 mb-4 border-b border-palette-100 z-10">
      <RemoveAllButton factions={factions} onRemove={onRemove} show />
      <RemoveAllTemporaryButton
        factions={factions}
        onRemove={onRemove}
        show={showRemoveAllTemporary}
      />
      <SaveAllButton
        factions={factions}
        onSave={onSave}
        show={showRemoveAllTemporary}
      />
    </div>
  );
};
