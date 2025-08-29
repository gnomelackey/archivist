import type { ArchivistGraphQLContext } from "../context";

export const campaignValidation = async (
  context: ArchivistGraphQLContext,
  campaign: string
) => {
  const { userId } = context;

  await context.prisma.campaign
    .findUnique({ where: { id: campaign, userId } })
    .catch(() => {
      throw new Error("Error: Invalid campaign.");
    });
};
