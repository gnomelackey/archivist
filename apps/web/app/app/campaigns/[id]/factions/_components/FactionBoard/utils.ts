import Chance from "chance";

import type { Rectangle } from "./types";

const chance = new Chance();

export const screenToWorld = (
  screenX: number,
  screenY: number,
  panOffset: { x: number; y: number }
) => ({
  x: screenX - panOffset.x,
  y: screenY - panOffset.y,
});

export const worldToScreen = (
  worldX: number,
  worldY: number,
  panOffset: { x: number; y: number }
) => ({
  x: worldX + panOffset.x,
  y: worldY + panOffset.y,
});

export const getMousePosition = (
  event: React.MouseEvent<HTMLCanvasElement>,
  canvas: HTMLCanvasElement,
  panOffset: { x: number; y: number }
) => {
  if (!canvas) return null;

  const rect = canvas.getBoundingClientRect();
  const screenX = event.clientX - rect.left;
  const screenY = event.clientY - rect.top;

  return {
    screen: { x: screenX, y: screenY },
    world: screenToWorld(screenX, screenY, panOffset),
  };
};

export const getUniqueRandomColor = (usedColors: string[]): string => {
  let newColor: string;

  do {
    newColor = chance.color({ format: "hex" });
  } while (usedColors.includes(newColor));

  return newColor;
};

const getFactionDisplayText = (
  ctx: CanvasRenderingContext2D,
  text: string,
  width: number
): string => {
  const maxWidth = width - 18;

  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.font = "16px sans-serif";

  let displayText = text;

  if (ctx.measureText(text).width > maxWidth) {
    const ellipsis = "...";
    const ellipsisWidth = ctx.measureText(ellipsis).width;
    const availableWidth = maxWidth - ellipsisWidth;

    let start = 0;
    let end = text.length;
    let bestFit = "";

    while (start <= end) {
      const mid = Math.floor((start + end) / 2);
      const testText = text.substring(0, mid);
      const testWidth = ctx.measureText(testText).width;

      if (testWidth <= availableWidth) {
        bestFit = testText;
        start = mid + 1;
      } else {
        end = mid - 1;
      }
    }

    displayText = bestFit + ellipsis;
  }

  ctx.restore();

  return displayText;
};

export const generateRectangleLabels = (
  ctx: CanvasRenderingContext2D | null,
  width: number,
  seeds: Rectangle["data"]
): { originalLabel: string; label: string } => {
  if (!ctx) throw new Error("Canvas context is required to build rectangle");

  const name = `${seeds.faction} of the ${seeds.adjective} ${seeds.noun}`;
  const nameWithRace = `${name} (${seeds.race})`;

  return {
    originalLabel: nameWithRace,
    label: getFactionDisplayText(ctx, nameWithRace, width),
  };
};

export const buildRectangle = (
  ctx: CanvasRenderingContext2D | null,
  x: number,
  y: number,
  width: number,
  height: number,
  color: string,
  seeds: Rectangle["data"]
): Rectangle => {
  if (!ctx) throw new Error("Canvas context is required to build rectangle");

  const id = `temp-${Date.now()}`;

  const { label, originalLabel } = generateRectangleLabels(ctx, width, seeds);

  const data = {
    noun: seeds.noun,
    faction: seeds.faction,
    adjective: seeds.adjective,
    race: seeds.race,
  };

  return {
    data,
    color,
    id,
    x,
    y,
    width,
    height,
    originalLabel,
    label,
  };
};

function normalizeHex(hex: string) {
  let h = hex.trim().replace(/^#/, "");

  if (h.length === 3) {
    h = h
      .split("")
      .map((c) => c + c)
      .join("");
  }

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
