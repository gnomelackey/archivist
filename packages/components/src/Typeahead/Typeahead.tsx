import { useMemo, useRef, useState } from "react";

import { Input } from "../Input";
import type { InputProps } from "../Input/types";

export const Typeahead = ({
  options,
  onFocus,
  onTypeChange,
  onSelect,
  ...props
}: {
  options: Array<{ id: string; label: string; value: any }>;
  onSelect?: (option: { id: string; label: string; value: any }) => void;
  onTypeChange?: (ev: React.ChangeEvent<HTMLInputElement>) => void;
} & InputProps) => {
  const inputRef = useRef<HTMLDivElement | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<{
    id: string;
    label: string;
    value: any;
  } | null>(null);
  const [typedValue, setTypedValue] = useState("");

  const filteredOptions = useMemo(
    () =>
      !selected || selected.label !== typedValue
        ? options.filter((option) =>
            option.label.toLowerCase().includes(typedValue.toLowerCase())
          )
        : options,
    [selected, typedValue, options]
  );

  const showOptions = isOpen && filteredOptions.length > 0;
  const showEmptyMessage = isOpen && !showOptions;

  const handleFocus = (ev: React.FocusEvent<HTMLInputElement>) => {
    onFocus?.(ev);
    setIsOpen(true);
  };

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    onTypeChange?.(ev);
    setTypedValue(ev.target.value);
  };

  const handleSelect = (option: { id: string; label: string; value: any }) => {
    setIsOpen(false);
    onSelect?.(option);
    setSelected(option);
    setTypedValue(option.label);
  };

  return (
    <div ref={inputRef}>
      <Input
        {...props}
        onFocus={handleFocus}
        onChange={handleChange}
        value={typedValue}
      />
      {showOptions ? (
        <ul className="bg-palette-100 border border-palette-200 rounded mt-1 max-h-60 overflow-y-auto">
          {filteredOptions.map((option) => {
            const parts = option.label.split(
              new RegExp(`(${typedValue})`, "i")
            );

            const highlightedLabel = parts.map((part, index) =>
              part.toLowerCase() === typedValue.toLowerCase() ? (
                <strong key={index} className="text-palette-200">
                  {part}
                </strong>
              ) : (
                <span key={index}>{part}</span>
              )
            );

            return (
              <li
                key={option.id}
                className="p-2 hover:cursor-pointer hover:bg-palette-500 hover:text-palette-100"
              >
                <button 
                  type="button" 
                  onClick={() => handleSelect(option)}
                  className="w-full text-left"
                >
                  {highlightedLabel}
                </button>
              </li>
            );
          })}
        </ul>
      ) : showEmptyMessage ? (
        <div className="bg-palette-100 border border-palette-200 rounded mt-1 p-2">
          No options found
        </div>
      ) : null}
    </div>
  );
};
