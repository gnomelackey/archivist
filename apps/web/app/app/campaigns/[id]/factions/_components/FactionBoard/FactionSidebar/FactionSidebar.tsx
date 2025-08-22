import { FactionForm } from "./FactionForm";
import type { FactionSideBarProps } from "./types";
import { FactionFormSideBarActions } from "./FactionSidebarActions";

export const FactionFormSideBar = ({
  factions,
  onRemove,
  onSave,
  onFieldChange,
}: FactionSideBarProps) => {
  const showActions = factions.length > 0;

  return (
    <div
      className="fixed left-0 bg-palette-600 shadow-lg border-r border-palette-100 z-40 overflow-y-auto pb-10"
      style={{
        width: "400px",
        top: "var(--full-appbar-height, 88px)",
        height: "calc(100vh - var(--full-appbar-height, 88px))",
      }}
    >
      <FactionFormSideBarActions
        factions={factions}
        onSave={onSave}
        onRemove={onRemove}
        show={showActions}
      />
      <div className="p-6 pt-3 flex flex-col gap-6">
        {factions.map((faction) => (
          <FactionForm
            key={faction.id}
            faction={faction}
            onRemove={onRemove}
            onSave={onSave}
            onFactionChange={onFieldChange}
          />
        ))}
      </div>
    </div>
  );
};
