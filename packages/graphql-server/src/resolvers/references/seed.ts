import type { ArchivistGraphQLResolvers } from "../types";

export const SeedReferences: ArchivistGraphQLResolvers["Seed"] = {
  user: (parent) => {
    return parent.userId;
  },
};
