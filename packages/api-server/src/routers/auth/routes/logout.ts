import { SessionManager } from "@repo/session";
import type { Request, Response } from "express";

import { COOKIE_CONFIG, SESSION_COOKIE_NAME } from "../../../configs";

const logoutHandler = async (req: Request, res: Response) => {
  try {
    const sessionId = req.cookies.sessionId;

    if (sessionId) await SessionManager.destroySession(sessionId);

    res.clearCookie(SESSION_COOKIE_NAME, COOKIE_CONFIG);

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ error: "Logout failed" });
  }
};

export const logoutRoute = [logoutHandler];
