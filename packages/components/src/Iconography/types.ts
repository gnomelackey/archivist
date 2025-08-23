import type { PaletteKey, VariantKey } from "@repo/theme";

import type { IconProps } from "./Icons/types";

export type IconographyProps = Omit<IconProps, "color"> & {
  color?: PaletteKey;
  variant?: VariantKey;
  name:
    | "add"
    | "show"
    | "hide"
    | "skull"
    | "clear"
    | "save"
    | "search"
    | "bannerCheck"
    | "bannerMinus";
};
