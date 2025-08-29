import type { FactionCard } from "../types";

export type FactionSideBarProps = {
  onChange: (faction: FactionCard) => void;
  onRemove: (id: string, removed: 'success' | 'error' | 'pending') => void;
  onReset: () => void;
  factions: Array<FactionCard>;
};
