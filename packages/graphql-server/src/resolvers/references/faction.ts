import type { ArchivistGraphQLResolvers } from "../types";

export const FactionReferences: ArchivistGraphQLResolvers["Faction"] = {
  campaign: (parent) => {
    return parent.campaignId;
  },
  coordinates: (parent, _, context) => {
    return context.prisma.coordinates.findMany({
      where: { factionId: parent.id },
    });
  },
  resources: (parent, _, context) => {
    return context.prisma.seed.findMany({
      where: {
        factions: {
          some: { id: parent.id }
        },
        type: "resource"
      },
    });
  },
  goals: (parent, _, context) => {
    return context.prisma.seed.findMany({
      where: {
        factions: {
          some: { id: parent.id }
        },
        type: "goal"
      },
    });
  },
};
