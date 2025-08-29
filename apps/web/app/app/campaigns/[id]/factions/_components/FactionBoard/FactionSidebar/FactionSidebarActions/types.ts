
import { FactionCard } from "../../types";

export type FactionFormSideBarActionsProps = {
  show: boolean;
  onReset: () => void;
  onRemove: (id: string, removed: 'success' | 'error' | 'pending') => void;
  factions: Array<FactionCard>;
};
