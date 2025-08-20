import type { ArchivistGraphQLResolvers } from "../types";

export const FactionMutations: ArchivistGraphQLResolvers["Mutation"] = {
  createFaction: (_, args, context) => {
    const { userId } = context;

    if (!args.campaign || !args.name || !args.race || !args.color) {
      throw new Error("Error: Invalid Request, missing required fields.");
    }

    context.prisma.campaign
      .findUnique({ where: { id: args.campaign, userId } })
      .catch(() => {
        throw new Error("Error: Invalid campaign.");
      });

    return context.prisma.faction.create({
      data: {
        name: args.name,
        description: args.description,
        race: args.race,
        color: args.color,
        campaign: { connect: { id: args.campaign } },
      },
    });
  },
};
