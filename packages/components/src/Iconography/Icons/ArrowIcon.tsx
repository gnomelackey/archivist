import Theme from "@repo/theme";

import type { IconProps } from "./types";

type ArrowIconProps = IconProps & { rotate?: '90deg' | '180deg' | '270deg' } ;

/**
 * Vectors and icons by <a href="https://www.svgrepo.com/author/Zest" target="_blank">Zest</a> in MIT License via <a href="https://www.svgrepo.com/" target="_blank">SVG Repo</a>
 * @param size - size of the icon in rem
 * @param color - color of the icon
 * @returns JSX Element representing the Arrow icon
 */
export const ArrowIcon = ({
  size = 1,
  color = Theme.primary.DEFAULT,
  rotate,
}: ArrowIconProps) => (
  <svg
    width={`${size}rem`}
    height={`${size}rem`}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ transform: rotate ? `rotate(${rotate})` : undefined }}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071Z"
      fill={color}
    />
  </svg>
);
