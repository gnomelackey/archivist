/* eslint-disable @typescript-eslint/no-explicit-any */

import express from "express";
import jwt from "jsonwebtoken";

export function jwtValidation(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const auth = req.headers.authorization;

  if (!auth?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Missing token" });
  }

  try {
    const token = auth.slice(7);
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    (req as any).user = decoded;
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
}
