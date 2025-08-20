import { CampaignMutations } from "./mutations/campaign";
import { CampaignQueries } from "./queries/campaign";
import { CampaignReferences } from "./references/campaign";
import { FactionMutations } from "./mutations/faction";
import { FactionReferences } from "./references/faction";
import { SeedMutations } from "./mutations/seed";
import { SeedQueries } from "./queries/seed";
import { SeedReferences } from "./references/seed";
import type { ArchivistGraphQLResolvers } from "./types";

export const resolvers: ArchivistGraphQLResolvers = {
  Query: {
    ...CampaignQueries,
    ...SeedQueries,
  },
  Mutation: {
    ...CampaignMutations,
    ...SeedMutations,
    ...FactionMutations
  },
  Campaign: CampaignReferences,
  Faction: FactionReferences,
  Seed: SeedReferences,
};
