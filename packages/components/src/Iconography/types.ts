import Palette from "@repo/theme/palette";

import type { IconProps } from "./Icons/types";

export type IconographyProps = Omit<IconProps, "color"> & {
  color?: keyof typeof Palette;
  name: "show" | "hide" | "delete";
};
