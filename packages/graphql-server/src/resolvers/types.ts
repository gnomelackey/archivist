import type { Resolvers } from "../__generated__/resolver-types";
import type { ArchivistGraphQLContext } from "../context";

export type CreateCampaignArgs = {
  name: string;
  description: string;
};

export type ArchivistGraphQLResolvers = Resolvers<ArchivistGraphQLContext>;
