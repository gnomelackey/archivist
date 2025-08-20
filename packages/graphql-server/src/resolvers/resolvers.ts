import { Seed } from "@repo/db";

import { ArchivistGraphQLResolvers } from "./types";

export const resolvers: ArchivistGraphQLResolvers = {
  Query: {
    campaigns: (_, __, context) => {
      return context.prisma.campaign.findMany();
    },
    campaign: (_, args, context) => {
      if (!args.id) throw new Error("Error: Missing Campaign ID.");
      if (!context.userId) throw new Error("Error: Invalid Token.");

      return context.prisma.campaign.findUnique({
        where: { id: args.id, userId: context.userId },
      });
    },
    seeds: (_, __, context) => {
      return context.prisma.seed.findMany();
    },
    seed: (_, args, context) => {
      if (!args.id) throw new Error("Error: Missing Seed ID.");
      if (!context.userId) throw new Error("Error: Invalid Token.");

      return context.prisma.seed.findUnique({
        where: { id: args.id, userId: context.userId },
      });
    },
    seedsByType: (_, args, context) => {
      if (!args.type) throw new Error("Error: Missing Seed Type.");
      if (!context.userId) throw new Error("Error: Invalid Token.");

      return context.prisma.seed.findMany({
        where: { type: args.type, userId: context.userId },
      });
    },
    seedsByTypes: (_, args, context) => {
      if (!args.types) throw new Error("Error: Missing Seed Types.");
      if (!context.userId) throw new Error("Error: Invalid Token.");

      return context.prisma.seed
        .findMany({
          where: { type: { in: args.types }, userId: context.userId },
        })
        .then((data) => {
          if (!data) {
            throw new Error("Error: No seeds found for the provided types.");
          }

          return data.reduce(
            (acc: Record<string, Array<Partial<Seed>>>, seed) => {
              const updatedMap = { ...acc };

              const updatedSeed = {
                id: seed.id,
                type: seed.type,
                value: seed.value,
              };

              if (!updatedMap[seed.type]) updatedMap[seed.type] = [updatedSeed];
              else updatedMap[seed.type]!.push(updatedSeed);
              return updatedMap;
            },
            {}
          );
        });
    },
  },
  Mutation: {
    createCampaign: (_, args, context) => {
      const { userId } = context;

      if (!userId) throw new Error("Error: Invalid Token.");

      return context.prisma.campaign.create({
        data: {
          name: args.name,
          description: args.description,
          user: { connect: { id: userId } },
        },
      });
    },
    createSeed: (_, args, context) => {
      const { userId } = context;

      if (!userId) throw new Error("Error: Invalid Token.");

      return context.prisma.seed.create({
        data: {
          type: args.type,
          value: args.value,
          user: { connect: { id: userId } },
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
