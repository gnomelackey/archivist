import type { ButtonProps } from "./types";

const btnClasses = [
  "bg-transparent",
  "hover:bg-blue-500",
  "text-blue-700",
  "font-semibold",
  "hover:text-white",
  "py-1",
  "px-2",
  "border",
  "border-blue-500",
  "hover:border-transparent",
  "hover:cursor-pointer",
  "rounded",
].join(" ");

export const Button = ({
  type = "button",
  className = "",
  children,
  ...props
}: ButtonProps) => {
  const buttonClass = className ? `${className} ${btnClasses}` : btnClasses;

  return (
    <button className={buttonClass} type={type} {...props}>
      {children}
    </button>
  );
};
