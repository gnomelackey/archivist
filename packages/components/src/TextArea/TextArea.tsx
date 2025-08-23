import { useMemo } from "react";

import type { TextAreaProps } from "./types";

export const TextArea = ({
  label,
  variant = "outline",
  className = "",
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

  const classes = `w-full p-2 rounded textarea ${className}`;

  const labelText = label ? (
    <label
      className="text-palette mb-1 text-lg font-semibold focus:text-palette-500"
      htmlFor={htmlFor}
    >
      {label}
    </label>
  ) : null;

  return (
    <div className={`flex flex-col field-group ${variantClasses}`}>
      {labelText}
      <textarea id={htmlFor} className={classes} {...props} />
    </div>
  );
};
