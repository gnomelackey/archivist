import { useMemo, useState } from "react";

import type { InputProps } from "./types";
import { IconButton } from "../IconButton";

export const Input = ({
  label,
  className,
  variant = "outline",
  type = "text",
  ...props
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const htmlFor = useMemo(
    () => (label ? `input-${label}` : undefined),
    [label]
  );

  const variantClassName = {
    fill: "input-fill",
    outline: "input-outline",
  }[variant];

  const classes = `w-full p-2 rounded input ${className}`;

  const isPassword = type === "password";
  const passwordType = showPassword ? "text" : "password";
  const inputType = isPassword ? passwordType : type;
  const inputClasses = isPassword ? `${classes} pr-10` : classes;

  const labelText = label ? (
    <label
      className="text-palette-100 mb-1 text-lg font-semibold focus:text-palette-200"
      htmlFor={htmlFor}
    >
      {label}
    </label>
  ) : null;

  const showHideButton = isPassword ? (
    <div className="absolute inset-y-0 right-0 flex items-center pr-2">
    <IconButton
      size={2}
      type="button"
      icon={showPassword ? "hide" : "show"}
      aria-label={showPassword ? "Hide password" : "Show password"}
      onClick={() => setShowPassword(!showPassword)}
    /></div>
  ) : null;

  return (
    <div className={`flex flex-col input-group w-full ${variantClassName}`}>
      {labelText}
      <div className="relative w-full">
        <input
          type={inputType}
          id={htmlFor}
          className={inputClasses}
          {...props}
        />
        {showHideButton}
      </div>
    </div>
  );
};
