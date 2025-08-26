import { PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient();

export type {
  Campaign,
  Coordinates,
  Faction,
  FactionAlliance,
  FactionConflict,
  Map,
  Prisma,
  PrismaClient,
  PrismaPromise,
  Seed,
  Session,
  User,
} from "@prisma/client";
