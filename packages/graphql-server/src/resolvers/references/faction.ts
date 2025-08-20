import type { ArchivistGraphQLResolvers } from "../types";

export const FactionReferences: ArchivistGraphQLResolvers["Faction"] = {
  campaign: (parent) => {
    return parent.campaignId;
  },
};
