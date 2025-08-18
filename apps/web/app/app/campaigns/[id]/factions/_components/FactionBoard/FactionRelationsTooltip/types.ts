export type FactionRelationsTooltipProp = {
  x: number;
  y: number;
  id: string;
  onClick: (id: string, relationship: "conflict" | "alliance") => void;
};
