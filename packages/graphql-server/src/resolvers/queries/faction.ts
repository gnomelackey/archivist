import type { ArchivistGraphQLResolvers } from "../types";

export const FactionQueries: ArchivistGraphQLResolvers["Query"] = {
  factions: (_, args, context) => {
    if (!args.campaign) throw new Error("Error: Missing Campaign ID.");

    return context.prisma.faction.findMany({
      where: { campaignId: args.campaign },
      orderBy: { name: "asc" },
    });
  },
  faction: (_, args, context) => {
    if (!args.id) throw new Error("Error: Missing Faction ID.");

    return context.prisma.faction.findUnique({
      where: { id: args.id },
    });
  },
};
