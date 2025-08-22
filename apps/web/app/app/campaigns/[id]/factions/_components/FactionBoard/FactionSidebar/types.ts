import type { Faction } from "@repo/clients";

import type { FactionCard } from "../types";

export type FactionSideBarProps = {
  onChange: (faction: FactionCard) => void;
  onSave: (faction: Faction) => void;
  onReset: () => void;
  onRemove: (id: string) => void;
  factions: Array<FactionCard>;
};
