import type { ButtonProps } from "./types";

export const Button = ({
  type = "button",
  className = '',
  variant = "outline",
  size = "medium",
  mode = "primary",
  children,
  fullWidth = false,
  ...props
}: ButtonProps) => {
  const variantClassNames = {
    outline: {
      primary: "btn-outline-primary",
      secondary: "btn-outline-secondary",
      error: "btn-outline-error",
      success: "btn-outline-success",
      info: "btn-outline-info",
    },
    fill: {
      primary: "btn-fill-primary",
      secondary: "btn-fill-secondary",
      error: "btn-fill-error",
      success: "btn-fill-success",
      info: "btn-fill-info",
    },
    text: {
      primary: "btn-text-primary",
      secondary: "btn-text-secondary",
      error: "btn-text-error",
      success: "btn-text-success",
      info: "btn-text-info",
    },
  }[variant][mode];

  const sizeClassNames = {
    xSmall: "text-xs",
    small: "text-sm",
    medium: "text-base",
    large: "text-lg",
    xLarge: "text-xl",
  }[size];

  const fullWidthClass = fullWidth ? 'w-full' : '';

  const buttonClassNames = `py-1 px-2 font-semibold hover:cursor-pointer hover:opacity-80 ${variantClassNames} ${sizeClassNames} ${fullWidthClass} ${className}`;

  return (
    <button className={buttonClassNames} type={type} {...props}>
      {children}
    </button>
  );
};
