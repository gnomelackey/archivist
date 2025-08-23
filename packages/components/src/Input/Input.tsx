import { useMemo, useState } from "react";

import type { InputProps } from "./types";
import { Adornment } from "./Adornment";

export const Input = ({
  label,
  className = "",
  variant = "outline",
  type = "text",
  fullWidth = true,
  icon,
  ...props
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const htmlFor = useMemo(
    () => (label ? `input-${label}` : undefined),
    [label]
  );

  const variantClassName = {
    fill: "field-fill",
    outline: "field-outline",
  }[variant];

  const fullWidthClass = fullWidth ? "w-full" : "";
  const fieldPopulatedClass = props.value ? "field-populated" : "";
  const classes = `${fullWidthClass} p-2 rounded input ${fieldPopulatedClass} ${className}`;

  const isPassword = type === "password";
  const hasIcon = Boolean(isPassword || icon);
  const passwordType = showPassword ? "text" : "password";
  const inputType = isPassword ? passwordType : type;
  const inputClasses = hasIcon ? `pr-11! ${classes}` : classes;

  const labelText = label ? (
    <label
      className="text-primary mb-1 text-lg font-semibold focus:text-primary"
      htmlFor={htmlFor}
    >
      {label}
    </label>
  ) : null;

  return (
    <div
      className={`flex flex-col field-group ${fullWidthClass} ${variantClassName}`}
    >
      {labelText}
      <div className={`relative ${fullWidthClass}`}>
        <input
          type={inputType}
          id={htmlFor}
          className={inputClasses}
          {...props}
        />
        <Adornment
          button={isPassword}
          icon={icon}
          show={showPassword}
          setShow={setShowPassword}
        />
      </div>
    </div>
  );
};
