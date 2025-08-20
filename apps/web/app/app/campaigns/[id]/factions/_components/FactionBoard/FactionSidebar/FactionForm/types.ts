export type FactionFormFields = {
  id: string;
  name?: string;
  color: string;
  race: string;
  description?: string;
};

export type FactionFormProps = {
  onRemove: (id: string) => void;
  onFactionChange: (faction: FactionFormFields) => void;
  onSave: (faction: FactionFormFields) => void;
  faction: FactionFormFields;
};
