import Chance from "chance";

import type { FactionCard } from "./types";
import { Faction } from "@repo/clients";
import { CoordinateLocationEnum } from "@repo/enums";

const chance = new Chance();

/**
 * Converts screen coordinates to world coordinates by subtracting pan offset
 * @param screenX - The x coordinate in screen space
 * @param screenY - The y coordinate in screen space
 * @param panOffset - The current pan offset of the viewport
 * @returns World coordinates as {x, y}
 */
export const screenToWorld = (
  screenX: number,
  screenY: number,
  panOffset: { x: number; y: number }
) => ({
  x: screenX - panOffset.x,
  y: screenY - panOffset.y,
});

/**
 * Converts world coordinates to screen coordinates by adding pan offset
 * @param worldX - The x coordinate in world space
 * @param worldY - The y coordinate in world space
 * @param panOffset - The current pan offset of the viewport
 * @returns Screen coordinates as {x, y}
 */
export const worldToScreen = (
  worldX: number,
  worldY: number,
  panOffset: { x: number; y: number }
) => ({
  x: worldX + panOffset.x,
  y: worldY + panOffset.y,
});

/**
 * Gets mouse position in both screen and world coordinates from a React mouse event
 * @param event - React mouse event from canvas interaction
 * @param canvas - The HTML canvas element
 * @param panOffset - The current pan offset of the viewport
 * @returns Object containing screen and world coordinates, or null if canvas is unavailable
 */
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

/**
 * Generates a unique random hex color that hasn't been used before
 * @param usedColors - Array of hex color strings that have already been used
 * @returns A unique hex color string
 */
export const getUniqueRandomColor = (usedColors: string[]): string => {
  let newColor: string;

  do {
    newColor = chance.color({ format: "hex" });
  } while (usedColors.includes(newColor));

  return newColor;
};

/**
 * Truncates text to fit within a specified width, adding ellipsis if needed
 * @param ctx - Canvas 2D rendering context for text measurement
 * @param text - The text to display
 * @param width - The maximum width available for the text
 * @returns Truncated text with ellipsis if necessary, original text if it fits
 */
