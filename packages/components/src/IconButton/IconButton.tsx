import { Iconography } from "../Iconography";
import type { IconButtonProps } from "./types";

export const IconButton = ({ size, icon, color, className, ...props }: IconButtonProps) => {
  return (
    <button
      className={`flex items-center justify-center border-0 hover:border-0 focus:outline-none background-transparent cursor-pointer ${className}`}
      {...props}
    >
      <Iconography size={size} name={icon} color={color} />
    </button>
  );
};
