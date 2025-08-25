import { useCallback, useEffect, useMemo, useState } from "react";

import { useOnClickOutside } from "@repo/hooks";

import { Input } from "../Input";
import type { MultiselectOption, MultiselectProps } from "./types";
import { Iconography } from "../Iconography";

export const Multiselect = ({
  value,
  options,
  onFocus,
  onTypeChange,
  onSelect,
  onNew,
  closeOnSelect = false,
  ...props
}: MultiselectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<Array<MultiselectOption>>([]);
  const [typedValue, setTypedValue] = useState("");

  const hasOptions = options.length > 0;
  const showAddNew = isOpen && !hasOptions && typedValue?.length > 0;
  const showEmptyMessage = isOpen && !hasOptions;

  const filteredOptions = useMemo(() => {
    if (!isOpen) return options;
    const parsedTypedValue = typedValue.toLowerCase();
    return options.filter(
      ({ id, label }) =>
        selected?.some((s) => s.id === id) ||
        label.toLowerCase().includes(parsedTypedValue)
    );
  }, [isOpen, typedValue, options, selected]);

  const handleFocus = (ev: React.FocusEvent<HTMLInputElement>) => {
    onFocus?.(ev);
    setTypedValue("");
    setIsOpen(true);
  };

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setTypedValue(selected.map((s) => s.label).join(", "));
  }, [selected]);

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    onTypeChange?.(ev);
    setTypedValue(ev.target.value);
  };

  const handleSelect = useCallback(
    (option: MultiselectOption) => {
      const isAlreadySelected = selected?.some((s) => s.id === option.id);

      const newSelected = isAlreadySelected
        ? (selected?.filter((s) => s.id !== option.id) ?? [])
        : selected
          ? [...selected, option]
          : [option];

      setSelected(newSelected);
      onSelect?.(newSelected);

      if (closeOnSelect) handleClose();
    },
    [onSelect, selected, closeOnSelect, handleClose]
  );

  const { inputRef } = useOnClickOutside<HTMLDivElement>({
    callback: handleClose,
  });

  const handleNew = useCallback(() => {
    onNew?.(typedValue);
    handleClose();
  }, [onNew, typedValue, handleClose]);

  useEffect(() => {
    setTypedValue(value?.map((v) => v.label).join(", ") ?? '');
    setSelected(value ?? []);
  }, [value]);

  const list = useMemo(
    () =>
      filteredOptions?.map((option) => {
        const parts = option.label.split(new RegExp(`(${typedValue})`, "i"));

        const isSelected = Boolean(selected?.some((s) => s.id === option.id));

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
            <div className="flex items-center gap-2 w-full cursor-pointer hover:cursor-pointer">
              <input
                type="checkbox"
                className="ml-4 cursor-pointer hover:cursor-pointer"
                onChange={() => handleSelect(option)}
                checked={isSelected}
              />
              <button
                type="button"
                className="w-full p-2 text-left cursor-pointer hover:cursor-pointer"
                onClick={() => handleSelect(option)}
              >
                {highlightedLabel}
              </button>
            </div>
          </li>
        );
      }),
    [filteredOptions, handleSelect, selected, typedValue]
  );

  return (
    <div ref={inputRef} className="relative">
      {selected?.length ? (
        <div className="absolute left-2 top-2.25 flex rounded-xl items-center justify-center text-xs h-3 w-1 p-3 bg-info-600 text-info-fg">
          {selected.length}
        </div>
      ) : null}
      <Input
        {...props}
        className={`${selected?.length ? "pl-10!" : ""}`}
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
          {list}
        </ul>
      ) : null}
    </div>
  );
};
