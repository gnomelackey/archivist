import type { Faction } from "@repo/db";

import type { FactionCreateInput } from "../../__generated__/schema-types";
import type { ArchivistGraphQLContext } from "../../context";
import type { ArchivistGraphQLResolvers } from "../types";
import { campaignValidation } from "../../utils/campaignValidation";

const coordinatesDecorator = async (
  context: ArchivistGraphQLContext,
  input: FactionCreateInput,
  model: Faction
) => {
  if (!input.coordinates) return model;

  const coordinates = await context.prisma.coordinates.create({
    data: {
      x: input.coordinates.x,
      y: input.coordinates.y,
      width: input.coordinates.width,
      height: input.coordinates.height,
      location: input.coordinates.location,
      faction: { connect: { id: model.id } },
    },
  });

  return { ...model, coordinates };
};

const mapToFactionData = (input: FactionCreateInput) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data: any = {
    name: input.name,
    description: input.description,
    race: input.race,
    color: input.color,
  };

  if (input?.descriptors?.length) {
    data.descriptors = { set: input.descriptors.map((id) => ({ id })) };
  }

  return data;
};

const createFaction = async (
  context: ArchivistGraphQLContext,
  input: FactionCreateInput,
  campaignId: string
) => {
  const data = {
    ...mapToFactionData(input),
    campaign: { connect: { id: campaignId } },
  };

  return context.prisma.faction
    .create({ data })
    .then(async (model) => await coordinatesDecorator(context, input, model));
};

const updateFaction = async (
  context: ArchivistGraphQLContext,
  input: FactionCreateInput,
  factionId: string
) => {
  const data = mapToFactionData(input);

  return context.prisma.faction
    .update({ where: { id: factionId }, data })
    .then(async (model) => await coordinatesDecorator(context, input, model));
};

export const FactionMutations: ArchivistGraphQLResolvers["Mutation"] = {
  createFaction: async (_, args, context) => {
    const { campaign, faction } = args;

    if (!campaign || !faction.name || !faction.race || !faction.color) {
      throw new Error("Error: Invalid Request, missing required fields.");
    }

    await campaignValidation(context, campaign);

    return createFaction(context, faction, campaign);
  },
  createFactions: async (_, args, context) => {
    const { campaign, factions } = args;

    if (!campaign || !factions || factions.length === 0) {
      throw new Error("Error: Invalid Request, missing required fields.");
    }

    await campaignValidation(context, campaign);

    return factions.map(async (faction) =>
      createFaction(context, faction, campaign)
    );
  },
  updateFaction: async (_, args, context) => {
    const { campaign, faction, data } = args;

    if (!campaign || !faction || !data) {
      throw new Error("Error: Invalid Request, missing required fields.");
    }

    await campaignValidation(context, campaign);

    return updateFaction(context, data, faction);
  },
  updateFactions: async (_, args, context) => {
    const { campaign, data } = args;

    if (!campaign || !data?.length) {
      throw new Error("Error: Invalid Request, missing required fields.");
    }

    await campaignValidation(context, campaign);

    return data.map((faction) => updateFaction(context, faction, faction.id));
  },
  removeFaction: async (_, args, context) => {
    const { campaign, faction } = args;

    if (!campaign || !faction) {
      throw new Error("Error: Invalid Request, missing required fields.");
    }

    await campaignValidation(context, campaign);

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
    const { campaign, factions } = args;

    if (!campaign || !factions || factions.length === 0) {
      throw new Error("Error: Invalid Request, missing required fields.");
    }

    await campaignValidation(context, campaign);

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
