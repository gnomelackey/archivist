import { FactionForm } from "./FactionForm";
import type { FactionSideBarProps } from "./types";
import { FactionFormSideBarActions } from "./FactionSidebarActions";

export const FactionFormSideBar = ({
  factions,
  onRemove,
  onSave,
  onReset,
  onChange,
}: FactionSideBarProps) => {
  const showActions = factions.length > 0;

  return (
    <div
      className="fixed flex flex-col justify-between left-0 bg-palette-600 shadow-lg border-r border-palette-100 z-40 overflow-y-auto"
      style={{
        width: "400px",
        top: "var(--full-appbar-height, 88px)",
        height: "calc(100vh - var(--full-appbar-height, 88px))",
      }}
    >
      <div className="p-6 pb-24 flex flex-col gap-6">
        {factions.map((faction) => (
          <FactionForm
            key={faction.id}
            faction={faction}
            onRemove={onRemove}
            onSave={onSave}
            onChange={onChange}
          />
        ))}
      </div>
      <FactionFormSideBarActions
        factions={factions}
        onSave={onSave}
        onReset={onReset}
        onRemove={onRemove}
        show={showActions}
      />
    </div>
  );
};
