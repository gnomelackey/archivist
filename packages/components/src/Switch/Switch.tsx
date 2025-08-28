import { useState } from "react";

import { IconButton } from "../IconButton";

export const Switch = ({
  leftLabel,
  rightLabel,
  checked = false,
  onChange,
  disabled = false,
  className = "",
  ...props
}: {
  leftLabel: string;
  rightLabel: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
} & Omit<React.HTMLAttributes<HTMLInputElement>, "onChange">) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleToggle = () => {
    if (disabled) return;
    const updatedChecked = !isChecked;
    setIsChecked(updatedChecked);
    onChange?.(updatedChecked);
  };

  const checkboxId = `switch-${leftLabel}-${rightLabel}`;

  return (
    <div className={`flex gap-2 ${disabled ? "disabled" : ""} ${className}`}>
      <label
        htmlFor={checkboxId}
        className={`text-primary-fg switch-label cursor-pointer ${!isChecked ? "selected" : ""}`}
      >
        {leftLabel}
      </label>
      <IconButton
        type="button"
        icon="eye"
        size={1.75}
        className={`switch-toggle ${isChecked ? "switch-right" : "switch-left"}`}
        onClick={handleToggle}
      />
      <label
        htmlFor={checkboxId}
        className={`text-primary-fg switch-label cursor-pointer ${isChecked ? "selected" : ""}`}
      >
        {rightLabel}
      </label>
      <input
        id={checkboxId}
        className="hidden"
        type="checkbox"
        checked={isChecked}
        onChange={handleToggle}
        disabled={disabled}
        {...props}
      />
    </div>
  );
};
