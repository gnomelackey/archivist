import type { FactionToolTipProps } from "../FactionRelationsTooltip";
import type { FactionCard } from "../types";

export interface UseDrawingLogicParams {
  cards: Array<FactionCard>;
  onCardAdded: (card: FactionCard) => void;
  onTooltipsAdded: (tooltips: Array<FactionToolTipProps>) => void;
  panOffset: { x: number; y: number };
  seeds: {
    races: Array<{ value: string }>;
    nouns: Array<{ value: string }>;
    adjectives: Array<{ value: string }>;
    factions: Array<{ value: string }>;
  };
}
