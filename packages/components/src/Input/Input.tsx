import { useMemo } from "react";

import type { InputProps } from "./types";

export const Input = ({ label, className, variant = "outline", ...props }: InputProps) => {
  const variantClassName = {
    fill: "input-fill",
    outline: "input-outline",
  }[variant];

  const classes = className ?? `w-full p-2 rounded`;

  const htmlFor = useMemo(
    () => props.id || "input-" + Math.random().toString(36).slice(5),
    [props.id]
  );

  const labelText = label ? (
    <label className="text-palette-100 mb-1 text-lg font-semibold" htmlFor={htmlFor}>
      {label}
    </label>
  ) : null;

  return (
    <div className={`flex flex-col ${variantClassName}`}>
      {labelText}
      <input type="text" id={htmlFor} className={classes} {...props} />
    </div>
  );
};
