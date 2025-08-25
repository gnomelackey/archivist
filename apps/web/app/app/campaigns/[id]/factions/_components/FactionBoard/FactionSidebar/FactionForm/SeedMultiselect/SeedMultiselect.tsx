import React, { useCallback, useMemo } from "react";

import { useMutation, useQuery } from "@apollo/client";
import { Multiselect } from "@repo/components";
import {
  CREATE_SEED_MUTATION,
  GET_SEEDS_BY_TYPES_QUERY,
  SeedsByTypes,
} from "@repo/clients";

import { SeedMultiselectPluralTypes, SeedMultiselectProps } from "./types";

export const SeedMultiselect = ({
  type,
  placeholder,
  faction,
  onChange,
}: SeedMultiselectProps) => {
  const { data, refetch } = useQuery<SeedsByTypes>(GET_SEEDS_BY_TYPES_QUERY, {
    variables: { types: [type] },
  });

  const [createSeed] = useMutation(CREATE_SEED_MUTATION, {
    onCompleted: () => {
      refetch();
    },
  });

  const options = useMemo(
    () =>
      data?.seedsByTypes[type]?.map((option) => ({
        id: option.id,
        label: option.value,
        value: option.id,
      })) ?? [],
    [data, type]
  );

  const pluralType: SeedMultiselectPluralTypes = `${type}s`;
  const selectedOptions = faction.data[pluralType];

  const handleCreateSeed = useCallback(
    (value: string) => {
      if (!value) return;
      createSeed({ variables: { type, value } });
    },
    [createSeed, type]
  );

  return (
    <div className="flex flex-col gap-2">
      <Multiselect
        options={options}
        placeholder={placeholder}
        value={selectedOptions}
        onSelect={onChange}
        onNew={handleCreateSeed}
        closeOnSelect
      />
      {selectedOptions?.length ? (
        <div className="h-24 rounded overflow-y-auto border border-primary flex flex-col gap-1 pb-2">
          <h6 className="px-2 py-0.5 text-sm w-full bg-primary-bg capitalize">
            {pluralType}
          </h6>
          {selectedOptions.map((option) => (
            <div key={option.id} className="px-2">
              {option.label}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};
