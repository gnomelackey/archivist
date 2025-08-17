import Palette from "@repo/theme/palette";

import { HideIcon } from "./Icons/HideIcon";
import { ShowIcon } from "./Icons/ShowIcon";
import { DeleteIcon } from "./Icons/DeleteIcon";

import type { IconographyProps } from "./types";

/**
 * This component renders different icons based on the `name` prop.
 * @param name - The name of the icon to render.
 * @param size - size of the icon in rem
 * @returns JSX Element representing the requested icon
 */
export const Iconography = ({ name, color = 100, ...props }: IconographyProps) => {
  const Icon = {
    "show": ShowIcon,
    "hide": HideIcon,
    "delete": DeleteIcon,
  }[name];

  const themeColor = Palette[color];

  return <Icon color={themeColor} {...props} />;
};
