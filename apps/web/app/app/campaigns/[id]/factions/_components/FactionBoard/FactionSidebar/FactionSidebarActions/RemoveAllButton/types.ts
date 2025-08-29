import type { FactionCard } from "../../../types";

export type RemoveAllButtonProps = {
  onRemove: (id: string, removed: 'success' | 'error' | 'pending') => void;
  factions: Array<FactionCard>;
  show: boolean;
};
