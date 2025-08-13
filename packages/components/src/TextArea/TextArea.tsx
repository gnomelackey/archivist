import { useMemo } from "react";

import type { TextAreaProps } from "./types";

export const TextArea = ({
  label,
  variant = "outline",
  className,
  ...props
}: TextAreaProps) => {
  const htmlFor = useMemo(
    () => (label ? `input-${label}` : undefined),
    [label]
  );

  const variantClasses = {
    fill: "textarea-fill",
    outline: "textarea-outline",
  }[variant];

  const classes = className ?? `w-full p-2 rounded textarea`;

  const labelText = label ? (
    <label
      className="text-palette-100 mb-1 text-lg font-semibold focus:text-palette-200"
      htmlFor={htmlFor}
    >
      {label}
    </label>
  ) : null;

  return (
    <div className={`flex flex-col textarea-group ${variantClasses}`}>
      {labelText}
      <textarea id={htmlFor} className={classes} {...props} />
    </div>
  );
};
