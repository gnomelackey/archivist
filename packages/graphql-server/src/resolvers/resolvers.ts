import { ArchivistGraphQLResolvers } from "./types";

export const resolvers: ArchivistGraphQLResolvers = {
  Query: {
    campaigns: (_, __, context) => {
      return context.prisma.campaign.findMany();
    },
    campaign: (_, args, context) => {
      if (!args.id) throw new Error("Error: Missing Campaign ID.");

      return context.prisma.campaign.findUnique({
        where: { id: args.id },
      });
    },
  },
  Mutation: {
    createCampaign: (_, args, context) => {
      const { id } = context.user;

      if (!id) throw new Error("Error: Invalid User.");

      return context.prisma.campaign.create({
        data: {
          name: args.name,
          description: args.description,
          user: { connect: { id } },
        },
      });
    },
  },
  Campaign: {
    user: (parent) => {
      return parent.userId;
    },
  },
};
