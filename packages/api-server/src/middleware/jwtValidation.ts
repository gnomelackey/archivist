/* eslint-disable @typescript-eslint/no-explicit-any */

import express from "express";
import jwt from "jsonwebtoken";
import { SessionManager } from "../services/SessionManager/SessionManager";

export async function jwtValidation(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const token = req.cookies?.token;
    const sessionToken = req.cookies?.sessionId;

    if (!token || !sessionToken) {
      return res.status(401).redirect("/login");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    const sessionValid = await SessionManager.isSessionValid(sessionToken);

    if (!sessionValid) {
      return res.status(401).redirect("/login");
    }

    (req as any).user = decoded;

    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).redirect("/login");
  }
}
