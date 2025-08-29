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
  alliances: (parent, _, context) => {
    return context.prisma.factionAlliance.findMany({
      where: { OR: [{ partyAId: parent.id }, { partyBId: parent.id }] },
    });
  },
  conflicts: (parent, _, context) => {
    return context.prisma.factionConflict.findMany({
      where: { OR: [{ aggressorId: parent.id }, { defenderId: parent.id }] },
    });
  },
  trades: (parent, _, context) => {
    return context.prisma.factionTrade.findMany({
      where: { OR: [{ partyAId: parent.id }, { partyBId: parent.id }] },
    });
  },
  resources: (parent, _, context) => {
    return context.prisma.seed.findMany({
      where: {
        factions: {
          some: { id: parent.id },
        },
        type: "resource",
      },
    });
  },
  goals: (parent, _, context) => {
    return context.prisma.seed.findMany({
      where: {
        factions: {
          some: { id: parent.id },
        },
        type: "goal",
      },
    });
  },
};
