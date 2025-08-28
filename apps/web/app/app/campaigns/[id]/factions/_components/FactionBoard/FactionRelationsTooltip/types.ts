export type FactionRelationsTooltipProp = {
  x: number;
  y: number;
  id: string;
  factionA: string;
  factionB: string;
  onClick: (factionA: string, factionB: string, relationship: "conflict" | "alliance") => void;
};
