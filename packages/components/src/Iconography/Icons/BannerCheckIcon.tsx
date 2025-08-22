import Palette from "@repo/theme/palette";

import type { IconProps } from "./types";

/**
 * Vectors and icons by <a href="https://www.svgrepo.com/author/Bootstrap" target="_blank">Bootstrap</a> in MIT License via <a href="https://www.svgrepo.com/" target="_blank">SVG Repo</a>
 * @param size - size of the icon in rem
 * @param color - color of the icon
 * @returns JSX Element representing the Banner Check icon
 */
export const BannerCheckIcon = ({
  size = 1,
  color = Palette[100],
}: IconProps) => (
  <svg
    width={`${size}rem`}
    height={`${size}rem`}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    fill={color}
  >
    <path
      fillRule="evenodd"
      d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5zm8.854-9.646a.5.5 0 0 0-.708-.708L7.5 7.793 6.354 6.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"
    />
  </svg>
);
