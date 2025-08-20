import type { InputProps } from "../Input/types";

export type TypeaheadOption = {
  id: string;
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
};

export type TypeaheadProps = {
  value?: TypeaheadOption | null;
  options: TypeaheadOption[];
  onNew?: (value: string) => void;
  onSelect?: (option: TypeaheadOption) => void;
  onFocus?: (ev: React.FocusEvent<HTMLInputElement>) => void;
  onTypeChange?: (ev: React.ChangeEvent<HTMLInputElement>) => void;
} & Omit<InputProps, 'onSelect' | 'onFocus' | 'value'>;
