import { RemoveAllButton } from "./RemoveAllButton";
import { ResetButton } from "./ResetButton";
import { SaveAllButton } from "./SaveAllButton";
import type { FactionFormSideBarActionsProps } from "./types";

export const FactionFormSideBarActions = ({
  factions,
  onRemove,
  onSave,
  onReset,
  show,
}: FactionFormSideBarActionsProps) => {
  if (!show) return null;

  const showReset = factions.some((f) => f.isTemporary);

  return (
    <div className="sticky flex flex-col gap-2 bottom-0 border-primary-border p-6 pt-6 border-t z-10 bg-bg-default">
      <RemoveAllButton factions={factions} onRemove={onRemove} show />
      <ResetButton onReset={onReset} show={showReset} />
      <SaveAllButton factions={factions} onSave={onSave} show={showReset} />
    </div>
  );
};
