import type { ArchivistGraphQLResolvers } from "../types";

export const FactionQueries: ArchivistGraphQLResolvers["Query"] = {
  factionWithCoordinates: async (_, args, context) => {
    if (!args.id) throw new Error("Error: Missing ID.");
    if (!args.location) throw new Error("Error: Missing location.");

    const faction = await context.prisma.faction.findUnique({
      where: { id: args.id },
      include: { coordinates: true },
    });

    if (!faction) throw new Error("Error: Faction not found.");

    const coordinates = faction.coordinates.filter(
      (coord) => coord.location === args.location
    );

    if (!coordinates?.length) {
      return { ...faction, coordinates: [] };
    }

    return {
      ...faction,
      coordinates,
    };
  },
  factionsWithCoordinates: async (_, args, context) => {
    if (!args.campaign) throw new Error("Error: Missing Campaign ID.");
    if (!args.location) throw new Error("Error: Missing location.");

    const factions = await context.prisma.faction.findMany({
      where: { campaignId: args.campaign },
      include: { coordinates: true },
    });

    return factions
      .map((faction) => {
        const coordinates = faction.coordinates.filter(
          (coord) => coord.location === args.location
        );

        if (!coordinates?.length) {
          return { ...faction, coordinates: [] };
        }

        return { ...faction, coordinates };
      })
      .filter(Boolean);
  },
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
