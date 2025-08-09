import type { Resolvers } from "@generated/graphQL/resolver-types";
import { ArchivistGraphQLContext } from "../context";

export type AddCampaignArgs = {
  name: string;
  description: string;
};

export type ArchivistGraphQLResolvers = Resolvers<ArchivistGraphQLContext>;