export const getFactionDisplayText = (
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

/**
 * Checks if a faction card has been modified compared to its original faction data
 * @param faction - The current faction card to check
 * @param original - The original faction data to compare against
 * @returns True if the faction has been changed, false otherwise
 */
export const hasFactionChanged = (
  faction: FactionCard,
  original?: Faction
): boolean => {
  if (!faction.data) return false;
  if (!original) return true;

  const {
    name,
    color,
    race,
    description,
    resources = [],
    goals = [],
  } = faction.data;

  const {
    name: originalName,
    color: originalColor,
    race: originalRace,
    description: originalDescription,
    resources: originalResources = [],
    goals: originalGoals = [],
  } = original;

  return (
    name !== originalName ||
    color !== originalColor ||
    race !== originalRace ||
    description !== originalDescription ||
    resources.length !== originalResources?.length ||
    goals.length !== originalGoals?.length ||
    resources.some((r) => originalResources?.every((o) => o?.id !== r.id)) ||
    goals.some((g) => originalGoals?.every((o) => o?.id !== g.id))
  );
};

/**
 * Creates a faction card from faction data with proper canvas text measurement
 * @param ctx - Canvas 2D rendering context for text measurement
 * @param faction - The faction data to build a card from
 * @param position - The position/index of this card in the collection
 * @returns A complete FactionCard object ready for rendering
 * @throws Error if ctx, faction, or faction coordinates are missing
 */
export const buildFactionCard = (
  ctx: CanvasRenderingContext2D | null,
  faction: Faction,
  position: number
): FactionCard => {
  if (!ctx) throw new Error("Canvas context is required to build faction card");
  if (!faction) throw new Error("Faction is required to build faction card");

  const coords = faction.coordinates?.[0];
  if (!coords) throw new Error("Faction must have coordinates");

  const id = faction.id;
  const hidden = false;
  const isModified = false;
  const fullname = `${faction.name} (${faction.race})`;
  const label = getFactionDisplayText(ctx, fullname, coords.width);

  const resources =
    faction.resources?.map((r) => ({
      id: r!.id,
      value: r!.id,
      label: r!.value,
    })) ?? [];

  const goals =
    faction.goals?.map((g) => ({
      id: g!.id,
      value: g!.id,
      label: g!.value,
    })) ?? [];

  const data = {
    name: faction.name,
    color: faction.color,
    race: faction.race,
    description: faction.description ?? "",
    resources,
    goals,
  };

  return { ...coords, id, label, data, position, hidden, isModified };
};

/**
 * Creates a temporary faction card for drawing operations with generated seed data
 * @param ctx - Canvas 2D rendering context for text measurement
 * @param x - X coordinate for the card
 * @param y - Y coordinate for the card
 * @param width - Width of the card
 * @param height - Height of the card
 * @param color - Hex color for the card
 * @param position - The position/index of this card in the collection
 * @param seeds - Object containing seed values for name generation
 * @returns A temporary FactionCard object marked as temporary
 * @throws Error if ctx is missing
 */
export const buildTemporaryFactionCard = (
  ctx: CanvasRenderingContext2D | null,
  x: number,
  y: number,
  width: number,
  height: number,
  color: string,
  position: number,
  seeds: {
    noun: string;
    faction: string;
    adjective: string;
    race: string;
  }
): FactionCard => {
  if (!ctx) throw new Error("Canvas context is required to build faction card");

  const id = `temp-${Date.now()}`;
  const hidden = false;
  const isModified = false;
  const name = `${seeds.faction} of the ${seeds.adjective} ${seeds.noun}`;
  const fullname = `${seeds.faction} of the ${seeds.adjective} ${seeds.noun} (${seeds.race})`;
  const label = getFactionDisplayText(ctx, fullname, width);

  const data = { name, color, race: seeds.race, description: "" };
  const coords = { x, y, width, height };

  return { ...coords, data, id, label, position, hidden, isModified };
};

/**
 * Normalizes a hex color string to standard 6-character uppercase format
 * @param hex - Hex color string with or without # prefix, 3 or 6 characters
 * @returns Normalized hex color string in format #RRGGBB
 * @throws Error if the hex string is invalid
 */
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

/**
 * Converts a hex color string to RGB values
 * @param hex - Hex color string in any valid format
 * @returns RGB object with r, g, b properties (0-255 range)
 */
function hexToRgb(hex: string) {
  const h = normalizeHex(hex).slice(1);

  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}

/**
 * Converts sRGB color value to linear color space for luminance calculation
 * @param c - Color value in sRGB space (0-255)
 * @returns Linear color value (0-1 range)
 */
function srgbToLinear(c: number) {
  const cs = c / 255;

  return cs <= 0.04045 ? cs / 12.92 : Math.pow((cs + 0.055) / 1.055, 2.4);
}

/**
 * Calculates the relative luminance of an RGB color using WCAG formula
 * @param rgb - RGB color object with r, g, b properties
 * @returns Relative luminance value (0-1 range)
 */
function luminance({ r, g, b }: { r: number; g: number; b: number }) {
  const R = srgbToLinear(r),
    G = srgbToLinear(g),
    B = srgbToLinear(b);

  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

/**
 * Calculates the contrast ratio between two hex colors
 * @param a - First hex color string
 * @param b - Second hex color string
 * @returns Contrast ratio (1:1 to 21:1 range)
 */
function contrastRatioHex(a: string, b: string) {
  const L1 = luminance(hexToRgb(a));
  const L2 = luminance(hexToRgb(b));
  const [hi, lo] = L1 >= L2 ? [L1, L2] : [L2, L1];

  return (hi + 0.05) / (lo + 0.05);
}

/**
 * Determines the best contrasting text color (white or black) for a given background color
 * @param hex - Background hex color string
 * @param minRatio - Minimum acceptable contrast ratio (default: 4.5 for WCAG AA compliance)
 * @returns "#FFF" for white text or "#000" for black text
 */
export function getContrastTextColor(hex: string, minRatio = 4.5) {
  const shouldBeContrastWhite = contrastRatioHex(hex, "#FFF") >= minRatio;
  return shouldBeContrastWhite ? "#FFF" : "#000";
}

/**
 * Maps a faction card to a faction object structure for API operations
 * @param faction - The faction card to convert
 * @returns Object containing faction data formatted for backend operations
 */
export const handleFactionMapping = (faction: FactionCard) => ({
  name: faction.data.name,
  race: faction.data.race,
  description: faction.data.description,
  color: faction.data.color,
  descriptors: [
    ...(faction.data.resources?.map((r) => r.id) || []),
    ...(faction.data.goals?.map((g) => g.id) || []),
  ],
  coordinates: {
    x: faction.x,
    y: faction.y,
    width: faction.width,
    height: faction.height,
    location: CoordinateLocationEnum.FACTION_BOARD,
  },
});
