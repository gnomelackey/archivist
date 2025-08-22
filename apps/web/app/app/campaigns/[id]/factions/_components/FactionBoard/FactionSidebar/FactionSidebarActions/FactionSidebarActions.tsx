import { RemoveAllButton } from "./RemoveAllButton";
import { ResetButton } from "./ResetButton";
import { SaveAllButton } from "./SaveAllButton";
import type { FactionFormSideBarActionsProps } from "./types";

export const FactionFormSideBarActions = ({
  factions,
  onRemove,
  onSave,
  show,
}: FactionFormSideBarActionsProps) => {
  if (!show) return null;

  const showReset = factions.some((f) => f.isTemporary);

  return (
    <div className="sticky flex flex-col gap-2 top-0 bg-palette-600 p-6 pb-6 mb-4 border-b border-palette-100 z-10">
      <RemoveAllButton factions={factions} onRemove={onRemove} show />
      <ResetButton factions={factions} onReset={onRemove} show={showReset} />
      <SaveAllButton factions={factions} onSave={onSave} show={showReset} />
    </div>
  );
};
