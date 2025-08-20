export interface FactionCard {
  id: string;
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
  data: {
    name: string;
    race: string;
    color: string;
    description?: string;
  }
}

export interface FactionBoardPoint {
  x: number;
  y: number;
}
