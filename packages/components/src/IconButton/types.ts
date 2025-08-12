import type { IconographyProps } from "../Iconography/types";

export type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: IconographyProps["name"];
  size: IconographyProps["size"];
  onClick?: () => void;
  className?: string;
};
