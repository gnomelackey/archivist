import Palette from "@repo/theme/palette";

import type { IconProps } from "./types";

/**
 * Vectors and icons by <a href="https://github.com/nagoshiashumari/Rpg-Awesome?ref=svgrepo.com" target="_blank">Nagoshiashumari</a> in GPL License via <a href="https://www.svgrepo.com/" target="_blank">SVG Repo</a>
 * @param size - size of the icon in rem
 * @param color - color of the icon
 * @returns JSX Element representing the Save icon
 */
export const SaveIcon = ({ size = 1, color = Palette[100] }: IconProps) => (
  <svg
    fill={color}
    width={`${size}rem`}
    height={`${size}rem`}
    viewBox="0 0 32 32"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M9.467 3.106h3.030c0.266 0 0.482 0.278 0.482 0.621v4.374c0 0.343-0.216 0.621-0.482 0.621h-3.030c-0.266 0-0.482-0.278-0.482-0.621v-4.374c0-0.343 0.216-0.621 0.482-0.621zM21.964 14.524l7.987 7.987h-3.993v7.987h-7.987v-7.987h-3.993l7.987-7.987zM17.422 24.768h-10.309c-0.276 0-0.499-0.223-0.499-0.499v-11.481c0-0.276 0.223-0.499 0.499-0.499h17.721c0.276 0 0.499 0.223 0.499 0.499v4.402l3.12 3.12v-13.262c0-0.276-4.216-4.493-4.493-4.493h-4.741c0.169 0.069 0.287 0.223 0.287 0.404v6.181c0 0.244-0.216 0.442-0.482 0.442h-10.594c-0.266 0-0.482-0.198-0.482-0.442v-6.181c0-0.18 0.118-0.335 0.287-0.404h-4.242c-0.277 0-0.499 0.223-0.499 0.499v23.961c0 0.277 0.223 0.499 0.499 0.499h13.429v-2.746zM26.506 22.903v4.611h1.449c0.277 0 0.499-0.223 0.499-0.499v-4.111l-1.948 0z"></path>
  </svg>
);
