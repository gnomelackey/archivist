import { useMemo } from "react";

export const Input = ({
  label,
  ...props
}: { label?: string } & React.InputHTMLAttributes<HTMLInputElement>) => {
  const htmlFor = useMemo(
    () => props.id || "input-" + Math.random().toString(36).slice(5),
    [props.id]
  );

  const labelText = label ? (
    <label className="text-sm font-medium mb-1" htmlFor={htmlFor}>
      {label}
    </label>
  ) : null;

  return (
    <div className="flex flex-col">
      {labelText}
      <input
        type="text"
        id={htmlFor}
        className="w-full border border-gray-300 p-2 rounded"
        {...props}
      />
    </div>
  );
};
