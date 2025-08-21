import type { TypeaheadOption } from "@repo/components";

import type { FactionCard } from "../../../types";

export type RaceTypeAheadProps = {
  faction: FactionCard;
  onChange: (faction: TypeaheadOption) => void;
};
