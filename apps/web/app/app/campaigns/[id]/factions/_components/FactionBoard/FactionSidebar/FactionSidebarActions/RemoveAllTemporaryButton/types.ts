import type { FactionCard } from "../../../types";

export type RemoveAllTemporaryButtonProps = {
  onRemove: (id: string) => void;
  factions: Array<FactionCard>;
  show: boolean;
};
