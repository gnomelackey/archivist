export type VariantKey =
  | "primary"
  | "secondary"
  | "success"
  | "error"
  | "info"
  | "backgrounds";

export type PaletteKey =
  | 100
  | 200
  | 300
  | 400
  | 500
  | 600
  | "DEFAULT"
  | "bg"
  | "fg"
  | "surfaceBg"
  | "surfaceFg"
  | "border";

export type Palette = {
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  DEFAULT: string;
  bg: string;
  fg: string;
  surfaceBg: string;
  surfaceFg: string;
  border: string;
};

export type Theme = {
  backgrounds: { DEFAULT: string };
  primary: Palette;
  secondary: Palette;
  success: Palette;
  error: Palette;
  info: Palette;
};
