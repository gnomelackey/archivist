import { useCallback, useEffect, useMemo, useState } from "react";

import { Input } from "../Input";
import type { TypeaheadOption, TypeaheadProps } from "./types";
import { Iconography } from "../Iconography";
import { useOnClickOutside } from "@repo/hooks";

export const Typeahead = ({
  value,
  options,
  onFocus,
  onTypeChange,
  onSelect,
  onNew,
  ...props
}: TypeaheadProps) => {
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

  const hasOptions = filteredOptions.length > 0;
  const showAddNew = isOpen && !hasOptions && typedValue?.length > 0;
  const showEmptyMessage = isOpen && !hasOptions;

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

  const handleNew = useCallback(() => {
    onNew?.(typedValue);
    setIsOpen(false);
  }, [onNew, typedValue]);

  useEffect(() => {
    setTypedValue(value?.label ?? "");
    setSelected(value ?? null);
  }, [value]);

  const { inputRef } = useOnClickOutside<HTMLDivElement>({
    callback: () => setIsOpen(false),
  });

  return (
    <div ref={inputRef} className="relative">
      <Input
        {...props}
        onFocus={handleFocus}
        onChange={handleChange}
        value={typedValue}
        icon={{ name: isOpen ? "arrowUp" : "arrowDown" }}
      />
      {isOpen ? (
        <ul
          className="bg-primary-200 border border-primary rounded mt-1 max-h-60 overflow-y-auto absolute w-full z-10"
          style={{ top: "100%" }}
        >
          {showAddNew ? (
            <li className="text-primary-500 hover:bg-primary-500 hover:text-primary-100 mb-0!">
              <button
                type="button"
                onClick={handleNew}
                className="bold w-full p-2 text-left hover:cursor-pointer flex items-center gap-1 [&>svg>path]:fill-primary-500 hover:[&>svg>path]:fill-primary-100"
              >
                <Iconography name="add" size={1.25} />
                <span>New</span>
              </button>
            </li>
          ) : null}
          {showEmptyMessage ? (
            <li className="text-primary-100 bg-primary-500">
              <p className="w-full p-2 text-left">No Results</p>
            </li>
          ) : null}
          {filteredOptions?.map((option) => {
            const parts = option.label.split(
              new RegExp(`(${typedValue})`, "i")
            );

            const highlightedLabel = parts.map((part, index) =>
              part.toLowerCase() === typedValue.toLowerCase() ? (
                <strong key={index} className="text-secondary-600">
                  {part}
                </strong>
              ) : (
                <span key={index}>{part}</span>
              )
            );

            return (
              <li
                key={option.id}
                className="text-primary-fg hover:bg-primary-500 hover:text-primary-fg"
              >
                <button
                  type="button"
                  onClick={() => handleSelect(option)}
                  className="w-full p-2 text-left hover:cursor-pointer"
                >
                  {highlightedLabel}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
};
