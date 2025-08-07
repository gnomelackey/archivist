import { PrismaClient as prisma } from "@prisma/client";

export async function createContext() {
  return { prisma };
}
