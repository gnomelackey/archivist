import { useMemo, useRef, useState } from "react";

import { Input } from "../Input";
import type { TypeaheadOption, TypeaheadProps } from "./types";

export const Typeahead = ({
  options,
  onFocus,
  onTypeChange,
  onSelect,
  ...props
}: TypeaheadProps) => {
  const inputRef = useRef<HTMLDivElement | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<TypeaheadOption | null>(null);
  const [typedValue, setTypedValue] = useState("");

  const filteredOptions = useMemo(() => {
    const shouldFilter = !selected || selected.label !== typedValue;
    if (!shouldFilter) return options;
    const parsedTypedValue = typedValue.toLowerCase();
    return options.filter(({ label }) =>
      label.toLowerCase().includes(parsedTypedValue)
    );
  }, [selected, typedValue, options]);

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

  const handleSelect = (option: TypeaheadOption) => {
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
