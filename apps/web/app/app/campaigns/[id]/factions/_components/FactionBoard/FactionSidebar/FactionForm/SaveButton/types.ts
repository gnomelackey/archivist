import type { Faction } from "@repo/clients";

import { FactionCard } from "../../../types";

export type SaveButtonProps = {
  faction: FactionCard;
  show: boolean;
  onSave: (faction: Faction) => void;
};
