import { CampaignMutations } from "./mutations/campaign";
import { CampaignQueries } from "./queries/campaign";
import { CampaignReferences } from "./references/campaign";
import { FactionMutations } from "./mutations/faction";
import { FactionQueries } from "./queries/faction";
import { FactionReferences } from "./references/faction";
import { CoordinatesReferences } from "./references/coordinates";
import { SeedMutations } from "./mutations/seed";
import { SeedQueries } from "./queries/seed";
import { SeedReferences } from "./references/seed";
import type { ArchivistGraphQLResolvers } from "./types";

export const resolvers: ArchivistGraphQLResolvers = {
  Query: {
    ...CampaignQueries,
    ...SeedQueries,
    ...FactionQueries,
  },
  Mutation: {
    ...CampaignMutations,
    ...SeedMutations,
    ...FactionMutations
  },
  Campaign: CampaignReferences,
  Faction: FactionReferences,
  Coordinates: CoordinatesReferences,
  Seed: SeedReferences,
};
