import type { ArchivistGraphQLResolvers } from "../types";

export const CoordinatesReferences: ArchivistGraphQLResolvers["Coordinates"] = {
  faction: (parent) => {
    return parent.factionId || "";
  },
};
