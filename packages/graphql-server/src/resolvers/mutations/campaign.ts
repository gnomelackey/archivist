import type { ArchivistGraphQLResolvers } from "../types";

export const CampaignMutations: ArchivistGraphQLResolvers["Mutation"] = {
  createCampaign: (_, args, context) => {
    const { userId } = context;

    if (!args.name) {
      throw new Error("Error: Invalid Request, missing required fields.");
    }

    return context.prisma.campaign.create({
      data: {
        name: args.name,
        description: args.description,
        user: { connect: { id: userId } },
      },
    });
  },
};
