import React, { useState, ChangeEvent } from "react";

import {
  Iconography,
  Input,
  MultiselectOption,
  TextArea,
  TypeaheadOption,
} from "@repo/components";

import type { FactionFormProps } from "./types";
import { SaveButton } from "./SaveButton";
import { RemoveButton } from "./RemoveButton";
import { SeedTypeAhead } from "./SeedTypeAhead";
import { SeedMultiselect } from "./SeedMultiselect";

export const FactionForm = ({
  faction,
  onRemove,
  onChange,
}: FactionFormProps) => {
  const [name, setName] = useState(faction.data.name);
  const [description, setDescription] = useState(faction.data.description);

  const handleChangeName = (ev: ChangeEvent<HTMLInputElement>) => {
    setName(ev.target.value);
  };

  const handleDescriptionChange = (ev: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(ev.target.value);
  };

  const handleColorChange = (ev: ChangeEvent<HTMLInputElement>) => {
    onChange({ ...faction, data: { ...faction.data, color: ev.target.value } });
  };

  const handleChangeRace = (option: TypeaheadOption) => {
    onChange({ ...faction, data: { ...faction.data, race: option.label } });
  };

  const handleResourceChange = (options: Array<MultiselectOption>) => {
    onChange({ ...faction, data: { ...faction.data, resources: options } });
  };

  const handleGoalChange = (options: Array<MultiselectOption>) => {
    onChange({ ...faction, data: { ...faction.data, goals: options } });
  };

  const handleTextInputBlur = () => {
    onChange({ ...faction, data: { ...faction.data, name, description } });
  };

  return (
    <form className="flex flex-col gap-2">
      <div className="flex flex-1 gap-2">
        <Input
          placeholder="Faction Name"
          value={name ?? ""}
          onChange={handleChangeName}
          onBlur={handleTextInputBlur}
        />
        <SeedTypeAhead
          faction={faction}
          onChange={handleChangeRace}
          type="race"
          placeholder="Race"
          fullWidth={false}
          className="w-30"
        />
      </div>
      <TextArea
        placeholder="Description"
        rows={2}
        value={description ?? ""}
        onChange={handleDescriptionChange}
        onBlur={handleTextInputBlur}
      />
      <SeedMultiselect
        placeholder="Add a Faction Resource..."
        type="resource"
        faction={faction}
        onChange={handleResourceChange}
      />
      <SeedMultiselect
        placeholder="Add a Faction Goal..."
        type="goal"
        faction={faction}
        onChange={handleGoalChange}
      />
      <div className="flex gap-2 items-center">
        {!faction.isModified ? (
          <Iconography name="bannerCheck" size={1.75} variant="success" />
        ) : (
          <Iconography
            name="bannerMinus"
            size={1.75}
            variant="error"
            color={600}
          />
        )}
        <button
          className={`w-10 rounded h-10 flex-shrink-0 hover:cursor-pointer`}
          style={{ backgroundColor: faction.data.color }}
          onClick={() =>
            window.document.getElementById(`${faction.id}-color-input`)?.click()
          }
        />
        <input
          id={`${faction.id}-color-input`}
          type="color"
          hidden
          value={faction.data.color}
          onChange={handleColorChange}
        />
        <div className="flex gap-2 flex-1">
          <RemoveButton faction={faction} show onRemove={onRemove} />
          <SaveButton faction={faction} show={faction.isModified} />
        </div>
      </div>
    </form>
  );
};
