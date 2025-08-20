import type { FactionFormFields } from "./FactionForm/types";

export type FactionSideBarProps = {
  onFactionChange: (faction: FactionFormFields) => void;
  onColorChange: (id: string, color: string) => void;
  onRemove: (id: string) => void;
  factions: Array<FactionFormFields>;
};
