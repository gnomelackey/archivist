import type { ButtonProps } from "./types";

export const Button = ({
  type = "button",
  className,
  variant = "outline",
  size = "medium",
  mode = "primary",
  children,
  ...props
}: ButtonProps) => {
  const variantClassNames = {
    outline: { primary: "btn-outline-primary", secondary: "btn-outline-secondary" },
    fill: { primary: "btn-fill-primary", secondary: "btn-fill-secondary" },
    text: { primary: "btn-text-primary", secondary: "btn-text-secondary" },
  }[variant][mode];

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
