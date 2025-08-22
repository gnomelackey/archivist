import { Faction } from "@repo/clients";
import type { FactionCard } from "../../types";

export type FactionFormProps = {
  onRemove: (id: string) => void;
  onFactionChange: (faction: FactionCard) => void;
  onSave: (faction: Faction) => void;
  faction: FactionCard;
};
