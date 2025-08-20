import Palette from "@repo/theme/palette";

import { AddIcon } from "./Icons/AddIcon";
import { HideIcon } from "./Icons/HideIcon";
import { ShowIcon } from "./Icons/ShowIcon";
import { SkullIcon } from "./Icons/SkullIcon";
import { ClearIcon } from "./Icons/ClearIcon";
import { SaveIcon } from "./Icons/SaveIcon";

import type { IconographyProps } from "./types";

/**
 * This component renders different icons based on the `name` prop.
 * @param name - The name of the icon to render.
 * @param size - size of the icon in rem
 * @returns JSX Element representing the requested icon
 */
export const Iconography = ({
  name,
  color = 100,
  ...props
}: IconographyProps) => {
  const Icon = {
    add: AddIcon,
    show: ShowIcon,
    hide: HideIcon,
    skull: SkullIcon,
    save: SaveIcon,
    clear: ClearIcon,
  }[name];

  const themeColor = Palette[color];

  return <Icon color={themeColor} {...props} />;
};
