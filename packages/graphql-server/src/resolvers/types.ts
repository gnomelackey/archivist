import type { Resolvers } from "../__generated__/resolver-types";
import { ArchivistGraphQLContext } from "../context";

export type AddCampaignArgs = {
  name: string;
  description: string;
};

export type ArchivistGraphQLResolvers = Resolvers<ArchivistGraphQLContext>;
