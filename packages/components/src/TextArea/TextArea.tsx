import { useMemo } from "react";

import type { TextAreaProps } from "./types";

export const TextArea = ({
  label,
  variant = "outline",
  className = "",
  fullWidth = false,
  ...props
}: TextAreaProps) => {
  const htmlFor = useMemo(
    () => (label ? `textarea-${label}` : undefined),
    [label]
  );

  const variantClasses = {
    fill: "field-fill",
    outline: "field-outline",
  }[variant];

  const fullWidthClass = fullWidth ? 'w-full' : '';
  const classes = `p-2 rounded textarea ${fullWidthClass} ${className}`;

  const labelText = label ? (
    <label
      className="text-palette mb-1 text-lg font-semibold focus:text-palette-500"
      htmlFor={htmlFor}
    >
      {label}
    </label>
  ) : null;

  return (
    <div className={`flex flex-col field-group ${fullWidthClass} ${variantClasses}`}>
      {labelText}
      <textarea id={htmlFor} className={classes} {...props} />
    </div>
  );
};
