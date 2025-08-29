import { PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient();

export type {
  Campaign,
  Coordinates,
  Faction,
  FactionAlliance,
  FactionConflict,
  FactionTrade,
  Map,
  Prisma,
  PrismaClient,
  PrismaPromise,
  Seed,
  Session,
  User,
} from "@prisma/client";
