import type { FactionCard } from "../../types";

export type FactionFormProps = {
  onRemove: (id: string, removed: 'success' | 'error' | 'pending') => void;
  onChange: (faction: FactionCard) => void;
  faction: FactionCard;
};
