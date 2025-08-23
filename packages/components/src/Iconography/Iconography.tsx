import Theme from "@repo/theme";

import { AddIcon } from "./Icons/AddIcon";
import { HideIcon } from "./Icons/HideIcon";
import { ShowIcon } from "./Icons/ShowIcon";
import { SkullIcon } from "./Icons/SkullIcon";
import { ClearIcon } from "./Icons/ClearIcon";
import { SaveIcon } from "./Icons/SaveIcon";
import { BannerCheckIcon } from "./Icons/BannerCheckIcon";
import { BannerMinusIcon } from "./Icons/BannerMinusIcon";
import { SearchIcon } from "./Icons/SearchIcon";

import type { IconographyProps } from "./types";

/**
 * This component renders different icons based on the `name` prop.
 * @param name - The name of the icon to render.
 * @param size - size of the icon in rem
 * @returns JSX Element representing the requested icon
 */
export const Iconography = ({
  name,
  variant = "primary",
  color = "DEFAULT",
  ...props
}: IconographyProps) => {
  const Icon = {
    add: AddIcon,
    bannerCheck: BannerCheckIcon,
    bannerMinus: BannerMinusIcon,
    show: ShowIcon,
    hide: HideIcon,
    save: SaveIcon,
    search: SearchIcon,
    skull: SkullIcon,
    clear: ClearIcon,
  }[name];

  const themeVariant = Theme[variant] ?? Theme.primary;
  const themeColor = themeVariant[color as keyof typeof themeVariant];

  return <Icon color={themeColor} {...props} />;
};
