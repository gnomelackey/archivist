import React, { useMemo } from "react";

import { useMutation, useQuery } from "@apollo/client";
import {
  CREATE_SEED_MUTATION,
  GET_SEEDS_BY_TYPES_QUERY,
  SeedsByTypes,
} from "@repo/clients";
import {
  Button,
  Input,
  TextArea,
  Typeahead,
  TypeaheadOption,
} from "@repo/components";

import type { FactionFormProps } from "./types";

export const FactionForm = ({
  faction,
  onSave,
  onRemove,
  onFactionChange,
}: FactionFormProps) => {
  const { data, refetch } = useQuery<SeedsByTypes>(GET_SEEDS_BY_TYPES_QUERY, {
    variables: { types: ["race"] },
  });

  const [createSeed] = useMutation(CREATE_SEED_MUTATION, {
    onCompleted: () => {
      refetch();
    },
  });

  const raceOptions = useMemo(
    () =>
      data?.seedsByTypes.race.map((option) => ({
        id: option.id,
        label: option.value,
        value: option.id,
      })) ?? [],
    [data]
  );

  const factionRace = useMemo(() => {
    return raceOptions.find((opt) => opt.label === faction.race) ?? null;
  }, [raceOptions, faction.race]);

  const handleCreateRace = (value: string) => {
    if (!value) return;
    createSeed({ variables: { type: "race", value } });
  };

  const handleChangeName = (ev: React.ChangeEvent<HTMLInputElement>) => {
    onFactionChange({ ...faction, name: ev.target.value });
  };

  const handleColorChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    onFactionChange({ ...faction, color: ev.target.value });
  };

  const handleDescriptionChange = (ev: React.ChangeEvent<HTMLTextAreaElement>) => {
    onFactionChange({ ...faction, description: ev.target.value });
  };

  const handleChangeRace = (option: TypeaheadOption) => {
    onFactionChange({ ...faction, race: option.label });
  };

  return (
    <form className="flex flex-col gap-2">
      <div className="flex flex-1 gap-2">
        <Input
          placeholder="Faction Name"
          value={faction.name ?? ""}
          onChange={handleChangeName}
        />
        <Typeahead
          options={raceOptions}
          fullWidth={false}
          className="w-30"
          placeholder="Race"
          value={factionRace}
          onSelect={handleChangeRace}
          onNew={handleCreateRace}
        />
      </div>
      <TextArea
        placeholder="Description"
        rows={1}
        value={faction.description ?? ""}
        onChange={handleDescriptionChange}
      />
      <div className="flex gap-2 items-center">
        <button
          className={`w-10 rounded h-10 flex-shrink-0 hover:cursor-pointer`}
          style={{ backgroundColor: faction.color }}
          onClick={() =>
            window.document.getElementById(`${faction.id}-color-input`)?.click()
          }
        />
        <input
          id={`${faction.id}-color-input`}
          type="color"
          hidden
          value={faction.color}
          onChange={handleColorChange}
        />
        <div className="flex gap-2 flex-1">
          <Button
            type="button"
            variant="outline"
            mode="secondary"
            onClick={() => onRemove(faction.id)}
          >
            Remove
          </Button>
          <Button
            type="button"
            variant="fill"
            className="flex-1"
            onClick={() => onSave(faction)}
          >
            Save
          </Button>
        </div>
      </div>
    </form>
  );
};
