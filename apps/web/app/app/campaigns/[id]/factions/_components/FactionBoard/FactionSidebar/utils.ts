import { CoordinateLocationEnum } from "@repo/enums";

import type { FactionCard } from "../types";

/**
 * Maps a faction card to a faction object structure for API operations
 * @param faction - The faction card to convert
 * @returns Object containing faction data formatted for backend operations
 */
export const handleFactionMapping = (faction: FactionCard) => ({
  name: faction.data.name,
  race: faction.data.race,
  description: faction.data.description,
  color: faction.data.color,
  descriptors: [
    ...(faction.data.resources?.map((r) => r.id) || []),
    ...(faction.data.goals?.map((g) => g.id) || []),
  ],
  coordinates: {
    x: faction.x,
    y: faction.y,
    width: faction.width,
    height: faction.height,
    location: CoordinateLocationEnum.FACTION_BOARD,
  },
});
