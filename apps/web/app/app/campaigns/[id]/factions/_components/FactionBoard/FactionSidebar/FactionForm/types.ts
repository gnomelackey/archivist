export type FactionFormFields = {
  id: string;
  name?: string;
  color: string;
  race: string;
  description?: string;
};

export type FactionFormProps = {
  onFactionChange: (faction: FactionFormFields) => void;
  onColorChange: (id: string, color: string) => void;
  onRemove: (id: string) => void;
  onCreate: (name: string, description: string) => void;
  faction: FactionFormFields;
};
