import type { FactionCard } from "../../../types";

export type ResetButtonProps = {
  onReset: (id: string) => void;
  factions: Array<FactionCard>;
  show: boolean;
};
