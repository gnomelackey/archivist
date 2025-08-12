import type { ButtonProps } from "./types";

export const Button = ({
  type = "button",
  className,
  variant = "outline",
  size = "medium",
  children,
  ...props
}: ButtonProps) => {
  const variantClassNames = {
    outline: "btn-outline",
    fill: "btn-fill",
    text: "btn-text",
  }[variant];

  const sizeClassNames = {
    xSmall: "text-xs",
    small: "text-sm",
    medium: "text-base",
    large: "text-lg",
    xLarge: "text-xl",
  }[size];

  const buttonClassNames =
    className ??
    `py-1 px-2 font-semibold hover:cursor-pointer ${variantClassNames} ${sizeClassNames}`;

  return (
    <button className={buttonClassNames} type={type} {...props}>
      {children}
    </button>
  );
};
