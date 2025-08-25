import React, { useCallback, useMemo } from "react";

import { useMutation, useQuery } from "@apollo/client";
import {
  CREATE_SEED_MUTATION,
  GET_SEEDS_BY_TYPES_QUERY,
  SeedsByTypes,
} from "@repo/clients";
import { Typeahead } from "@repo/components";

import type { SeedTypeAheadProps } from "./types";
import type { FactionCard } from "../../../types";

export const SeedTypeAhead = ({
  type,
  className,
  fullWidth,
  placeholder,
  faction,
  onChange,
}: SeedTypeAheadProps) => {
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

  const selectedOption = useMemo(() => {
    return (
      options.find(
        (opt) => opt.label === faction.data[type as keyof FactionCard["data"]]
      ) ?? null
    );
  }, [faction.data, options, type]);

  const handleCreateSeed = useCallback(
    (value: string) => {
      if (!value) return;
      createSeed({ variables: { type, value } });
    },
    [type, createSeed]
  );

  return (
    <Typeahead
      options={options}
      fullWidth={fullWidth}
      className={className}
      placeholder={placeholder}
      value={selectedOption}
      onSelect={onChange}
      onNew={handleCreateSeed}
    />
  );
};
