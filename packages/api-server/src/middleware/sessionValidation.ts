/* eslint-disable @typescript-eslint/no-explicit-any */

import { SessionManager } from "@repo/session";
import express from "express";

import { COOKIE_CONFIG, SESSION_COOKIE_NAME } from "../configs";

const invalidateSession = (req: express.Request, res: express.Response) => {
  const sessionId = req.cookies?.sessionId;

  if (sessionId) SessionManager.destroySession(sessionId);

  res.clearCookie(SESSION_COOKIE_NAME, COOKIE_CONFIG);

  return res.status(401).redirect("/login");
};

export async function sessionValidation(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const sessionToken = req.cookies?.sessionId;

    if (!sessionToken) {
      return invalidateSession(req, res);
    }

    const sessionUserId = await SessionManager.isSessionValid(sessionToken);

    if (!sessionUserId) {
      return invalidateSession(req, res);
    }

    (req as any).user = { id: sessionUserId };

    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return invalidateSession(req, res);
  }
}
