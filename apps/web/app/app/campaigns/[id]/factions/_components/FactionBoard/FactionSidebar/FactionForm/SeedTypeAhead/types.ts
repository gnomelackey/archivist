import type { TypeaheadOption } from "@repo/components";

import type { FactionCard } from "../../../types";
import { SeedsByTypes } from "@repo/clients";

export type SeedTypeAheadProps = {
  type: keyof SeedsByTypes["seedsByTypes"];
  fullWidth?: boolean;
  className?: string;
  placeholder: string;
  faction: FactionCard;
  onChange: (faction: TypeaheadOption) => void;
};
