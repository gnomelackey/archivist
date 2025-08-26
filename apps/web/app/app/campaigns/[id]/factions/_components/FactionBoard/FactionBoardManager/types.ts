import type { FactionCard } from "../types";

export interface FactionBoardManagerConfig {
  canvas: HTMLCanvasElement;
  onDrawingComplete?: (card: FactionCard) => void;
}