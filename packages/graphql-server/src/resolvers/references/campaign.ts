import type { ArchivistGraphQLResolvers } from "../types";

export const CampaignReferences: ArchivistGraphQLResolvers["Campaign"] = {
  user: (parent) => {
    return parent.userId;
  },
};
