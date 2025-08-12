import Palette from "@repo/theme/palette";

import type { IconProps } from "./types";

/**
 * Vectors and icons by <a href="https://github.com/nagoshiashumari/Rpg-Awesome?ref=svgrepo.com" target="_blank">Nagoshiashumari</a> in GPL License via <a href="https://www.svgrepo.com/" target="_blank">SVG Repo</a>
 * Modified to create a Hide icon
 * @param size - size of the icon in rem
 * @returns JSX Element representing the Hide icon
 */
export const HideIcon = ({
  size = 1,
  color = Palette[100],
}: IconProps) => (
  <svg
    width={`${size}rem`}
    height={`${size}rem`}
    viewBox="0 0 32 32"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>monster-eye-hide-icon</title>
    <defs>
      <mask id="closed-eye-mask">
        <rect width="32" height="32" fill="white" />
        <path
          d="M10 20 Q 16 24, 22 20"
          fill="none"
          stroke="black"
          strokeWidth="0.8"
          strokeLinecap="round"
        />
      </mask>
    </defs>
    <path
      d="M24.151 22.393c2.386-2.207 3.88-5.364 3.88-8.87 0-6.672-5.409-12.081-12.081-12.081s-12.081 5.409-12.081 12.081c0 3.507 1.495 6.664 3.881 8.871l-0.212 0.014c-1.64 2.829-0.321 5.096 1.55 7.268-0.445-1.827-0.737-3.695 0.445-5.916 0.231 0.145 0.466 0.282 0.707 0.412-0.715 2.631 0.1 4.823 1.695 6.683-0.256-1.69-0.329-3.572 0.501-5.77 0.206 0.063 0.414 0.119 0.624 0.171 0.111 2.251 0.821 4.35 1.753 6.391-0.083-1.985 0.059-3.998 0.569-6.056 0.188 0.009 0.377 0.014 0.567 0.014 0.192 0 0.384-0.005 0.574-0.014 0.511 2.058 0.653 4.071 0.569 6.056 0.932-2.042 1.643-4.141 1.753-6.393 0.21-0.052 0.418-0.109 0.623-0.171 0.831 2.198 0.758 4.081 0.502 5.772 1.596-1.86 2.411-4.053 1.694-6.686 0.24-0.129 0.476-0.267 0.706-0.412 1.185 2.223 0.892 4.091 0.447 5.919 1.871-2.172 3.189-4.439 1.55-7.268l-0.219-0.014z"
      fill={color}
      mask="url(#closed-eye-mask)"
    />
  </svg>
);
