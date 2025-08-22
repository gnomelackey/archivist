import type { Faction } from "@repo/clients";

import { FactionCard } from "../../types";

export type FactionFormSideBarActionsProps = {
  show: boolean;
  onSave: (faction: Faction) => void;
  onReset: () => void;
  onRemove: (id: string) => void;
  factions: Array<FactionCard>;
};
