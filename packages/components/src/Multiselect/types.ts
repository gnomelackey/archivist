import type { InputProps } from "../Input/types";

export type MultiselectOption = {
  id: string;
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
};

export type MultiselectProps = {
  value?: Array<MultiselectOption> | null;
  options: MultiselectOption[];
  onNew?: (value: string) => void;
  onSelect?: (option: Array<MultiselectOption>) => void;
  onFocus?: (ev: React.FocusEvent<HTMLInputElement>) => void;
  onTypeChange?: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  closeOnSelect?: boolean;
} & Omit<InputProps, 'onSelect' | 'onFocus' | 'value'>;
