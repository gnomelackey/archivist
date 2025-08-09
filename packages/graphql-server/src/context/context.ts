import { prisma } from "@repo/db";
import jwt from "jsonwebtoken";
import type { StandaloneServerContextFunctionArgument } from "@apollo/server/standalone";
import cookie from "cookie";

import type { ArchivistJwtPayload, ArchivistGraphQLContext } from "./types";

export async function createContext({
  req,
}: StandaloneServerContextFunctionArgument): Promise<ArchivistGraphQLContext> {
  try {
    const cookies = req.headers.cookie;

    if (!cookies) throw new Error("Auth token is missing.");

    const parsedCookies = cookie.parse(cookies);
    const token = parsedCookies.token;
    let tokenPayload: ArchivistJwtPayload | null = null;

    if (token) tokenPayload = jwt.verify(token, process.env.JWT_SECRET!) as ArchivistJwtPayload;
    if (!tokenPayload) throw new Error("Missing user information.");

    const user = {
      id: tokenPayload.id,
      email: tokenPayload.email,
    };

    return { user, prisma };
  } catch (err) {
    console.error(err);
    throw new Error("Invalid auth token.");
  }
}
