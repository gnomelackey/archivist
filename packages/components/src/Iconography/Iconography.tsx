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
import { ArrowIcon } from "./Icons/ArrowIcon";
import { IconProps } from "./Icons/types";
import { ConflictIcon } from "./Icons/ConflictIcon";
import { AllianceIcon } from "./Icons/AllianceIcon";

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
    alliance: AllianceIcon,
    arrowDown: ArrowIcon,
    arrowLeft: ({ ...props }: IconProps) => (
      <ArrowIcon {...props} rotate="270deg" />
    ),
    arrowRight: ({ ...props }: IconProps) => (
      <ArrowIcon {...props} rotate="90deg" />
    ),
    arrowUp: ({ ...props }: IconProps) => (
      <ArrowIcon {...props} rotate="180deg" />
    ),
    bannerCheck: BannerCheckIcon,
    bannerMinus: BannerMinusIcon,
    clear: ClearIcon,
    conflict: ConflictIcon,
    hide: HideIcon,
    save: SaveIcon,
    search: SearchIcon,
    show: ShowIcon,
    skull: SkullIcon,
  }[name];

  const themeVariant = Theme[variant] ?? Theme.primary;
  const themeColor = themeVariant[color as keyof typeof themeVariant];

  return <Icon color={themeColor} {...props} />;
};
