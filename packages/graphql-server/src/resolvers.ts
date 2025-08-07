/* eslint-disable @typescript-eslint/no-explicit-any */

import { PrismaClient } from "@prisma/client";

export const resolvers = {
  Query: {
    maps: (_: any, __: any, context: { prisma: PrismaClient }) => {
      return context.prisma.map.findMany();
    },
  },
  Mutation: {
    addMap: (_: any, args: any, context: { prisma: PrismaClient }) => {
      return context.prisma.map.create({
        data: {
          name: args.name,
          description: args.description,
          imageUrl: args.imageUrl,
        },
      });
    },
  },
};
