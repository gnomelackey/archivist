import { useMemo } from "react";

export const TextArea = ({
  label,
  ...props
}: { label?: string } & React.TextareaHTMLAttributes<HTMLTextAreaElement>) => {
  const htmlFor = useMemo(
    () => props.id || "TextArea-" + Math.random().toString(36).slice(5),
    [props.id]
  );

  const labelText = label ? (
    <label className="block text-sm font-medium mb-1" htmlFor={htmlFor}>
      {label}
    </label>
  ) : null;

  return (
    <div className="flex flex-col">
      {labelText}
      <textarea
        id={htmlFor}
        className="w-full border border-gray-300 p-2 rounded"
        {...props}
      />
    </div>
  );
};
