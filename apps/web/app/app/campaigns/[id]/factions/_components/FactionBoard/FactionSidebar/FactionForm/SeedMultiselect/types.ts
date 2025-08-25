import type { MultiselectOption } from "@repo/components";

import type { FactionCard } from "../../../types";

export type SeedMultiselectPluralTypes = "resources" | "goals";

export type SeedMultiselectProps = {
  type: "resource" | "goal";
  placeholder?: string;
  faction: FactionCard;
  onChange: (faction: Array<MultiselectOption>) => void;
};
