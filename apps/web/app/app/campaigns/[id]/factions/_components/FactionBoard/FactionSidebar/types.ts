import type { FactionCard } from "../types";

export type FactionSideBarProps = {
  onFactionChange: (faction: FactionCard) => void;
  onRemove: (id: string) => void;
  factions: Array<FactionCard>;
};
