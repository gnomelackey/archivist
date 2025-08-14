import type { Request, Response } from "express";
import { SessionManager } from "../../../services/SessionManager/SessionManager";

const logoutHandler = async (req: Request, res: Response) => {
  try {
    const sessionId = req.cookies.sessionId;
    
    if (sessionId) await SessionManager.destroySession(sessionId);
    
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });
    
    res.clearCookie("sessionId", {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });
    
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ error: "Logout failed" });
  }
};

export const logoutRoute = [logoutHandler];
