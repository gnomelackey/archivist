export interface Rectangle {
  id: string;
  label: string;
  originalLabel: string;
  name?: string;
  race?: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
}

export interface Point {
  x: number;
  y: number;
}
