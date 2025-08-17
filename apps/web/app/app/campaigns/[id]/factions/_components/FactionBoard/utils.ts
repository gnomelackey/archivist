import Chance from "chance";

const chance = new Chance();

export const getUniqueRandomColor = (usedColors: string[]): string => {
  let newColor: string;

  do {
    newColor = chance.color({ format: "hex" });
  } while (usedColors.includes(newColor));

  return newColor;
};
