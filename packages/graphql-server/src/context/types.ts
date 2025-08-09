import type { PrismaClient } from "@repo/db";
import type { JwtPayload } from "jsonwebtoken";

export interface ArchivistJwtPayload extends JwtPayload {
  id: string;
  email: string;
}

export interface ArchivistGraphQLContext {
  user: { id: string, email: string };
  prisma: PrismaClient;
}
