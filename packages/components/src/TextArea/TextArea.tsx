import { useMemo } from "react";

import type { TextAreaProps } from "./types";

export const TextArea = ({
  label,
  variant = "outline",
  className,
  ...props
}: TextAreaProps) => {
  const variantClasses = {
    fill: "textarea-fill",
    outline: "textarea-outline",
  }[variant];

  const classes = className ?? `w-full p-2 rounded`;

  const htmlFor = useMemo(
    () => props.id || "textarea-" + Math.random().toString(36).slice(5),
    [props.id]
  );

  const labelText = label ? (
    <label className="text-palette-100 mb-1 text-lg font-semibold" htmlFor={htmlFor}>
      {label}
    </label>
  ) : null;

  return (
    <div className={`flex flex-col ${variantClasses}`}>
      {labelText}
      <textarea id={htmlFor} className={classes} {...props} />
    </div>
  );
};
