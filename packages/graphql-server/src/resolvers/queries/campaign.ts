import type { ArchivistGraphQLResolvers } from "../types";

export const CampaignQueries: ArchivistGraphQLResolvers["Query"] = {
  campaigns: (_, __, context) => {
    return context.prisma.campaign.findMany();
  },
  campaign: (_, args, context) => {
    if (!args.id) throw new Error("Error: Missing Campaign ID.");

    return context.prisma.campaign.findUnique({
      where: { id: args.id, userId: context.userId },
    });
  },
};
