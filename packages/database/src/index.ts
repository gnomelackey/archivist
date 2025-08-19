import { PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient();

export type {
  Prisma,
  PrismaClient,
  PrismaPromise,
  Campaign,
  User,
  Seed,
} from "@prisma/client";
