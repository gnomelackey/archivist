import { ArchivistGraphQLResolvers } from "./types";

export const resolvers: ArchivistGraphQLResolvers = {
  Query: {
    campaigns: (_, __, context) => {
      return context.prisma.campaign.findMany();
    },
    campaign: (_, args, context) => {
      if (!args.id) throw new Error("Error: Missing Campaign ID.");
      if (!context.user) throw new Error("Error: Invalid User.");

      return context.prisma.campaign.findUnique({
        where: { id: args.id, userId: context.user.id },
      });
    },
    seeds: (_, __, context) => {
      return context.prisma.seed.findMany();
    },
    seed: (_, args, context) => {
      if (!args.id) throw new Error("Error: Missing Seed ID.");
      if (!context.user) throw new Error("Error: Invalid User.");

      return context.prisma.seed.findUnique({
        where: { id: args.id, userId: context.user.id },
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
  Seed: {
    user: (parent) => {
      return parent.userId;
    },
  },
};
