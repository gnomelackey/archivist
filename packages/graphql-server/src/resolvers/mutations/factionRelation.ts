import { campaignValidation } from "../../utils/campaignValidation";
import type { ArchivistGraphQLResolvers } from "../types";

export const FactionRelationMutations: ArchivistGraphQLResolvers["Mutation"] = {
  createFactionAlliance: async (_, args, context) => {
    const { campaign, input } = args;

    if (!campaign || !input.partyA || !input.partyB || !input.seed) {
      throw new Error("Error: Invalid Request, missing required fields.");
    }

    await campaignValidation(context, campaign);

    const data = {
      reason: input.reason,
      campaignId: campaign,
      partyAId: input.partyA,
      partyBId: input.partyB,
      seedId: input.seed,
    };

    return context.prisma.factionAlliance.create({ data });
  },
  createFactionConflict: async (_, args, context) => {
    const { campaign, input } = args;

    if (!campaign || !input.aggressor || !input.defender || !input.seed) {
      throw new Error("Error: Invalid Request, missing required fields.");
    }

    await campaignValidation(context, campaign);

    const data = {
      reason: input.reason,
      campaignId: campaign,
      aggressorId: input.aggressor,
      defenderId: input.defender,
      seedId: input.seed,
    };

    return context.prisma.factionConflict.create({ data });
  },
  createFactionTrade: async (_, args, context) => {
    const { campaign, input } = args;

    const missingParties = !input.partyA || !input.partyB;
    const missingSeeds = !input.seedA || !input.seedB;

    if (!campaign || missingParties || missingSeeds) {
      throw new Error("Error: Invalid Request, missing required fields.");
    }

    await campaignValidation(context, campaign);

    const data = {
      campaignId: campaign,
      partyAId: input.partyA,
      partyBId: input.partyB,
      seedAId: input.seedA,
      seedBId: input.seedB,
    };

    return context.prisma.factionTrade.create({ data });
  },
};
