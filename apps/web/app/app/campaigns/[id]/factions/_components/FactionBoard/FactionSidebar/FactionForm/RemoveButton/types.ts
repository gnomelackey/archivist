import type { FactionCard } from "../../../types";

export type RemoveButtonProps = {
  onRemove: (id: string) => void;
  faction: FactionCard;
  show: boolean;
};
