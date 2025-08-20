import { Seed } from "@repo/db";

import type { ArchivistGraphQLResolvers } from "../types";

export const SeedQueries: ArchivistGraphQLResolvers["Query"] = {
  seeds: (_, __, context) => {
    return context.prisma.seed.findMany();
  },
  seed: (_, args, context) => {
    if (!args.id) throw new Error("Error: Missing Seed ID.");

    return context.prisma.seed.findUnique({
      where: { id: args.id, userId: context.userId },
    });
  },
  seedsByType: (_, args, context) => {
    if (!args.type) throw new Error("Error: Missing Seed Type.");

    return context.prisma.seed.findMany({
      where: { type: args.type, userId: context.userId },
    });
  },
  seedsByTypes: (_, args, context) => {
    if (!args.types) throw new Error("Error: Missing Seed Types.");

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
};
