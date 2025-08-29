import type { MultiselectOption } from "@repo/components";

interface FactionCardData {
  name: string;
  race: string;
  color: string;
  description?: string;
  goals?: Array<MultiselectOption>;
  resources?: Array<MultiselectOption>;
}

export interface FactionCard {
  id: string;
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
  isModified: boolean;
  hidden: boolean;
  position: number;
  data: FactionCardData;
}
export interface FactionBoardPoint {
  start?: { x: number; y: number } | null;
  x: number;
  y: number;
}
