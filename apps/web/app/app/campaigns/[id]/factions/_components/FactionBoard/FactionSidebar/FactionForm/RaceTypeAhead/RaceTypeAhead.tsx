import React, { useMemo } from "react";

import { useMutation, useQuery } from "@apollo/client";
import {
  CREATE_SEED_MUTATION,
  GET_SEEDS_BY_TYPES_QUERY,
  SeedsByTypes,
} from "@repo/clients";
import { Typeahead } from "@repo/components";

import { RaceTypeAheadProps } from "./types";

export const RaceTypeAhead = ({
  faction,
  onChange,
}: RaceTypeAheadProps) => {
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
    return raceOptions.find((opt) => opt.label === faction.data.race) ?? null;
  }, [raceOptions, faction.data.race]);

  const handleCreateRace = (value: string) => {
    if (!value) return;
    createSeed({ variables: { type: "race", value } });
  };

  return (
    <Typeahead
      options={raceOptions}
      fullWidth={false}
      className="w-30"
      placeholder="Race"
      value={factionRace}
      onSelect={onChange}
      onNew={handleCreateRace}
    />
  );
};
