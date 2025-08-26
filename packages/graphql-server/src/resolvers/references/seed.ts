import type { ArchivistGraphQLResolvers } from "../types";

export const SeedReferences: ArchivistGraphQLResolvers["Seed"] = {
  factionAlliances: (parent, _, context) => {
    return context.prisma.factionAlliance.findMany({
      where: { seedId: parent.id },
    });
  },
  factionConflicts: (parent, _, context) => {
    return context.prisma.factionConflict.findMany({
      where: { seedId: parent.id },
    });
  },
  user: (parent) => {
    return parent.userId;
  },
};
