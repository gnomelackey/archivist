import type { PrismaClient } from "@repo/db";

export interface ArchivistGraphQLContext {
  userId: string;
  prisma: PrismaClient;
}
