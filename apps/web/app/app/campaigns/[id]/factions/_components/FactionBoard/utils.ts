import Chance from "chance";

const chance = new Chance();

export const getUniqueRandomColor = (usedColors: string[]): string => {
  let newColor: string;

  do {
    newColor = chance.color({ format: "hex" });
  } while (usedColors.includes(newColor));

  return newColor;
};

function normalizeHex(hex: string) {
  let h = hex.trim().replace(/^#/, "");
  if (h.length === 3)
    h = h
      .split("")
      .map((c) => c + c)
      .join("");
  if (h.length !== 6) throw new Error("Invalid hex: " + hex);
  return "#" + h.toUpperCase();
}

function hexToRgb(hex: string) {
  const h = normalizeHex(hex).slice(1);

  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}

function srgbToLinear(c: number) {
  const cs = c / 255;

  return cs <= 0.04045 ? cs / 12.92 : Math.pow((cs + 0.055) / 1.055, 2.4);
}

function luminance({ r, g, b }: { r: number; g: number; b: number }) {
  const R = srgbToLinear(r),
    G = srgbToLinear(g),
    B = srgbToLinear(b);

  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

function contrastRatioHex(a: string, b: string) {
  const L1 = luminance(hexToRgb(a));
  const L2 = luminance(hexToRgb(b));
  const [hi, lo] = L1 >= L2 ? [L1, L2] : [L2, L1];

  return (hi + 0.05) / (lo + 0.05);
}

export function getContrastTextColor(hex: string, minRatio = 4.5) {
  const shouldBeContrastWhite = contrastRatioHex(hex, "#FFF") >= minRatio;
  return shouldBeContrastWhite ? "#FFF" : "#000";
}
