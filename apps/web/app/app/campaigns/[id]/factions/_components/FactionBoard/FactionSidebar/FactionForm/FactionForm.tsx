import React from "react";

import {
  Iconography,
  Input,
  TextArea,
  TypeaheadOption,
} from "@repo/components";

import type { FactionFormProps } from "./types";
import { RaceTypeAhead } from "./RaceTypeAhead";
import { SaveButton } from "./SaveButton";
import { RemoveButton } from "./RemoveButton";

export const FactionForm = ({
  faction,
  onSave,
  onRemove,
  onChange,
}: FactionFormProps) => {
  const handleChangeName = (ev: React.ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...faction,
      data: { ...faction.data, name: ev.target.value },
    });
  };

  const handleColorChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...faction,
      data: { ...faction.data, color: ev.target.value },
    });
  };

  const handleDescriptionChange = (
    ev: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    onChange({
      ...faction,
      data: { ...faction.data, description: ev.target.value },
    });
  };

  const handleChangeRace = (option: TypeaheadOption) => {
    onChange({
      ...faction,
      data: { ...faction.data, race: option.label },
    });
  };

  return (
    <form className="flex flex-col gap-2">
      <div className="flex flex-1 gap-2">
        <Input
          placeholder="Faction Name"
          value={faction.data.name ?? ""}
          onChange={handleChangeName}
        />
        <RaceTypeAhead faction={faction} onChange={handleChangeRace} />
      </div>
      <TextArea
        placeholder="Description"
        rows={2}
        value={faction.data.description ?? ""}
        onChange={handleDescriptionChange}
      />
      <div className="flex gap-2 items-center">
        {!faction.isTemporary ? (
          <Iconography name="bannerCheck" size={1.75} />
        ) : (
          <Iconography name="bannerMinus" size={1.75} color={200} />
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
          <RemoveButton faction={faction} onRemove={onRemove} show />
          <SaveButton
            faction={faction}
            onSave={onSave}
            show={faction.isTemporary}
          />
        </div>
      </div>
    </form>
  );
};
