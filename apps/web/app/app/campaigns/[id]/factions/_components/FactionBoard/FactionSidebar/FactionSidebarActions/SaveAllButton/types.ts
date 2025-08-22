import type { Faction } from "@repo/clients";

import type { FactionCard } from "../../../types";

export type SaveAllButtonProps = {
  onSave: (faction: Faction) => void;
  factions: Array<FactionCard>;
  show: boolean;
};
