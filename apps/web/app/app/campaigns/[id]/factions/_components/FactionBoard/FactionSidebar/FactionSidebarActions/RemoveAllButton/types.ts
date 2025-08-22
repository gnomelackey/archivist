import type { FactionCard } from "../../../types";

export type RemoveAllButtonProps = {
  onRemove: (id: string) => void;
  factions: Array<FactionCard>;
  show: boolean;
};
