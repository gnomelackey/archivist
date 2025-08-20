import type { ArchivistGraphQLResolvers } from "../types";

export const SeedMutations: ArchivistGraphQLResolvers["Mutation"] = {
  createSeed: (_, args, context) => {
    const { userId } = context;

    if (!args.type || !args.value) {
      throw new Error("Error: Invalid Request, missing required fields.");
    }

    return context.prisma.seed.create({
      data: {
        type: args.type,
        value: args.value,
        user: { connect: { id: userId } },
      },
    });
  },
};