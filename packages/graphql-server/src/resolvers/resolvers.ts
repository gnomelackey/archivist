import { ArchivistGraphQLResolvers } from "./types";

export const resolvers: ArchivistGraphQLResolvers = {
  Query: {
    campaigns: (_, __, context) => {
      return context.prisma.campaign.findMany();
    },
  },
  Mutation: {
    createCampaign: (_, args, context) => {
      const { id } = context.user;

      return context.prisma.campaign.create({
        data: {
          name: args.name,
          description: args.description,
          user: { connect: { id } },
        },
      });
    },
  },
};
