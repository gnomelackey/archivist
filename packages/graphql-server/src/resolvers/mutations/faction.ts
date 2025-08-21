import { FactionInput } from "../../__generated__/schema-types";
import { ArchivistGraphQLContext } from "../../context";
import type { ArchivistGraphQLResolvers } from "../types";

const insertFaction = async (
  context: ArchivistGraphQLContext,
  faction: FactionInput,
  campaign: string
) => {
  return context.prisma.faction
    .create({
      data: {
        name: faction.name,
        description: faction.description,
        race: faction.race,
        color: faction.color,
        campaign: { connect: { id: campaign } },
      },
    })
    .then(async (model) => {
      if (!faction.coordinates) return model;

      const coordinates = await context.prisma.coordinates.create({
        data: {
          x: faction.coordinates.x,
          y: faction.coordinates.y,
          width: faction.coordinates.width,
          height: faction.coordinates.height,
          location: faction.coordinates.location,
          faction: { connect: { id: model.id } },
        },
      });

      return { ...model, coordinates };
    });
};

export const FactionMutations: ArchivistGraphQLResolvers["Mutation"] = {
  createFaction: async (_, args, context) => {
    const { userId } = context;
    const { campaign, faction } = args;

    if (!campaign || !faction.name || !faction.race || !faction.color) {
      throw new Error("Error: Invalid Request, missing required fields.");
    }

    await context.prisma.campaign
      .findUnique({ where: { id: campaign, userId } })
      .catch(() => {
        throw new Error("Error: Invalid campaign.");
      });

    return insertFaction(context, faction, campaign);
  },
  createFactions: async (_, args, context) => {
    const { userId } = context;
    const { campaign, factions } = args;

    if (!campaign || !factions || factions.length === 0) {
      throw new Error("Error: Invalid Request, missing required fields.");
    }

    await context.prisma.campaign
      .findUnique({ where: { id: campaign, userId } })
      .catch(() => {
        throw new Error("Error: Invalid campaign.");
      });

    return Promise.all(
      factions.map(async (faction) => insertFaction(context, faction, campaign))
    );
  },
  removeFaction: async (_, args, context) => {
    const { userId } = context;
    const { campaign, faction } = args;

    if (!campaign || !faction) {
      throw new Error("Error: Invalid Request, missing required fields.");
    }

    await context.prisma.campaign
      .findUnique({ where: { id: campaign, userId } })
      .catch(() => {
        throw new Error("Error: Invalid campaign.");
      });

    return context.prisma.faction
      .delete({
        where: {
          id: faction,
          campaign: { id: campaign },
        },
      })
      .then(() => faction);
  },
  removeFactions: async (_, args, context) => {
    const { userId } = context;
    const { campaign, factions } = args;

    if (!campaign || !factions || factions.length === 0) {
      throw new Error("Error: Invalid Request, missing required fields.");
    }

    await context.prisma.campaign
      .findUnique({ where: { id: campaign, userId } })
      .catch(() => {
        throw new Error("Error: Invalid campaign.");
      });

    return context.prisma.faction
      .deleteMany({
        where: {
          id: { in: factions },
          campaign: { id: campaign },
        },
      })
      .then(() => factions);
  },
};
