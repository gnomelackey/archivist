import type { FactionCard } from "../../../types";

export type RemoveButtonProps = {
  onRemove: (id: string, removed: 'success' | 'error' | 'pending') => void;
  faction: FactionCard;
  show: boolean;
};
