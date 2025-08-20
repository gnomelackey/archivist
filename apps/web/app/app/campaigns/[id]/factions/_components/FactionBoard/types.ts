export interface Rectangle {
  id: string;
  label: string;
  originalLabel: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  data: {
    noun: string;
    faction: string;
    adjective: string;
    race: string;
  }
}

export interface Point {
  x: number;
  y: number;
}
