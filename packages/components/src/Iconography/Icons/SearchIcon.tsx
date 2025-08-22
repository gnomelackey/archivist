import Palette from "@repo/theme/palette";

import type { IconProps } from "./types";

/**
 * Vectors and icons by <a href="https://github.com/nagoshiashumari/Rpg-Awesome?ref=svgrepo.com" target="_blank">Nagoshiashumari</a> in GPL License via <a href="https://www.svgrepo.com/" target="_blank">SVG Repo</a>
 * Modified to create a Search icon
 * @param size - size of the icon in rem
 * @param color - color of the icon
 * @returns JSX Element representing the Search icon
 */
export const SearchIcon = ({ size = 1, color = Palette[100] }: IconProps) => (
  <svg
    fill={color}
    width={`${size}rem`}
    height={`${size}rem`}
    viewBox="0 0 32 32"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M26.206 22.25c0.017-0.106 0.026-0.212 0.026-0.319 0-1.038-0.809-1.995-2.168-2.756 3.943-4.34 3.819-11.058-0.371-15.248-4.319-4.319-11.32-4.319-15.639 0-4.191 4.191-4.314 10.908-0.371 15.249-1.359 0.762-2.168 1.718-2.168 2.756 0 0.134 0.014 0.267 0.041 0.399-1.572 0.941-2.501 2.104-2.501 3.363 0 3.137 5.773 5.681 12.894 5.681s12.894-2.543 12.894-5.681c0-1.294-0.982-2.487-2.636-3.442zM8.875 4.774c3.867-3.867 10.136-3.867 14.002 0s3.867 10.136 0 14.002c-1.922 1.922-4.437 2.888-6.956 2.899-1.656-0.005-3.312-0.422-4.799-1.253-0.019 0.003-0.037 0.007-0.056 0.010-0.786-0.437-1.525-0.989-2.192-1.656-3.867-3.867-3.867-10.136 0-14.002zM23.485 9.145c-0.901 0.901-2.775 0.488-4.185-0.923s-1.824-3.285-0.923-4.185c0.901-0.901 2.775-0.488 4.185 0.923s1.824 3.285 0.923 4.185zM17.42 20.262c-1.802 1.802-5.552 0.975-8.374-1.847s-3.649-6.572-1.847-8.374c1.802-1.802 5.552-0.975 8.374 1.847s3.649 6.572 1.847 8.374z"></path>
  </svg>
);
