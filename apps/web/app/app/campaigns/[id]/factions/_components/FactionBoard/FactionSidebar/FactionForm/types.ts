import type { FactionCard } from "../../types";

export type FactionFormProps = {
  onRemove: (faction: FactionCard) => void;
  onFactionChange: (faction: FactionCard) => void;
  onSave: (faction: FactionCard) => void;
  faction: FactionCard;
};
