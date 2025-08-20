export interface Rectangle {
  id: string;
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  data: {
    name: string;
    race: string;
  }
}

export interface Point {
  x: number;
  y: number;
}
