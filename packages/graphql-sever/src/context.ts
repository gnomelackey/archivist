import { PrismaClient as prisma } from "@prisma/client";

export function createContext() {
  return { prisma };
}
