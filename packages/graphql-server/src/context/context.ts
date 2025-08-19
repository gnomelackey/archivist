import { prisma } from "@repo/db";
import type { StandaloneServerContextFunctionArgument } from "@apollo/server/standalone";
import cookie from "cookie";

import type { ArchivistGraphQLContext } from "./types";
import { SessionManager } from "@repo/session";

export async function createContext({
  req,
}: StandaloneServerContextFunctionArgument): Promise<ArchivistGraphQLContext> {
  try {
    const cookies = req.headers.cookie;

    if (!cookies) {
      throw new Error("GraphQL context Error: Unauthenticated request.");
    }

    const parsedCookies = cookie.parse(cookies);
    const token = parsedCookies.session;

    if (!token) {
      throw new Error("GraphQL context Error: Unauthenticated request.");
    }

    const sessionUserId = await SessionManager.isSessionValid(token);

    if (!sessionUserId) {
      throw new Error("GraphQL context Error: Invalid session.");
    }

    return { userId: sessionUserId, prisma };
  } catch (err) {
    console.error(err);
    throw new Error("Invalid auth token.");
  }
}
