import type { IconographyProps } from "../Iconography/types";

export type IconButtonProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'> & {
  icon: IconographyProps["name"];
  size?: IconographyProps["size"];
  color?: IconographyProps["color"];
  onClick?: () => void;
  className?: string;
};
