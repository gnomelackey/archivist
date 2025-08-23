import Theme from "@repo/theme";

import type { IconProps } from "./types";

/**
 * Vectors and icons by <a href="https://www.svgrepo.com/author/Bootstrap" target="_blank">Bootstrap</a> in MIT License via <a href="https://www.svgrepo.com/" target="_blank">SVG Repo</a>
 * @param size - size of the icon in rem
 * @param color - color of the icon
 * @returns JSX Element representing the Banner Minus icon
 */
export const BannerMinusIcon = ({
  size = 1,
  color = Theme.primary.DEFAULT,
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
      d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5zM6 6a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1H6z"
    />
  </svg>
);
