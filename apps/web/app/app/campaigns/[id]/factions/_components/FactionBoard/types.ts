interface FactionCardData {
  name: string;
  race: string;
  color: string;
  description?: string;
}

export interface FactionCard {
  id: string;
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
  isTemporary: boolean;
  position: number;
  data: FactionCardData;
}

export interface FactionBoardPoint {
  x: number;
  y: number;
}
