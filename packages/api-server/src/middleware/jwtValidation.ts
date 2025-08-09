/* eslint-disable @typescript-eslint/no-explicit-any */

import express from "express";
import jwt from "jsonwebtoken";

export function jwtValidation(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({ error: "Missing token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    (req as any).user = decoded;

    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
}
