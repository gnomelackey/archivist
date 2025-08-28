import type { PaletteKey, VariantKey } from "@repo/theme";

import type { IconProps } from "./Icons/types";

export type IconographyProps = Omit<IconProps, "color"> & {
  color?: PaletteKey;
  name:
    | "add"
    | "alliance"
    | "arrowDown"
    | "arrowLeft"
    | "arrowRight"
    | "arrowUp"
    | "bannerCheck"
    | "bannerMinus"
    | "clear"
    | "conflict"
    | "eye"
    | "hide"
    | "save"
    | "search"
    | "show"
    | "skull";
  variant?: VariantKey;
};
