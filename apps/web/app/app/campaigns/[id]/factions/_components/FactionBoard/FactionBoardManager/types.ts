import type { FactionCard } from "../types";

export interface FactionBoardManagerConfig {
  canvas: HTMLCanvasElement;
  onCardHover?: (card: FactionCard | null) => void;
  onDrawingComplete?: (card: FactionCard) => void;
}