import type { Theme } from "./types";

/**
 * How to use the theme colors:
 *
 * 100 - 600: common shades to use throughout the app
 * default: the main brand color
 * bg: solid fills (buttons, chips)
 * fg: text/icons on primary.bg
 * surfaceBg: tinted surfaces (cards, alerts, tooltips)
 * surfaceFg: tinted surface text/icons
 * border: outlines, dividers
 */
const theme: Theme = {
  backgrounds: {
    DEFAULT: '#0B0D12',
  },
  primary: {
    100: "#120F17",
    200: "#1B1623",
    300: "#261E35",
    400: "#372851",
    500: "#4F3A7A",
    600: "#6B50B9",
    DEFAULT: "#4F3A7A",
    bg: "#4F3A7A",
    fg: "#F4F1FF",
    surfaceBg: "#261E35",
    surfaceFg: "#E6E2FF",
    border: "#372851",
  },
  secondary: {
    100: "#120E09",
    200: "#1A160E",
    300: "#271E12",
    400: "#3A2C16",
    500: "#533E18",
    600: "#7A5A17",
    DEFAULT: "#533E18",
    bg: "#533E18",
    fg: "#FFF7ED",
    surfaceBg: "#271E12",
    surfaceFg: "#FFEEDD",
    border: "#3A2C16",
  },
  success: {
    100: "#0A1513",
    200: "#0F221E",
    300: "#153730",
    400: "#1D5249",
    500: "#246E61",
    600: "#2C8A78",
    DEFAULT: "#246E61",
    bg: "#246E61",
    fg: "#F0FFFB",
    surfaceBg: "#153730",
    surfaceFg: "#E6FFFA",
    border: "#1D5249",
  },
  error: {
    100: "#150A10",
    200: "#23121B",
    300: "#3A1B2C",
    400: "#55233F",
    500: "#722A53",
    600: "#96356C",
    DEFAULT: "#722A53",
    bg: "#722A53",
    fg: "#FFF1F7",
    surfaceBg: "#3A1B2C",
    surfaceFg: "#FFE8F2",
    border: "#55233F",
  },
  info: {
    100: "#091017",
    200: "#0D1822",
    300: "#132637",
    400: "#1A3A53",
    500: "#215071",
    600: "#2B6A95",
    DEFAULT: "#215071",
    bg: "#215071",
    fg: "#F1F8FF",
    surfaceBg: "#132637",
    surfaceFg: "#EAF4FF",
    border: "#1A3A53",
  },
};

export default theme;
export type { Theme, Palette, PaletteKey, VariantKey } from "./types";