import type { ButtonProps } from "./types";

const outlinedVariantClasses = `bg-transparent hover:text-btn-palette-200 text-btn-palette-100 font-semibold hover:text-white border text-btn-palette-100 hover:border-transparent rounded`;
const filledVariantClasses = "";
const textVariantClasses = "";

const smallVariantClasses = `p-0.5`;
const mediumVariantClasses = "py-1 px-2";
const largeVariantClasses = "py-2 px-4";

export const Button = ({
  type = "button",
  className,
  variant = "outline",
  size = "medium",
  isLoading = false,
  children,
  ...props
}: ButtonProps) => {
  const variantClassNames = {
    outline: outlinedVariantClasses,
    fill: filledVariantClasses,
    text: textVariantClasses,
  }[variant];

  const sizeClassNames = {
    small: smallVariantClasses,
    medium: mediumVariantClasses,
    large: largeVariantClasses,
  }[size];

  const buttonClassNames =
    className ?? `hover:cursor-pointer ${variantClassNames} ${sizeClassNames}`;

  return (
    <button className={buttonClassNames} type={type} {...props}>
      {children}
    </button>
  );
};
