import { SessionManager } from "@repo/session";
import type { Request, Response } from "express";

import { SESSION_COOKIE_NAME } from "../../../configs";

const SessionHandler = async (req: Request, res: Response) => {
  try {
    const sessionId = req.cookies[SESSION_COOKIE_NAME];

    if (!sessionId) {
      return res.status(401).json({ error: "No session found" });
    }

    const userId = await SessionManager.isSessionValid(sessionId);

    if (!userId) {
      return res.status(401).json({ error: "Invalid session" });
    }

    res.json({ valid: true, userId });
  } catch (error) {
    console.error("Session validation error:", error);
    res.status(401).json({ error: "Session validation failed" });
  }
};

export const sessionRoute = [SessionHandler];
